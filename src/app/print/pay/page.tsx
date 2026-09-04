import type { Metadata } from "next";
import { PrintSheet } from "@/components/PrintSheet";

export const metadata: Metadata = {
  title: "Print — Fee / Zelle one-pager",
  robots: { index: false, follow: false },
};

export default function PrintPayPage() {
  return (
    <main className="print-page">
      <PrintSheet variant="pay" />
    </main>
  );
}
