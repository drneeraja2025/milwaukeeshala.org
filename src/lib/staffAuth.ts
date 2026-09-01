import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const STAFF_SESSION_COOKIE = "mms_admin_session";
const SESSION_TTL_SEC = 60 * 60 * 24 * 7; // 7 days

function adminPassword(): string | null {
  return (
    process.env.ADMIN_PASSWORD?.trim() ||
    process.env.CONTENT_PUBLISH_SECRET?.trim() ||
    null
  );
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

function signExpiry(exp: number, key: string): string {
  return createHmac("sha256", key).update(`mms-admin:${exp}`).digest("base64url");
}

export function createSessionToken(): string {
  const key = signingKey();
  if (!key) throw new Error("ADMIN_PASSWORD or CONTENT_PUBLISH_SECRET is not configured");
  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SEC;
  return `${exp}.${signExpiry(exp, key)}`;
}

export function isSessionTokenValid(token: string | undefined | null): boolean {
  if (!token) return false;
  const key = signingKey();
  if (!key) return false;
  const [expRaw, sig] = token.split(".");
  if (!expRaw || !sig) return false;
  const exp = Number(expRaw);
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return false;
  const expected = signExpiry(exp, key);
  try {
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
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

/** Accept signed session cookie or Bearer publish secret (scripts). */
export function assertStaffAuth(req: Request): void {
  const expected = adminPassword();
  if (!expected) {
    throw new Error("ADMIN_PASSWORD or CONTENT_PUBLISH_SECRET is not configured");
  }

  const bearer = bearerFromRequest(req);
  if (bearer && passwordsMatch(bearer, expected)) return;

  const session = cookieFromRequest(req, STAFF_SESSION_COOKIE);
  if (isSessionTokenValid(session)) return;

  throw unauthorized();
}

export async function hasStaffSession(): Promise<boolean> {
  const jar = await cookies();
  return isSessionTokenValid(jar.get(STAFF_SESSION_COOKIE)?.value);
}
