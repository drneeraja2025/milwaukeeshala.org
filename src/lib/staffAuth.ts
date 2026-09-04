import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const STAFF_SESSION_COOKIE = "mms_admin_session";
export type StaffRole = "admin" | "editor";

const SESSION_TTL_SEC = 60 * 60 * 24 * 7; // 7 days

function adminPassword(): string | null {
  return (
    process.env.ADMIN_PASSWORD?.trim() ||
    process.env.CONTENT_PUBLISH_SECRET?.trim() ||
    null
  );
}

function editorPassword(): string | null {
  return process.env.EDITOR_PASSWORD?.trim() || null;
}

function signingKey(): string | null {
  return adminPassword();
}

function unauthorized(message = "Unauthorized"): Error & { status: number } {
  const err = new Error(message) as Error & { status: number };
  err.status = 401;
  return err;
}

export function passwordsMatch(provided: string, expected: string): boolean {
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function verifyAdminPassword(provided: string): boolean {
  const expected = adminPassword();
  if (!expected || !provided) return false;
  return passwordsMatch(provided.trim(), expected);
}

/** Returns role if password matches admin or editor env; null otherwise. */
export function resolveStaffRole(provided: string): StaffRole | null {
  const pwd = provided.trim();
  if (!pwd) return null;
  const admin = adminPassword();
  if (admin && passwordsMatch(pwd, admin)) return "admin";
  const editor = editorPassword();
  if (editor && passwordsMatch(pwd, editor)) return "editor";
  return null;
}

function signPayload(exp: number, role: StaffRole, key: string): string {
  return createHmac("sha256", key).update(`mms-admin:${exp}:${role}`).digest("base64url");
}

export function createSessionToken(role: StaffRole = "admin"): string {
  const key = signingKey();
  if (!key) throw new Error("ADMIN_PASSWORD or CONTENT_PUBLISH_SECRET is not configured");
  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SEC;
  return `${exp}.${role}.${signPayload(exp, role, key)}`;
}

export function parseSessionToken(
  token: string | undefined | null,
): { exp: number; role: StaffRole } | null {
  if (!token) return null;
  const key = signingKey();
  if (!key) return null;
  const parts = token.split(".");
  // New: exp.role.sig — legacy: exp.sig (treat as admin)
  let expRaw: string;
  let role: StaffRole = "admin";
  let sig: string;
  if (parts.length === 3 && (parts[1] === "admin" || parts[1] === "editor")) {
    [expRaw, role, sig] = parts as [string, StaffRole, string];
  } else if (parts.length === 2) {
    [expRaw, sig] = parts;
    // Legacy signature used mms-admin:exp only
    const exp = Number(expRaw);
    if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return null;
    const legacy = createHmac("sha256", key).update(`mms-admin:${exp}`).digest("base64url");
    try {
      const a = Buffer.from(sig);
      const b = Buffer.from(legacy);
      if (a.length === b.length && timingSafeEqual(a, b)) return { exp, role: "admin" };
    } catch {
      /* fall through */
    }
    return null;
  } else {
    return null;
  }
  const exp = Number(expRaw);
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return null;
  const expected = signPayload(exp, role, key);
  try {
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return null;
    if (!timingSafeEqual(a, b)) return null;
    return { exp, role };
  } catch {
    return null;
  }
}

export function isSessionTokenValid(token: string | undefined | null): boolean {
  return parseSessionToken(token) != null;
}

export function sessionCookieOptions(maxAge = SESSION_TTL_SEC) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}

function bearerFromRequest(req: Request): string {
  const header = req.headers.get("authorization") || "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match?.[1]?.trim() || "";
}

function cookieFromRequest(req: Request, name: string): string | null {
  const raw = req.headers.get("cookie") || "";
  for (const part of raw.split(";")) {
    const [k, ...rest] = part.trim().split("=");
    if (k === name) return decodeURIComponent(rest.join("="));
  }
  return null;
}

export type StaffAuthContext = { role: StaffRole };

/** Accept signed session cookie or Bearer admin secret (scripts = admin). */
export function assertStaffAuth(req: Request): StaffAuthContext {
  const admin = adminPassword();
  if (!admin) {
    throw new Error("ADMIN_PASSWORD or CONTENT_PUBLISH_SECRET is not configured");
  }

  const bearer = bearerFromRequest(req);
  if (bearer && passwordsMatch(bearer, admin)) return { role: "admin" };

  const session = cookieFromRequest(req, STAFF_SESSION_COOKIE);
  const parsed = parseSessionToken(session);
  if (parsed) return { role: parsed.role };

  throw unauthorized();
}

export function assertAdminRole(ctx: StaffAuthContext): void {
  if (ctx.role !== "admin") {
    const err = new Error("Admin role required for this action") as Error & { status: number };
    err.status = 403;
    throw err;
  }
}

/** Actions editors may not perform. */
export function assertEditorAllowed(kind: string, action: string, role: StaffRole): void {
  if (role === "admin") return;
  const adminOnlyKinds = new Set(["settings", "announcement", "resource", "qr", "tools"]);
  if (adminOnlyKinds.has(kind)) {
    const err = new Error("Editor accounts cannot change settings, banner, resources, or QR") as Error & {
      status: number;
    };
    err.status = 403;
    throw err;
  }
  if (action === "delete" || action === "undo") {
    const err = new Error("Editor accounts cannot delete content or undo publishes") as Error & {
      status: number;
    };
    err.status = 403;
    throw err;
  }
  if (kind === "teacher" && action === "delete") {
    const err = new Error("Editor accounts cannot delete teachers") as Error & { status: number };
    err.status = 403;
    throw err;
  }
}

export async function hasStaffSession(): Promise<boolean> {
  const jar = await cookies();
  return isSessionTokenValid(jar.get(STAFF_SESSION_COOKIE)?.value);
}

export async function getStaffSessionRole(): Promise<StaffRole | null> {
  const jar = await cookies();
  return parseSessionToken(jar.get(STAFF_SESSION_COOKIE)?.value)?.role ?? null;
}
