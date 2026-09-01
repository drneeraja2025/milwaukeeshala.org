import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getStaff } from "@/lib/data";
import { hasStaffSession } from "@/lib/staffAuth";
import { StaffPublishClient } from "./StaffPublishClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Staff publish",
  robots: { index: false, follow: false },
};

export default async function StaffPublishPage() {
  if (!(await hasStaffSession())) {
    redirect("/staff/login");
  }

  const staff = getStaff();
  const people = [...staff.people]
    .sort((a, b) => a.order - b.order)
    .map((p) => ({
      id: p.id,
      name: p.name,
      role: p.role,
      bio: p.bio,
      photo: p.photo,
    }));

  return <StaffPublishClient people={people} />;
}
