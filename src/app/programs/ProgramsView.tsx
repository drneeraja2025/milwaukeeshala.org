"use client";

import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { getProgramLevels, getSponsors, pickLocale } from "@/lib/data";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import { site } from "@/lib/site";

const LULU_SHALA_BOOKS =
  "https://www.lulu.com/search?contributor=Shala+Prakashan&adult_audience_rating=00&sortBy=PRODUCT_SALES_90_DAYS";

export function ProgramsView() {
  const { t, lang } = useI18n();
  const levels = getProgramLevels();
  const sponsors = getSponsors();

  return (
    <div className="page-shell">
      <PageHero
        eyebrow={t("programs.eyebrow")}
        title={t("programs.title")}
        lead={t("programs.lead")}
      />

      <div className="content-panel">
        <div className="programs-levels-head">
          <h2>{t("programs.levels")}</h2>
          <a
            className="btn btn-ghost"
            href={LULU_SHALA_BOOKS}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("programs.booksBrowse")}
          </a>
        </div>

        <ul className="grade-book-grid">
          {levels.map((level) => (
            <li key={level.id} className="grade-book-card">
              <Link href={`/programs/${level.id}`} className="grade-book-link">
                {level.image ? (
                  <span className="grade-book-cover">
                    <Image
                      src={level.image}
                      alt={pickLocale(lang, level.title, level.titleMr)}
                      width={180}
                      height={240}
                    />
                  </span>
                ) : null}
                <span className="grade-book-copy">
                  <strong>{pickLocale(lang, level.title, level.titleMr)}</strong>
                  <span className="muted">
                    {pickLocale(lang, level.summary, level.summaryMr)}
                  </span>
                </span>
              </Link>
              {level.bookUrl ? (
                <a
                  className="grade-book-lulu"
                  href={level.bookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("programs.bookOpen")}
                </a>
              ) : null}
            </li>
          ))}
        </ul>

        <h2 style={{ marginTop: "1.75rem" }}>{t("programs.classroom")}</h2>
        <ul className="program-points">
          <li>{t("programs.p1")}</li>
          <li>{t("programs.p2", { location: t("site.location") })}</li>
          <li>{t("programs.p3")}</li>
          <li>{t("programs.p4")}</li>
        </ul>

        <h2 style={{ marginTop: "1.75rem" }}>{t("programs.avant")}</h2>
        <ul className="program-points">
          <li>{t("programs.a1")}</li>
          <li>{t("programs.a2")}</li>
          <li>{t("programs.a3")}</li>
        </ul>
        <div className="cta-row" style={{ marginTop: "1.25rem" }}>
          <Link className="btn btn-navy" href={site.biliteracyPath}>
            {t("cta.biliteracy")}
          </Link>
          <a
            className="btn btn-secondary"
            href={site.avantUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("cta.avant")}
          </a>
          <a
            className="btn btn-ghost"
            href={site.kalnirnayUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("calendar.kalnirnay")}
          </a>
        </div>
      </div>

      {sponsors.length > 0 ? (
        <section className="sponsors-block content-panel" style={{ marginTop: "2rem" }}>
          <h2>{t("sponsors.title")}</h2>
          <ul className="sponsor-list">
            {sponsors.map((s) => (
              <li key={s.id}>
                <a href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
