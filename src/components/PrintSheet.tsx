"use client";

import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import { site } from "@/lib/site";

type Variant = "admissions" | "pay";

export function PrintSheet({ variant }: { variant: Variant }) {
  const { t } = useI18n();
  const isAdmissions = variant === "admissions";

  return (
    <div className="print-sheet">
      <header className="print-sheet-header">
        <Image src="/MMSlogo.jpg" alt="" width={64} height={64} />
        <div>
          <p className="print-sheet-brand">{site.name}</p>
          <p className="print-sheet-brand-mr" lang="mr">
            {site.nameMr}
          </p>
          <p className="muted">
            {isAdmissions
              ? t("print.admissionsTitle", { year: site.yearLabel })
              : t("print.payTitle", { year: site.yearLabel })}
          </p>
        </div>
      </header>

      <dl className="print-facts">
        <div>
          <dt>{t("admissions.schoolYear")}</dt>
          <dd>{t("admissions.schoolYearVal", { year: site.yearLabel })}</dd>
        </div>
        <div>
          <dt>{t("admissions.fee")}</dt>
          <dd>{t("admissions.feeVal", { fee: site.fee })}</dd>
        </div>
        <div>
          <dt>{t("admissions.schedule")}</dt>
          <dd>{t("admissions.scheduleVal")}</dd>
        </div>
        <div>
          <dt>{t("admissions.location")}</dt>
          <dd>{site.location}</dd>
        </div>
        {!isAdmissions ? (
          <>
            <div>
              <dt>{t("pay.payee")}</dt>
              <dd>{site.zellePayee}</dd>
            </div>
            <div>
              <dt>{t("pay.zelleEmail")}</dt>
              <dd>{site.zelleEmail}</dd>
            </div>
          </>
        ) : (
          <div>
            <dt>{t("admissions.books")}</dt>
            <dd>{t("admissions.booksVal", { year: site.yearLabel })}</dd>
          </div>
        )}
      </dl>

      <div className="print-qr-row">
        {isAdmissions ? (
          <figure>
            <Image
              src="/media/admissions-qr.png"
              alt={t("admissions.scan")}
              width={160}
              height={160}
            />
            <figcaption>{t("admissions.scan")}</figcaption>
          </figure>
        ) : null}
        <figure>
          <Image src={site.zelleQrSrc} alt={t("pay.scan")} width={160} height={160} />
          <figcaption>{t("pay.scan")}</figcaption>
        </figure>
      </div>

      <p className="print-contact muted">
        {site.email} · milwaukeeshala.org
        {isAdmissions ? ` · ${t("print.applyOnline")}` : ""}
      </p>

      <div className="print-actions no-print">
        <button type="button" className="btn btn-primary" onClick={() => window.print()}>
          {t("print.print")}
        </button>
        <Link className="btn btn-ghost" href={isAdmissions ? "/admissions" : "/pay"}>
          {t("print.back")}
        </Link>
      </div>
    </div>
  );
}
