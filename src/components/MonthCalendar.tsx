"use client";

import { useMemo, useState } from "react";
import type { EventItem } from "@/lib/data";
import { formatEventDate, formatTime } from "@/lib/data";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type MonthCalendarProps = {
  events: EventItem[];
};

function monthLabel(year: number, month: number): string {
  return new Date(year, month, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

function toKey(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function MonthCalendar({ events }: MonthCalendarProps) {
  const firstEvent = events[0];
  const initial = firstEvent
    ? new Date(`${firstEvent.date}T12:00:00`)
    : new Date(2026, 7, 1);
  const [cursor, setCursor] = useState({
    year: initial.getFullYear(),
    month: initial.getMonth(),
  });

  const eventsByDate = useMemo(() => {
    const map = new Map<string, EventItem[]>();
    for (const event of events) {
      const list = map.get(event.date) ?? [];
      list.push(event);
      map.set(event.date, list);
    }
    return map;
  }, [events]);

  const cells = useMemo(() => {
    const first = new Date(cursor.year, cursor.month, 1);
    const startPad = first.getDay();
    const daysInMonth = new Date(cursor.year, cursor.month + 1, 0).getDate();
    const total = Math.ceil((startPad + daysInMonth) / 7) * 7;
    return Array.from({ length: total }, (_, index) => {
      const day = index - startPad + 1;
      if (day < 1 || day > daysInMonth) {
        return { key: `empty-${index}`, day: null, dateKey: null as string | null };
      }
      return {
        key: `day-${day}`,
        day,
        dateKey: toKey(cursor.year, cursor.month, day),
      };
    });
  }, [cursor]);

  const monthEvents = events.filter((event) => {
    const d = new Date(`${event.date}T12:00:00`);
    return d.getFullYear() === cursor.year && d.getMonth() === cursor.month;
  });

  return (
    <div className="calendar-wrap">
      <div className="calendar-toolbar">
        <button
          type="button"
          onClick={() =>
            setCursor((c) => {
              const d = new Date(c.year, c.month - 1, 1);
              return { year: d.getFullYear(), month: d.getMonth() };
            })
          }
        >
          ← Prev
        </button>
        <h2>{monthLabel(cursor.year, cursor.month)}</h2>
        <button
          type="button"
          onClick={() =>
            setCursor((c) => {
              const d = new Date(c.year, c.month + 1, 1);
              return { year: d.getFullYear(), month: d.getMonth() };
            })
          }
        >
          Next →
        </button>
      </div>

      <div className="calendar-grid" role="grid" aria-label="Month calendar">
        {WEEKDAYS.map((day) => (
          <div key={day} className="calendar-weekday">
            {day}
          </div>
        ))}
        {cells.map((cell) => {
          const dayEvents = cell.dateKey
            ? eventsByDate.get(cell.dateKey) ?? []
            : [];
          return (
            <div
              key={cell.key}
              className={`calendar-cell ${cell.day ? "" : "is-empty"} ${dayEvents.length ? "has-event" : ""}`}
            >
              {cell.day ? <span className="calendar-day">{cell.day}</span> : null}
              {dayEvents.map((event) => (
                <span key={event.id} className="calendar-dot" title={event.title}>
                  {event.title}
                </span>
              ))}
            </div>
          );
        })}
      </div>

      <div className="calendar-list">
        <h3>Events this month</h3>
        {monthEvents.length === 0 ? (
          <p className="muted">No events scheduled in this month yet.</p>
        ) : (
          <ul>
            {monthEvents.map((event) => (
              <li key={event.id}>
                <p className="event-date">{formatEventDate(event.date)}</p>
                <h4>{event.title}</h4>
                <p>
                  {formatTime(event.startTime)}
                  {event.endTime ? ` – ${formatTime(event.endTime)}` : ""} ·{" "}
                  {event.location}
                </p>
                <p className="muted">{event.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
