import type { Metadata } from "next";
import { ProgramsView } from "./ProgramsView";

export const metadata: Metadata = {
  title: "BMM Marathi Shala Grade Levels & Books",
  description:
    "Baalvarg through Level 5 BMM curriculum books for Milwaukee Marathi Shala, plus Seal of Biliteracy via Avant / BMM.",
};

export default function ProgramsPage() {
  return <ProgramsView />;
}
