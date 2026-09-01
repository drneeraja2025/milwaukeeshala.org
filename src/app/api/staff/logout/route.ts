import { NextResponse } from "next/server";
import { sessionCookieOptions, STAFF_SESSION_COOKIE } from "@/lib/staffAuth";

export const runtime = "nodejs";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(STAFF_SESSION_COOKIE, "", sessionCookieOptions(0));
  return res;
}
