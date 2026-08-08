import type { Metadata } from "next";
import { ProgramsView } from "./ProgramsView";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Marathi learning at Milwaukee Marathi Shala, including Avant Assessment pathways for college credit. Certified proctors on staff.",
};

export default function ProgramsPage() {
  return <ProgramsView />;
}
