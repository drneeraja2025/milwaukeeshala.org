"use client";

import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { getStaff } from "@/lib/data";
import { useI18n } from "@/lib/i18n/LanguageProvider";

export default function StaffPage() {
  const { t, lang } = useI18n();
  const data = getStaff() as {
    contacts: Array<{
      name: string;
      role: string;
      roleMr?: string;
      phone: string;
    }>;
    people: Array<{
      id: string;
      name: string;
      nameMr?: string;
      role: string;
      roleMr?: string;
      bio: string;
      bioMr?: string;
      photo: string;
      order: number;
    }>;
    notes: string[];
  };
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
          {people.map((person) => (
            <article key={person.id} className="staff-card">
              <div className="staff-photo">
                <Image
                  src={person.photo}
                  alt={person.name}
                  fill
                  sizes="(max-width: 700px) 100vw, 33vw"
                />
              </div>
              <div className="staff-body">
                <h2>{lang === "mr" && person.nameMr ? person.nameMr : person.name}</h2>
                <p className="staff-role">
                  {lang === "mr" && person.roleMr ? person.roleMr : person.role}
                </p>
                <p>{lang === "mr" && person.bioMr ? person.bioMr : person.bio}</p>
              </div>
            </article>
          ))}
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
