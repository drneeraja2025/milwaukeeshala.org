"use client";

import Image from "next/image";
import Link from "next/link";
import {
  formatShortDate,
  formatTime,
  getUpcomingEvents,
  getUpdates,
} from "@/lib/data";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import { site } from "@/lib/site";

export default function HomePage() {
  const upcoming = getUpcomingEvents(3);
  const updates = getUpdates().slice(0, 3);
  const { t } = useI18n();

  return (
    <>
      <section className="home-hero">
        <div className="hero-media">
          <Image
            src="/media/IMG-20260531-WA0017.jpg"
            alt="Milwaukee Marathi Shala annual program"
            fill
            priority
            sizes="100vw"
          />
          <div className="hero-scrim" />
        </div>
        <div className="hero-copy">
          <h1 className="hero-brand" lang="mr">
            {site.nameMr}
            <span className="hero-brand-en">{site.name}</span>
          </h1>
          <p className="hero-motto" lang="mr">
            {site.motto}
          </p>
          <p className="hero-lead">
            {t("home.lead", { year: site.yearLabel, location: site.location })}
          </p>
          <div className="cta-row">
            <a
              className="btn btn-primary"
              href={site.admissionsFormUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("cta.apply")}
            </a>
            <Link className="btn btn-secondary" href={site.payPath}>
              {t("cta.pay")}
            </Link>
            <a
              className="btn btn-ghost"
              href={site.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("cta.sislms")}
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="section-head">
            <div>
              <p className="eyebrow">{t("home.comingUp")}</p>
              <h2>{t("home.upcoming")}</h2>
            </div>
            <Link href="/calendar">{t("home.fullCalendar")}</Link>
          </div>
          <ul className="teaser-list reveal">
            {upcoming.map((event) => (
              <li key={event.id}>
                <p className="event-date">{formatShortDate(event.date)}</p>
                <h3>{event.title}</h3>
                <p>
                  {formatTime(event.startTime)}
                  {event.endTime ? ` – ${formatTime(event.endTime)}` : ""} ·{" "}
                  {event.location}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-tight">
        <div className="section-inner">
          <div className="section-head">
            <div>
              <p className="eyebrow">From the school</p>
              <h2>{t("home.news")}</h2>
            </div>
            <Link href="/news">{t("home.viewNews")}</Link>
          </div>
          <ul className="teaser-list">
            {updates.map((item) => (
              <li key={item.id}>
                <p className="news-date">{formatShortDate(item.date)}</p>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="section-head">
            <div>
              <p className="eyebrow">Community</p>
              <h2>{t("home.gallery")}</h2>
            </div>
            <Link href="/photos">{t("home.viewPhotos")}</Link>
          </div>
          <div className="photo-strip reveal">
            <figure>
              <Image
                src="/media/20260521_171946.jpg"
                alt="Certificate celebration"
                fill
                sizes="(max-width: 900px) 100vw, 33vw"
              />
              <figcaption>Certificates</figcaption>
            </figure>
            <figure>
              <Image
                src="/media/IMG-20260117-WA0003.jpg"
                alt="Exam day"
                fill
                sizes="(max-width: 900px) 100vw, 33vw"
              />
              <figcaption>Exams</figcaption>
            </figure>
            <figure>
              <Image
                src="/media/IMG-20260531-WA0004.jpg"
                alt="MMM committee"
                fill
                sizes="(max-width: 900px) 100vw, 33vw"
              />
              <figcaption>Committee</figcaption>
            </figure>
          </div>
        </div>
      </section>
    </>
  );
}
