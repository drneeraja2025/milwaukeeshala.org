"use client";

import { useMemo, useState } from "react";
import type { EventItem } from "@/lib/data";
import {
  formatEventDate,
  formatTime,
  pickLocale,
} from "@/lib/data";
import { useI18n } from "@/lib/i18n/LanguageProvider";

type MonthCalendarProps = {
  events: EventItem[];
};

function toKey(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function MonthCalendar({ events }: MonthCalendarProps) {
  const { t, lang } = useI18n();
  const firstEvent = events[0];
  const initial = firstEvent
    ? new Date(`${firstEvent.date}T12:00:00`)
    : new Date(2026, 7, 1);
  const [cursor, setCursor] = useState({
    year: initial.getFullYear(),
    month: initial.getMonth(),
  });

  const weekdays = [
    t("calendar.wd0"),
    t("calendar.wd1"),
    t("calendar.wd2"),
    t("calendar.wd3"),
    t("calendar.wd4"),
    t("calendar.wd5"),
    t("calendar.wd6"),
  ];

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

  const monthLabel = new Date(cursor.year, cursor.month, 1).toLocaleDateString(
    lang === "mr" ? "mr-IN" : "en-US",
    { month: "long", year: "numeric" },
  );

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
          {t("calendar.prev")}
        </button>
        <h2>{monthLabel}</h2>
        <button
          type="button"
          onClick={() =>
            setCursor((c) => {
              const d = new Date(c.year, c.month + 1, 1);
              return { year: d.getFullYear(), month: d.getMonth() };
            })
          }
        >
          {t("calendar.next")}
        </button>
      </div>

      <div className="calendar-grid" role="grid" aria-label={t("calendar.aria")}>
        {weekdays.map((day) => (
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
              {dayEvents.map((event) => {
                const title = pickLocale(lang, event.title, event.titleMr);
                return (
                  <span key={event.id} className="calendar-dot" title={title}>
                    {title}
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>

      <div className="calendar-list">
        <h3>{t("calendar.eventsMonth")}</h3>
        {monthEvents.length === 0 ? (
          <p className="muted">{t("calendar.noEvents")}</p>
        ) : (
          <ul>
            {monthEvents.map((event) => (
              <li key={event.id}>
                <p className="event-date">{formatEventDate(event.date, lang)}</p>
                <h4>{pickLocale(lang, event.title, event.titleMr)}</h4>
                <p>
                  {formatTime(event.startTime, lang)}
                  {event.endTime ? ` – ${formatTime(event.endTime, lang)}` : ""} ·{" "}
                  {pickLocale(lang, event.location, event.locationMr)}
                </p>
                <p className="muted">
                  {pickLocale(lang, event.description, event.descriptionMr)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
