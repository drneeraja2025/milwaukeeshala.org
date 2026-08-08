"use client";

import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { getLegalBlocks } from "@/lib/i18n/legal";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import { site } from "@/lib/site";

type LegalPageProps = {
  page: "privacy" | "terms" | "disclaimer";
};

export function LegalPageView({ page }: LegalPageProps) {
  const { t, lang } = useI18n();
  const blocks = getLegalBlocks(page, lang);
  const titleKey =
    page === "privacy"
      ? "legal.privacy"
      : page === "terms"
        ? "legal.terms"
        : "legal.disclaimer";
  const leadKey =
    page === "privacy"
      ? "legal.privacyLead"
      : page === "terms"
        ? "legal.termsLead"
        : "legal.disclaimerLead";

  return (
    <div className="page-shell legal-page">
      <PageHero eyebrow={t("legal.eyebrow")} title={t(titleKey)} lead={t(leadKey)} />
      <div className="content-panel prose-legal">
        <p>
          <strong>{t("legal.effective")}</strong> {t("legal.date")} ·{" "}
          <strong>{t("legal.updated")}</strong> {t("legal.date")}
        </p>
        {blocks.map((block, index) => {
          if (block.type === "h2") {
            return <h2 key={index}>{block.text}</h2>;
          }
          if (block.type === "ul") {
            return (
              <ul key={index}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          }
          if (block.type === "links") {
            if (page === "privacy") {
              return (
                <p key={index}>
                  {lang === "mr" ? "तसेच " : "See also "}
                  <Link href="/terms">{t("legal.terms")}</Link>
                  {lang === "mr" ? " आणि " : " and "}
                  <Link href="/disclaimer">{t("legal.disclaimer")}</Link>.
                </p>
              );
            }
            if (page === "terms") {
              return (
                <p key={index}>
                  {lang === "mr" ? "संबंधित: " : "Related: "}
                  <Link href="/privacy">{t("legal.privacy")}</Link> ·{" "}
                  <Link href="/disclaimer">{t("legal.disclaimer")}</Link>
                </p>
              );
            }
            return (
              <p key={index}>
                <Link href="/privacy">{t("footer.privacy")}</Link> ·{" "}
                <Link href="/terms">{t("footer.terms")}</Link>
              </p>
            );
          }
          if (block.text.includes(site.email) && !block.text.includes(" ")) {
            return (
              <p key={index}>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </p>
            );
          }
          if (block.text.includes(site.email)) {
            const parts = block.text.split(site.email);
            return (
              <p key={index}>
                {parts[0]}
                <a href={`mailto:${site.email}`}>{site.email}</a>
                {parts[1] ?? ""}
              </p>
            );
          }
          return <p key={index}>{block.text}</p>;
        })}
      </div>
    </div>
  );
}
