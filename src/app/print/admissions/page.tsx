import type { Metadata } from "next";
import { PrintSheet } from "@/components/PrintSheet";

export const metadata: Metadata = {
  title: "Print — Admissions one-pager",
  robots: { index: false, follow: false },
};

export default function PrintAdmissionsPage() {
  return (
    <main className="print-page">
      <PrintSheet variant="admissions" />
    </main>
  );
}
