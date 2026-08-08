import type { Metadata } from "next";
import { MonthCalendar } from "@/components/MonthCalendar";
import { PageHero } from "@/components/PageHero";
import { getEvents } from "@/lib/data";

export const metadata: Metadata = {
  title: "Calendar",
  description:
    "Milwaukee Marathi Shala calendar — teacher meeting, all-school meeting, and first day of classes for 2026–27.",
};

export default function CalendarPage() {
  const events = getEvents();

  return (
    <div className="page-shell">
      <PageHero
        eyebrow="Schedule"
        title="School calendar"
        lead="Key dates for teachers, families, and the start of Saturday classes. Export events to your own calendar with ICS."
      />
      <div style={{ marginBottom: "1rem" }}>
        <a className="ics-btn" href="/api/calendar">
          Download ICS
        </a>
      </div>
      <MonthCalendar events={events} />
    </div>
  );
}
