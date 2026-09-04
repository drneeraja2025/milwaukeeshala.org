"use client";

import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import {
  formatEventDate,
  formatTime,
  getEventById,
  googleCalendarUrl,
  pickLocale,
} from "@/lib/data";
import { useI18n } from "@/lib/i18n/LanguageProvider";

export function EventDetailView({ eventId }: { eventId: string }) {
  const { t, lang } = useI18n();
  const event = getEventById(eventId);

  if (!event) {
    return (
      <div className="page-shell">
        <PageHero title={t("calendar.eventNotFound")} lead="" />
        <p>
          <Link href="/calendar">{t("calendar.back")}</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <PageHero
        eyebrow={t("calendar.eyebrow")}
        title={pickLocale(lang, event.title, event.titleMr)}
        lead={formatEventDate(event.date, lang)}
      />

      <div className="content-panel event-detail">
        {event.image ? (
          <figure className="event-poster">
            <Image
              src={event.image}
              alt={pickLocale(lang, event.title, event.titleMr)}
              width={900}
              height={1200}
              className="event-poster-img"
              sizes="(max-width: 900px) 100vw, 40rem"
              priority
            />
          </figure>
        ) : null}

        <p>
          <strong>{t("calendar.when")}:</strong> {formatTime(event.startTime, lang)}
          {event.endTime ? ` – ${formatTime(event.endTime, lang)}` : ""}
        </p>
        <p>
          <strong>{t("calendar.where")}:</strong>{" "}
          {pickLocale(lang, event.location, event.locationMr)}
        </p>
        <p>{pickLocale(lang, event.description, event.descriptionMr)}</p>

        <div className="cta-row" style={{ marginTop: "1.5rem" }}>
          <a
            className="btn btn-primary"
            href={googleCalendarUrl(event)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("calendar.addGoogle")}
          </a>
          {event.rsvpUrl ? (
            <a
              className="btn btn-secondary"
              href={event.rsvpUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("calendar.rsvp")}
            </a>
          ) : null}
          <Link className="btn btn-ghost" href="/calendar">
            {t("calendar.back")}
          </Link>
        </div>
      </div>
    </div>
  );
}
