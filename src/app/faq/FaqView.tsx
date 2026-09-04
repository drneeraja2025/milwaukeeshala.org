"use client";

import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { getFaq, pickLocale } from "@/lib/data";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import { site } from "@/lib/site";

export function FaqView() {
  const { t, lang } = useI18n();
  const items = getFaq();

  return (
    <div className="page-shell faq-page">
      <PageHero eyebrow={t("faq.eyebrow")} title={t("faq.title")} lead={t("faq.lead")} />

      <div className="faq-layout">
        <aside className="faq-toc content-panel" aria-label={t("faq.toc")}>
          <h2>{t("faq.toc")}</h2>
          <ol>
            {items.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>
                  {pickLocale(lang, item.question, item.questionMr)}
                </a>
              </li>
            ))}
          </ol>
        </aside>

        <article className="content-panel faq-articles">
          {items.map((item) => (
            <section key={item.id} id={item.id} className="faq-section">
              <h2>{pickLocale(lang, item.question, item.questionMr)}</h2>
              <p>{pickLocale(lang, item.answer, item.answerMr)}</p>
            </section>
          ))}

          <div className="faq-footer-cta">
            <p>{t("faq.moreHelp")}</p>
            <div className="cta-row">
              <Link className="btn btn-secondary" href="/contact">
                {t("nav.contact")}
              </Link>
              <Link className="btn btn-ghost" href="/admissions">
                {t("nav.admissions")}
              </Link>
              <a className="btn btn-ghost" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
