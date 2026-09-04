import { NextResponse } from "next/server";
import {
  createSessionToken,
  resolveStaffRole,
  sessionCookieOptions,
  STAFF_SESSION_COOKIE,
} from "@/lib/staffAuth";

export async function POST(req: Request) {
  let password = "";
  const contentType = req.headers.get("content-type") || "";
  try {
    if (contentType.includes("application/json")) {
      const body = (await req.json()) as { password?: string };
      password = String(body.password || "");
    } else {
      const form = await req.formData();
      password = String(form.get("password") || "");
    }
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const role = resolveStaffRole(password);
  if (!role) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = createSessionToken(role);
  const res = NextResponse.json({ ok: true, role });
  res.cookies.set(STAFF_SESSION_COOKIE, token, sessionCookieOptions());
  return res;
}
