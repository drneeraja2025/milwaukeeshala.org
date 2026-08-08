import type { EventItem } from "./data";

function icsDate(date: string, time: string): string {
  const compact = `${date.replace(/-/g, "")}T${time.replace(":", "")}00`;
  return compact;
}

function escapeIcs(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

export function buildCalendarIcs(events: EventItem[]): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Milwaukee Marathi Shala//Calendar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:Milwaukee Marathi Shala",
  ];

  for (const event of events) {
    lines.push(
      "BEGIN:VEVENT",
      `UID:${event.id}@milwaukeeshala.org`,
      `DTSTAMP:${icsDate(new Date().toISOString().slice(0, 10), "00:00")}`,
      `DTSTART:${icsDate(event.date, event.startTime)}`,
      `DTEND:${icsDate(event.date, event.endTime)}`,
      `SUMMARY:${escapeIcs(event.title)}`,
      `DESCRIPTION:${escapeIcs(event.description)}`,
      `LOCATION:${escapeIcs(event.location)}`,
      "END:VEVENT",
    );
  }

  lines.push("END:VCALENDAR");
  return `${lines.join("\r\n")}\r\n`;
}
