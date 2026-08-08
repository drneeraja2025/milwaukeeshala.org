import type { Metadata } from "next";
import { LegalPageView } from "@/components/LegalPageView";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for milwaukeeshala.org",
};

export default function PrivacyPage() {
  return <LegalPageView page="privacy" />;
}
