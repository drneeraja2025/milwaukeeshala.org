import type { Metadata } from "next";
import { ContactView } from "./ContactView";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Milwaukee Marathi Shala — email mmm.marathishala@gmail.com and school phone contacts for admissions and questions.",
};

export default function ContactPage() {
  return <ContactView />;
}
