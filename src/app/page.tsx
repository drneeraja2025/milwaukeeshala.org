"use client";

import Image from "next/image";
import Link from "next/link";
import {
  formatShortDate,
  formatTime,
  getUpcomingEvents,
  getUpdates,
  pickLocale,
} from "@/lib/data";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import { site } from "@/lib/site";

export default function HomePage() {
  const upcoming = getUpcomingEvents(3);
  const updates = getUpdates().slice(0, 3);
  const { t, lang } = useI18n();
  const location = t("site.location");

  return (
    <>
      <section className="home-hero">
        <div className="hero-media">
          <Image
            src="/media/IMG-20260531-WA0017.jpg"
            alt={
              lang === "mr"
                ? "मिल्वॉकी मराठी शाळेचा वार्षिक कार्यक्रम"
                : "Milwaukee Marathi Shala annual program"
            }
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
            {t("home.lead", { year: site.yearLabel, location })}
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
                <p className="event-date">{formatShortDate(event.date, lang)}</p>
                <h3>{pickLocale(lang, event.title, event.titleMr)}</h3>
                <p>
                  {formatTime(event.startTime, lang)}
                  {event.endTime ? ` – ${formatTime(event.endTime, lang)}` : ""} ·{" "}
                  {pickLocale(lang, event.location, event.locationMr)}
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
              <p className="eyebrow">{t("home.fromSchool")}</p>
              <h2>{t("home.news")}</h2>
            </div>
            <Link href="/news">{t("home.viewNews")}</Link>
          </div>
          <ul className="teaser-list teaser-list--links">
            {updates.map((item) => (
              <li key={item.id}>
                <Link href={`/news#${item.id}`} className="teaser-card-link">
                  <p className="news-date">{formatShortDate(item.date, lang)}</p>
                  <h3>{pickLocale(lang, item.title, item.titleMr)}</h3>
                  <p>{pickLocale(lang, item.summary, item.summaryMr)}</p>
                  <span className="teaser-read-more">{t("home.readNews")}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="section-head">
            <div>
              <p className="eyebrow">{t("home.community")}</p>
              <h2>{t("home.gallery")}</h2>
            </div>
            <Link href="/photos">{t("home.viewPhotos")}</Link>
          </div>
          <div className="photo-strip reveal">
            <figure>
              <Image
                src="/media/20260521_171946.jpg"
                alt={t("home.cap.certificates")}
                fill
                sizes="(max-width: 900px) 100vw, 33vw"
              />
              <figcaption>{t("home.cap.certificates")}</figcaption>
            </figure>
            <figure>
              <Image
                src="/media/IMG-20260117-WA0003.jpg"
                alt={t("home.cap.exams")}
                fill
                sizes="(max-width: 900px) 100vw, 33vw"
              />
              <figcaption>{t("home.cap.exams")}</figcaption>
            </figure>
            <figure>
              <Image
                src="/media/IMG-20260531-WA0004.jpg"
                alt={t("home.cap.committee")}
                fill
                sizes="(max-width: 900px) 100vw, 33vw"
              />
              <figcaption>{t("home.cap.committee")}</figcaption>
            </figure>
          </div>
        </div>
      </section>
    </>
  );
}
