import type { Metadata } from "next";
import { BiliteracyView } from "./BiliteracyView";

export const metadata: Metadata = {
  title: "Seal of Biliteracy & Avant",
  description:
    "Milwaukee Marathi Shala Biliteracy pathway through Avant Assessment and BMM — Seal of Biliteracy, STAMP testing, and college credit.",
};

export default function BiliteracyPage() {
  return <BiliteracyView />;
}
