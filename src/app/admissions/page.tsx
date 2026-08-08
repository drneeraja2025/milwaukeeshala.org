"use client";

import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import { site } from "@/lib/site";

export default function AdmissionsPage() {
  const { t } = useI18n();

  return (
    <div className="page-shell">
      <PageHero
        eyebrow={`${t("nav.admissions")} ${site.yearLabel}`}
        title={t("admissions.title")}
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
    </div>
  );
}
