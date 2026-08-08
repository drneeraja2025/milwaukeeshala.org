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
        title="Join us for year two"
        lead="New and returning students are welcome. Classes meet Saturdays from 1:00–3:00 PM starting September 5, 2026 at the Hindu Temple of Wisconsin."
      />

      <div className="split">
        <div className="content-panel">
          <h2>What to know</h2>
          <ul className="fact-list">
            <li>
              <strong>School year</strong>
              Second year · {site.yearLabel}
            </li>
            <li>
              <strong>New students</strong>
              Balvarg pathway for beginners joining the school
            </li>
            <li>
              <strong>Fee</strong>
              {site.fee} for the school year
            </li>
            <li>
              <strong>Books</strong>
              BMM curriculum books (ordered for {site.yearLabel})
            </li>
            <li>
              <strong>Schedule</strong>
              Saturdays, 1:00–3:00 PM · begins September 5, 2026
            </li>
            <li>
              <strong>Location</strong>
              {site.location}
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
              alt="QR code to Milwaukee Marathi Shala admissions Google Form"
              width={180}
              height={180}
            />
            <div>
              <h3>Scan to apply</h3>
              <p className="muted">
                Point your phone camera at this QR code to open the admissions
                form, or use the button above.
              </p>
            </div>
          </div>

          <div className="admissions-qr" style={{ marginTop: "1rem" }}>
            <Image
              src={site.zelleQrSrc}
              alt="Zelle QR code for school fees"
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
            Questions? Email{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </div>

        <div>
          <div className="flyer-preview">
            <Image
              src="/media/MMS2026-27flyer.jpg"
              alt="Milwaukee Marathi Shala 2026-27 admissions flyer"
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
