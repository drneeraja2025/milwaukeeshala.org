import { getEvents } from "@/lib/data";
import { buildCalendarIcs } from "@/lib/ics";

export async function GET() {
  const ics = buildCalendarIcs(getEvents());
  return new Response(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition":
        'attachment; filename="milwaukee-marathi-shala.ics"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
