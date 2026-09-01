import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { hasStaffSession } from "@/lib/staffAuth";
import { StaffLoginClient } from "./StaffLoginClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Staff login",
  robots: { index: false, follow: false },
};

export default async function StaffLoginPage() {
  if (await hasStaffSession()) {
    redirect("/staff/publish");
  }
  return <StaffLoginClient />;
}
