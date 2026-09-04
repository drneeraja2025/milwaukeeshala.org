import type { Metadata } from "next";
import { ResourcesView } from "./ResourcesView";

export const metadata: Metadata = {
  title: "Resources",
  description: "Downloadable resources for Milwaukee Marathi Shala families — forms, flyers, and links.",
};

export default function ResourcesPage() {
  return <ResourcesView />;
}
