import type { Metadata } from "next";
import { PhotosView } from "./PhotosView";

export const metadata: Metadata = {
  title: "Photos",
  description:
    "Photo albums from Milwaukee Marathi Shala — annual program, certificates, exams, teachers, and community.",
};

export default function PhotosPage() {
  return <PhotosView />;
}
