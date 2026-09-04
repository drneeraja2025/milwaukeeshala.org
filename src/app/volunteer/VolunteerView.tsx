"use client";

import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { VolunteerForm } from "@/components/VolunteerForm";
import { useI18n } from "@/lib/i18n/LanguageProvider";

export function VolunteerView() {
  const { t } = useI18n();

  return (
    <div className="page-shell">
      <PageHero
        eyebrow={t("volunteer.eyebrow")}
        title={t("volunteer.title")}
        lead={t("volunteer.lead")}
      />

      <div className="content-panel split-volunteer">
        <div>
          <p>{t("volunteer.body")}</p>
          <ul className="program-points">
            <li>{t("volunteer.role1")}</li>
            <li>{t("volunteer.role2")}</li>
            <li>{t("volunteer.role3")}</li>
          </ul>
          <p style={{ marginTop: "1rem" }}>
            <Link className="btn btn-ghost" href="/staff">
              {t("volunteer.meetStaff")}
            </Link>
          </p>
        </div>
        <VolunteerForm />
      </div>
    </div>
  );
}
