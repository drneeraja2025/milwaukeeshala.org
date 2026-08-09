import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teachers and Volunteers",
  description:
    "Milwaukee Marathi Shala teachers, volunteers, and school contacts.",
};

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  return children;
}
