"use client";

import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import { site } from "@/lib/site";

export function BiliteracyView() {
  const { t } = useI18n();

  return (
    <div className="page-shell">
      <PageHero
        eyebrow={t("biliteracy.eyebrow")}
        title={t("biliteracy.title")}
        lead={t("biliteracy.lead")}
      />

      <div className="split">
        <div className="content-panel">
          <p className="biliteracy-highlight">{t("biliteracy.highlight")}</p>
          <p>{t("biliteracy.contactStaff")}</p>

          <h2 style={{ marginTop: "1.75rem" }}>{t("biliteracy.howTitle")}</h2>
          <ul className="program-points">
            <li>{t("biliteracy.how1")}</li>
            <li>{t("biliteracy.how2")}</li>
            <li>{t("biliteracy.how3")}</li>
            <li>{t("biliteracy.how4")}</li>
          </ul>

          <h2 style={{ marginTop: "1.75rem" }}>{t("biliteracy.creditTitle")}</h2>
          <ul className="program-points">
            <li>{t("biliteracy.credit1")}</li>
            <li>{t("biliteracy.credit2")}</li>
            <li>{t("biliteracy.credit3")}</li>
          </ul>

          <div className="cta-row" style={{ marginTop: "1.25rem" }}>
            <a
              className="btn btn-navy"
              href={site.avantUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("cta.avant")}
            </a>
            <a
              className="btn btn-secondary"
              href={site.bmmShalaUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("cta.bmm")}
            </a>
            <Link className="btn btn-ghost" href="/staff">
              {t("nav.staff")}
            </Link>
            <Link className="btn btn-ghost" href="/contact">
              {t("nav.contact")}
            </Link>
          </div>
        </div>

        <div className="program-visuals">
          <figure>
            <Image
              src="/media/IMG-20260117-WA0003.jpg"
              alt={t("home.cap.exams")}
              fill
              sizes="(max-width: 900px) 100vw, 40vw"
            />
          </figure>
          <figure>
            <Image
              src="/media/20260521_171946.jpg"
              alt={t("home.cap.certificates")}
              fill
              sizes="(max-width: 900px) 100vw, 40vw"
            />
          </figure>
        </div>
      </div>
    </div>
  );
}
