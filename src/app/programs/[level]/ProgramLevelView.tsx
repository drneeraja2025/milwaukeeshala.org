"use client";

import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { getProgramLevel, pickLocale } from "@/lib/data";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import { site } from "@/lib/site";

export function ProgramLevelView({ levelId }: { levelId: string }) {
  const { t, lang } = useI18n();
  const level = getProgramLevel(levelId);

  if (!level) {
    return (
      <div className="page-shell">
        <PageHero title={t("programs.levelNotFound")} lead="" />
        <p>
          <Link href="/programs">{t("programs.back")}</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <PageHero
        eyebrow={t("programs.eyebrow")}
        title={pickLocale(lang, level.title, level.titleMr)}
        lead={pickLocale(lang, level.summary, level.summaryMr)}
      />

      <div className="content-panel grade-detail">
        {level.image ? (
          <figure className="grade-detail-cover">
            <Image
              src={level.image}
              alt={pickLocale(lang, level.title, level.titleMr)}
              width={220}
              height={294}
            />
          </figure>
        ) : null}
        <div>
          <p>{pickLocale(lang, level.body, level.bodyMr)}</p>
          <div className="cta-row" style={{ marginTop: "1.5rem" }}>
            {level.bookUrl ? (
              <a
                className="btn btn-primary"
                href={level.bookUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("programs.bookOpen")}
              </a>
            ) : null}
            <a
              className="btn btn-secondary"
              href={site.admissionsFormUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("cta.apply")}
            </a>
            <Link className="btn btn-ghost" href="/programs">
              {t("programs.back")}
            </Link>
            <Link className="btn btn-ghost" href={site.biliteracyPath}>
              {t("cta.biliteracy")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
