"use client";

import { MonthCalendar } from "@/components/MonthCalendar";
import { PageHero } from "@/components/PageHero";
import { getEvents } from "@/lib/data";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import { site } from "@/lib/site";

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
      <div className="cta-row" style={{ marginBottom: "1rem" }}>
        <a className="ics-btn" href="/api/calendar">
          {t("calendar.downloadIcs")}
        </a>
        <a
          className="ics-btn"
          href={site.kalnirnayUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("calendar.kalnirnay")}
        </a>
        <a
          className="ics-btn"
          href="https://www.mmmilwaukee.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("calendar.mmmEvents")}
        </a>
      </div>
      <MonthCalendar events={events} />
    </div>
  );
}
