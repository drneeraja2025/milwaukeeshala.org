import type { Metadata } from "next";
import { LegalPageView } from "@/components/LegalPageView";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of Use for milwaukeeshala.org",
};

export default function TermsPage() {
  return <LegalPageView page="terms" />;
}
