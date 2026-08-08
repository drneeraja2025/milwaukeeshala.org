"use client";

import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import { site } from "@/lib/site";

export function ProgramsView() {
  const { t } = useI18n();

  return (
    <div className="page-shell">
      <PageHero
        eyebrow={t("programs.eyebrow")}
        title={t("programs.title")}
        lead={t("programs.lead")}
      />

      <div className="split">
        <div className="content-panel">
          <h2>{t("programs.classroom")}</h2>
          <ul className="program-points">
            <li>{t("programs.p1")}</li>
            <li>{t("programs.p2", { location: t("site.location") })}</li>
            <li>{t("programs.p3")}</li>
          </ul>

          <h2 style={{ marginTop: "1.75rem" }}>{t("programs.avant")}</h2>
          <ul className="program-points">
            <li>{t("programs.a1")}</li>
            <li>{t("programs.a2")}</li>
            <li>{t("programs.a3")}</li>
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
