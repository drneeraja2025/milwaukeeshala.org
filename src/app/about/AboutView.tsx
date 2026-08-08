"use client";

import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import { site } from "@/lib/site";

export function AboutView() {
  const { t } = useI18n();

  return (
    <div className="page-shell">
      <PageHero
        eyebrow={t("about.eyebrow")}
        title={t("about.title")}
        lead={t("about.lead")}
      />

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
            <a href="https://www.mmmilwaukee.org/" target="_blank" rel="noopener noreferrer">
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
          <p>{t("about.mmmBody2")}</p>
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
    </div>
  );
}
