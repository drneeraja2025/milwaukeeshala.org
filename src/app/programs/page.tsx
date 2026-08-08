import type { Metadata } from "next";
import { ProgramsView } from "./ProgramsView";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Marathi learning at Milwaukee Marathi Shala, cultural festivals in the curriculum, and Seal of Biliteracy via Avant / BMM.",
};

export default function ProgramsPage() {
  return <ProgramsView />;
}
