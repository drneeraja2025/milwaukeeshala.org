"use client";

import { MonthCalendar } from "@/components/MonthCalendar";
import { PageHero } from "@/components/PageHero";
import { getEvents } from "@/lib/data";
import { useI18n } from "@/lib/i18n/LanguageProvider";

export function CalendarView() {
  const { t } = useI18n();
  const events = getEvents();

  return (
    <div className="page-shell">
      <PageHero
        eyebrow={t("calendar.eyebrow")}
        title={t("calendar.title")}
        lead={t("calendar.lead")}
      />
      <div style={{ marginBottom: "1rem" }}>
        <a className="ics-btn" href="/api/calendar">
          {t("calendar.downloadIcs")}
        </a>
      </div>
      <MonthCalendar events={events} />
    </div>
  );
}
