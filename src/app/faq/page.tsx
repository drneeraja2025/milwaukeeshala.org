import type { Metadata } from "next";
import { FaqView } from "./FaqView";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Milwaukee Marathi Shala — fees, admissions, Balvarg placement, BMM program, books, and SISLMS.",
};

export default function FaqPage() {
  return <FaqView />;
}
