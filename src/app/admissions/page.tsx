"use client";

import Image from "next/image";
import Link from "next/link";
import { TestimonialsBlock } from "@/components/TestimonialsBlock";
import { PageHero } from "@/components/PageHero";
import {
  formatShortDate,
  formatTime,
  getUpcomingEvents,
  pickLocale,
} from "@/lib/data";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import { site } from "@/lib/site";

export default function AdmissionsPage() {
  const { t, lang } = useI18n();
  const upcoming = getUpcomingEvents(6);

  return (
    <div className="page-shell">
      <PageHero
        eyebrow={`${t("nav.admissions")} ${site.yearLabel}`}
        title={t("admissions.title", { year: site.yearLabel })}
        lead={t("admissions.lead")}
      />

      <div className="split">
        <div className="content-panel">
          <h2>{t("admissions.know")}</h2>
          <ul className="fact-list">
            <li>
              <strong>{t("admissions.schoolYear")}</strong>
              {t("admissions.schoolYearVal", { year: site.yearLabel })}
            </li>
            <li>
              <strong>{t("admissions.newStudents")}</strong>
              {t("admissions.newStudentsVal")}
            </li>
            <li>
              <strong>{t("admissions.fee")}</strong>
              {t("admissions.feeVal", { fee: site.fee })}
            </li>
            <li>
              <strong>{t("admissions.books")}</strong>
              {t("admissions.booksVal", { year: site.yearLabel })}
            </li>
            <li>
              <strong>{t("admissions.schedule")}</strong>
              {t("admissions.scheduleVal")}
            </li>
            <li>
              <strong>{t("admissions.location")}</strong>
              {t("site.location")}
            </li>
          </ul>

          <p style={{ marginTop: "1rem" }}>
            {t("admissions.mmmLead")}{" "}
            <a
              href="https://www.mmmilwaukee.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("admissions.mmm")}
            </a>
          </p>

          <div className="cta-row" style={{ marginTop: "1.25rem" }}>
            <a
              className="btn btn-primary"
              href={site.admissionsFormUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("cta.openForm")}
            </a>
            <Link className="btn btn-secondary" href={site.payPath}>
              {t("cta.pay")}
            </Link>
            <a className="btn btn-ghost" href="/media/MMS2026-27flyer.jpg" download>
              {t("cta.downloadFlyer")}
            </a>
            <Link className="btn btn-ghost" href="/faq">
              {t("nav.faq")}
            </Link>
          </div>

          <div className="admissions-qr">
            <Image
              src="/media/admissions-qr.png"
              alt={t("admissions.scan")}
              width={180}
              height={180}
            />
            <div>
              <h3>{t("admissions.scan")}</h3>
              <p className="muted">{t("admissions.scanLead")}</p>
            </div>
          </div>

          <div className="admissions-qr" style={{ marginTop: "1rem" }}>
            <Image
              src={site.zelleQrSrc}
              alt={t("pay.scan")}
              width={180}
              height={180}
            />
            <div>
              <h3>{t("pay.scan")}</h3>
              <p className="muted">
                {t("pay.fee", { fee: site.fee, year: site.yearLabel })}.{" "}
                <Link href={site.payPath}>{t("cta.pay")} →</Link>
              </p>
            </div>
          </div>

          <p className="muted" style={{ marginTop: "1rem" }}>
            {t("admissions.questions", { email: site.email })
              .split(site.email)
              .map((part, i, arr) =>
                i < arr.length - 1 ? (
                  <span key={i}>
                    {part}
                    <a href={`mailto:${site.email}`}>{site.email}</a>
                  </span>
                ) : (
                  <span key={i}>{part}</span>
                ),
              )}
          </p>
        </div>

        <div>
          <div className="flyer-preview">
            <Image
              src="/media/MMS2026-27flyer.jpg"
              alt={`${site.name} ${site.yearLabel}`}
              width={900}
              height={1200}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </div>

      <section className="section-tight" style={{ marginTop: "2rem" }}>
        <div className="section-head">
          <div>
            <h2>{t("admissions.dates")}</h2>
          </div>
          <Link href="/calendar">{t("admissions.fullCalendar")}</Link>
        </div>
        <ul className="teaser-list">
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
      </section>

      <section className="content-panel" style={{ marginTop: "2rem" }}>
        <TestimonialsBlock />
      </section>
    </div>
  );
}
