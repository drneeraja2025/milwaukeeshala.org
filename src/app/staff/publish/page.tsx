import type { Metadata } from "next";
import { redirect } from "next/navigation";
import {
  getAllUpdates,
  getAnnouncement,
  getGallery,
  getResources,
  getStaff,
} from "@/lib/data";
import { getStaffSessionRole, hasStaffSession } from "@/lib/staffAuth";
import siteSettings from "../../../../data/site-settings.json";
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
  const staffRole = (await getStaffSessionRole()) || "admin";

  const staff = getStaff();
  const gallery = getGallery();
  const people = [...staff.people]
    .sort((a, b) => a.order - b.order)
    .map((p) => ({
      id: p.id,
      name: p.name,
      role: p.role,
      bio: p.bio,
      photo: p.photo,
    }));

  return (
    <StaffPublishClient
      people={people}
      newsItems={getAllUpdates()}
      albums={gallery.albums}
      videos={gallery.videos || []}
      settings={siteSettings}
      announcement={getAnnouncement()}
      resources={getResources()}
      staffRole={staffRole}
    />
  );
}
