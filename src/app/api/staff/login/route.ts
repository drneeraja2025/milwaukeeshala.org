import { NextResponse } from "next/server";
import {
  createSessionToken,
  sessionCookieOptions,
  STAFF_SESSION_COOKIE,
  verifyAdminPassword,
} from "@/lib/staffAuth";

export const runtime = "nodejs";

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
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!verifyAdminPassword(password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = createSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(STAFF_SESSION_COOKIE, token, sessionCookieOptions());
  return res;
}
