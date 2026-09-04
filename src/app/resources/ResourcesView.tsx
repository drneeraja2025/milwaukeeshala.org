"use client";

import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { getResources, pickLocale } from "@/lib/data";
import { useI18n } from "@/lib/i18n/LanguageProvider";

export function ResourcesView() {
  const { t, lang } = useI18n();
  const items = getResources();

  return (
    <div className="page-shell">
      <PageHero
        eyebrow={t("resources.eyebrow")}
        title={t("resources.title")}
        lead={t("resources.lead")}
      />

      <div className="content-panel">
        <ul className="resource-list">
          {items.map((item) => (
            <li key={item.id}>
              <h2>{pickLocale(lang, item.title, item.titleMr)}</h2>
              <p className="muted">
                {pickLocale(lang, item.description, item.descriptionMr)}
              </p>
              <Link
                className="btn btn-secondary"
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {item.type === "pdf"
                  ? t("resources.download")
                  : t("resources.open")}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
