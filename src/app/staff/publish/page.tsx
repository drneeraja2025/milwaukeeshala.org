import type { Metadata } from "next";
import { getStaff } from "@/lib/data";
import { StaffPublishClient } from "./StaffPublishClient";

export const metadata: Metadata = {
  title: "Staff publish",
  robots: { index: false, follow: false },
};

export default function StaffPublishPage() {
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
