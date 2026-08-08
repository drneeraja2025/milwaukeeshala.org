import type { Metadata } from "next";
import { CalendarView } from "./CalendarView";

export const metadata: Metadata = {
  title: "Calendar",
  description:
    "Milwaukee Marathi Shala calendar — teacher meeting, all-school meeting, and first day of classes for 2026–27.",
};

export default function CalendarPage() {
  return <CalendarView />;
}
