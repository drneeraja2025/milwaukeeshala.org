"use client";

import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { getStaff } from "@/lib/data";
import { useI18n } from "@/lib/i18n/LanguageProvider";

function initials(name: string): string {
  return name
    .replace(/^Dr\.?\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default function StaffPage() {
  const { t, lang } = useI18n();
  const data = getStaff();
  const people = [...(data.people || [])].sort((a, b) => a.order - b.order);

  return (
    <div className="page-shell">
      <PageHero
        eyebrow={t("nav.staff")}
        title={t("staff.title")}
        lead={t("staff.lead")}
      />

      {people.length === 0 ? (
        <p className="muted">{t("staff.empty")}</p>
      ) : (
        <div className="staff-grid">
          {people.map((person) => {
            const displayName =
              lang === "mr" && person.nameMr ? person.nameMr : person.name;
            return (
              <article key={person.id} className="staff-card">
                <div className="staff-photo">
                  {person.photo ? (
                    <Image
                      src={person.photo}
                      alt={displayName}
                      fill
                      sizes="(max-width: 700px) 100vw, 33vw"
                    />
                  ) : (
                    <div
                      className="staff-photo-placeholder"
                      aria-hidden="true"
                    >
                      {initials(person.name)}
                    </div>
                  )}
                </div>
                <div className="staff-body">
                  <h2>{displayName}</h2>
                  <p className="staff-role">
                    {lang === "mr" && person.roleMr
                      ? person.roleMr
                      : person.role}
                  </p>
                  <p>
                    {lang === "mr" && person.bioMr ? person.bioMr : person.bio}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <p className="muted" style={{ marginTop: "1.5rem" }}>
        {t("staff.proctors")}
      </p>

      <div className="content-panel" style={{ marginTop: "2rem" }}>
        <h2>{t("staff.contacts")}</h2>
        <ul className="contact-list">
          {data.contacts.map((person) => (
            <li key={person.phone}>
              <strong>{person.name}</strong>
              <br />
              <span className="muted">
                {lang === "mr" && person.roleMr ? person.roleMr : person.role}
              </span>
              <br />
              <a href={`tel:${person.phone.replace(/-/g, "")}`}>{person.phone}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
