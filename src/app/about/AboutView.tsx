"use client";

import Image from "next/image";
import Link from "next/link";
import { getSpotlights, pickLocale } from "@/lib/data";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import { site } from "@/lib/site";

export function AboutView() {
  const { t, lang } = useI18n();
  const spotlights = getSpotlights();

  return (
    <>
      <section className="home-hero about-hero">
        <div className="hero-media">
          <Image
            src="/media/IMG-20260531-WA0004.jpg"
            alt={
              lang === "mr"
                ? "मिल्वॉकी मराठी शाळा आणि महाराष्ट्र मंडळ मिल्वॉकी समुदाय"
                : "Milwaukee Marathi Shala and Milwaukee Marathi Mandal community"
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
          <p className="hero-lead">{t("about.lead")}</p>
          <div className="cta-row">
            <a
              className="btn btn-primary"
              href="https://www.mmmilwaukee.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("about.ctaMmm")}
            </a>
            <a
              className="btn btn-secondary"
              href="https://bmmonline.org/marathishala/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("about.ctaBmm")}
            </a>
          </div>
        </div>
      </section>

      <div className="page-shell">
        <div className="split">
          <div className="content-panel">
            <h2>{t("about.mmmTitle")}</h2>
            <div className="logo-row">
              <Image src="/MMSlogo.jpg" alt={site.name} width={88} height={88} />
              <Image
                src="/BMM-Shala-Logo.jpg"
                alt="BMM Marathi Shala logo"
                width={88}
                height={88}
              />
            </div>
            <p>
              {t("about.mmmBefore")}{" "}
              <a
                href="https://www.mmmilwaukee.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("parent.mmm")}
              </a>{" "}
              {t("about.mmmMid")}{" "}
              <a
                href="https://bmmonline.org/marathishala/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("parent.bmm")}
              </a>{" "}
              {t("about.mmmAfter")}
            </p>
            <p>{t("about.founded")}</p>
            <p>{t("about.mmmBody2")}</p>
            <div className="cta-row" style={{ marginTop: "1.25rem" }}>
              <a
                className="btn btn-navy"
                href="https://www.mmmilwaukee.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("about.ctaMmm")} →
              </a>
            </div>
          </div>

          <div className="content-panel">
            <h2>{t("about.glance")}</h2>
            <ul className="fact-list">
              <li>
                <strong>{t("about.ages")}</strong>
                5–14
              </li>
              <li>
                <strong>{t("about.when")}</strong>
                {t("site.schedule")}
              </li>
              <li>
                <strong>{t("about.where")}</strong>
                {t("site.location")}
              </li>
              <li>
                <strong>{t("about.schoolYear")}</strong>
                {t("about.secondYear", { year: site.yearLabel })}
              </li>
            </ul>
          </div>
        </div>

        <div className="section-tight">
          <div className="press-frame">
            <h2>{t("about.press")}</h2>
            <p className="muted">{t("about.pressLead")}</p>
            <Image
              src="/media/IMG-20260111-WA0029.jpg"
              alt={t("about.press")}
              width={1200}
              height={900}
              style={{ width: "100%", height: "auto", marginTop: "1rem" }}
            />
          </div>
        </div>

        {spotlights.length > 0 ? (
          <section className="content-panel" style={{ marginTop: "2rem" }}>
            <h2>{t("spotlights.title")}</h2>
            <ul className="teaser-list">
              {spotlights.map((item) => (
                <li key={item.id}>
                  <h3>{pickLocale(lang, item.title, item.titleMr)}</h3>
                  <p>{pickLocale(lang, item.summary, item.summaryMr)}</p>
                  <p className="muted">{pickLocale(lang, item.body, item.bodyMr)}</p>
                </li>
              ))}
            </ul>
            <p style={{ marginTop: "1rem" }}>
              <Link href={site.biliteracyPath}>{t("cta.biliteracy")}</Link>
            </p>
          </section>
        ) : null}
      </div>
    </>
  );
}
