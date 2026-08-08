import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pay / Donate",
  description:
    "Pay Milwaukee Marathi Shala fees or donate via Zelle. Annual fee $150 for 2026–27.",
};

export default function PayLayout({ children }: { children: React.ReactNode }) {
  return children;
}
