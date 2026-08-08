import type { Metadata } from "next";
import { LegalPageView } from "@/components/LegalPageView";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Disclaimer for milwaukeeshala.org and Saaniya Software LLC",
};

export default function DisclaimerPage() {
  return <LegalPageView page="disclaimer" />;
}
