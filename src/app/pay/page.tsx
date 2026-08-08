"use client";

import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import { site } from "@/lib/site";

export default function PayPage() {
  const { t } = useI18n();

  return (
    <div className="page-shell">
      <PageHero
        eyebrow={t("cta.pay")}
        title={t("pay.title")}
        lead={t("pay.lead")}
      />

      <div className="split">
        <div className="content-panel">
          <p className="pay-fee">
            {t("pay.fee", { fee: site.fee, year: site.yearLabel })}
          </p>
          <ul className="fact-list">
            <li>
              <strong>{t("pay.payee")}</strong>
              {site.zellePayee}
            </li>
            <li>
              <strong>Zelle email</strong>
              {site.zelleEmail}
            </li>
          </ul>
          <p className="muted" style={{ marginTop: "1rem" }}>
            {t("pay.note", { email: site.email })}
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
            <Link className="btn btn-ghost" href="/contact">
              {t("nav.contact")}
            </Link>
          </div>
        </div>

        <div className="pay-qr-panel">
          <Image
            src={site.zelleQrSrc}
            alt="Zelle QR code to pay Milwaukee Marathi Shala fees"
            width={320}
            height={320}
            priority
          />
          <p>{t("pay.scan")}</p>
        </div>
      </div>
    </div>
  );
}
