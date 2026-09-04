import type { Metadata } from "next";
import { VolunteerView } from "./VolunteerView";

export const metadata: Metadata = {
  title: "Volunteer",
  description: "Volunteer with Milwaukee Marathi Shala — teaching, events, and community support.",
};

export default function VolunteerPage() {
  return <VolunteerView />;
}
