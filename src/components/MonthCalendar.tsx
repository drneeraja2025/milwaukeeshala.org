"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { EventItem } from "@/lib/data";
import {
  formatEventDate,
  formatTime,
  googleCalendarUrl,
  pickLocale,
} from "@/lib/data";
import { useI18n } from "@/lib/i18n/LanguageProvider";

type MonthCalendarProps = {
  events: EventItem[];
};

type Filter = "all" | "class" | "festival" | "online";

function toKey(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function eventCategory(event: EventItem): Filter {
  const hay = `${event.title} ${event.location} ${event.description}`.toLowerCase();
  if (hay.includes("online") || hay.includes("zoom")) return "online";
  if (
    hay.includes("festival") ||
    hay.includes("ganesh") ||
    hay.includes("diwali") ||
    hay.includes("sankashti") ||
    event.source !== "sislms"
  ) {
    if (hay.includes("class") || hay.includes("shala") || event.source === "sislms") {
      return "class";
    }
    return "festival";
  }
  return event.source === "sislms" ? "class" : "all";
}

export function MonthCalendar({ events }: MonthCalendarProps) {
  const { t, lang } = useI18n();
  const today = new Date();
  const [cursor, setCursor] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<EventItem | null>(null);

  const todayKey = toKey(today.getFullYear(), today.getMonth(), today.getDate());

  function goToToday() {
    const now = new Date();
    setCursor({ year: now.getFullYear(), month: now.getMonth() });
  }

  const filteredEvents = useMemo(() => {
    if (filter === "all") return events;
    return events.filter((e) => eventCategory(e) === filter);
  }, [events, filter]);

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
    for (const event of filteredEvents) {
      const list = map.get(event.date) ?? [];
      list.push(event);
      map.set(event.date, list);
    }
    return map;
  }, [filteredEvents]);

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

  const monthEvents = filteredEvents.filter((event) => {
    const d = new Date(`${event.date}T12:00:00`);
    return d.getFullYear() === cursor.year && d.getMonth() === cursor.month;
  });

  function openEvent(event: EventItem) {
    setSelected(event);
  }

  return (
    <div className="calendar-wrap">
      <div className="calendar-filters" role="group" aria-label={t("calendar.filterLabel")}>
        {(
          [
            ["all", t("calendar.filterAll")],
            ["class", t("calendar.filterClass")],
            ["festival", t("calendar.filterFestival")],
            ["online", t("calendar.filterOnline")],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={`btn ${filter === id ? "btn-primary" : "btn-ghost"}`}
            onClick={() => setFilter(id)}
          >
            {label}
          </button>
        ))}
      </div>

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
        <button type="button" className="calendar-today-btn" onClick={goToToday}>
          {t("calendar.today")}
        </button>
      </div>

      <div className="calendar-grid" role="grid" aria-label={t("calendar.aria")}>
        {weekdays.map((day) => (
          <div key={day} className="calendar-weekday">
            {day}
          </div>
        ))}
        {cells.map((cell) => {
          const dayEvents = cell.dateKey ? eventsByDate.get(cell.dateKey) ?? [] : [];
          return (
            <button
              key={cell.key}
              type="button"
              className={`calendar-cell calendar-cell-btn ${cell.day ? "" : "is-empty"} ${dayEvents.length ? "has-event" : ""} ${cell.dateKey === todayKey ? "is-today" : ""}`}
              disabled={!cell.day}
              onClick={() => {
                if (dayEvents.length === 1) openEvent(dayEvents[0]);
                else if (dayEvents.length > 1) openEvent(dayEvents[0]);
              }}
            >
              {cell.day ? <span className="calendar-day">{cell.day}</span> : null}
              {dayEvents.map((event) => {
                const title = pickLocale(lang, event.title, event.titleMr);
                return (
                  <span
                    key={event.id}
                    className="calendar-dot"
                    title={title}
                    onClick={(e) => {
                      e.stopPropagation();
                      openEvent(event);
                    }}
                  >
                    {title}
                  </span>
                );
              })}
            </button>
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
                <h4>
                  <button type="button" className="calendar-event-link" onClick={() => openEvent(event)}>
                    {pickLocale(lang, event.title, event.titleMr)}
                  </button>
                </h4>
                <p>
                  {formatTime(event.startTime, lang)}
                  {event.endTime ? ` – ${formatTime(event.endTime, lang)}` : ""} ·{" "}
                  {pickLocale(lang, event.location, event.locationMr)}
                </p>
                <p className="muted">
                  {pickLocale(lang, event.description, event.descriptionMr)}
                </p>
                <div className="calendar-event-actions">
                  <a
                    className="btn btn-ghost btn-sm"
                    href={googleCalendarUrl(event)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("calendar.addGoogle")}
                  </a>
                  <Link className="btn btn-ghost btn-sm" href={`/calendar/event/${event.id}`}>
                    {t("calendar.viewEvent")}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selected ? (
        <div className="event-modal-backdrop" role="presentation" onClick={() => setSelected(null)}>
          <div
            className="event-modal"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="event-modal-close"
              onClick={() => setSelected(null)}
              aria-label={t("calendar.close")}
            >
              ×
            </button>
            <p className="event-date">{formatEventDate(selected.date, lang)}</p>
            <h3>{pickLocale(lang, selected.title, selected.titleMr)}</h3>
            <p>
              {formatTime(selected.startTime, lang)}
              {selected.endTime ? ` – ${formatTime(selected.endTime, lang)}` : ""}
            </p>
            <p>{pickLocale(lang, selected.location, selected.locationMr)}</p>
            <p className="muted">
              {pickLocale(lang, selected.description, selected.descriptionMr)}
            </p>
            <div className="cta-row">
              <a
                className="btn btn-primary"
                href={googleCalendarUrl(selected)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("calendar.addGoogle")}
              </a>
              <Link className="btn btn-secondary" href={`/calendar/event/${selected.id}`}>
                {t("calendar.viewEvent")}
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
