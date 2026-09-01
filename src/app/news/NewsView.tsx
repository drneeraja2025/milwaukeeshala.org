"use client";

import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { formatShortDate, getUpdates, pickLocale } from "@/lib/data";
import { useI18n } from "@/lib/i18n/LanguageProvider";

export function NewsView() {
  const { t, lang } = useI18n();
  const updates = getUpdates();

  return (
    <div className="page-shell">
      <PageHero
        eyebrow={t("news.eyebrow")}
        title={t("news.title")}
        lead={t("news.lead")}
      />
      <div className="news-list">
        {updates.map((item) => (
          <article key={item.id} id={item.id}>
            <p className="news-date">{formatShortDate(item.date, lang)}</p>
            <h2>{pickLocale(lang, item.title, item.titleMr)}</h2>
            {item.image ? (
              <div className="news-image">
                <Image
                  src={item.image}
                  alt={pickLocale(lang, item.title, item.titleMr)}
                  width={960}
                  height={540}
                  sizes="(max-width: 900px) 100vw, 640px"
                />
              </div>
            ) : null}
            <p>{pickLocale(lang, item.body, item.bodyMr)}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
