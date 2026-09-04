"use client";

import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { getStaff } from "@/lib/data";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import { site } from "@/lib/site";

export function ContactView() {
  const { t, lang } = useI18n();
  const staff = getStaff();
  const notes =
    lang === "mr" && staff.notesMr?.length ? staff.notesMr : staff.notes;

  return (
    <div className="page-shell">
      <PageHero
        eyebrow={t("contact.eyebrow")}
        title={t("contact.title")}
        lead={t("contact.lead")}
      />

      <ContactForm />

      <div className="split" style={{ marginTop: "2rem" }}>
        <div className="contact-panel">
          <h2>{t("contact.email")}</h2>
          <p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
          <p className="muted">
            {t("contact.applyBefore")}{" "}
            <a
              href={site.admissionsFormUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("contact.openForm")}
            </a>
            {t("contact.applyMid")}{" "}
            <a href={site.admissionsMailto}>{site.email}</a>{" "}
            {t("contact.applyAfter")}
          </p>

          <h2 style={{ marginTop: "1.75rem" }}>{t("contact.phones")}</h2>
          <ul className="contact-list">
            {staff.contacts.map((person) => (
              <li key={person.phone}>
                <strong>{person.name}</strong>
                <br />
                <a href={`tel:${person.phone.replace(/-/g, "")}`}>
                  {person.phone}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="contact-panel">
          <h2>{t("contact.directory")}</h2>
          <p>
            {t("contact.directoryBefore")}{" "}
            <Link href="/staff">{t("contact.staffLink")}</Link>{" "}
            {t("contact.directoryAfter")}
          </p>
          <p style={{ marginTop: "1rem" }}>
            <Link className="btn btn-secondary" href={site.payPath}>
              {t("cta.pay")}
            </Link>{" "}
            <Link className="btn btn-ghost" href="/faq">
              {t("nav.faq")}
            </Link>
          </p>
          <ul className="program-points">
            {notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
          <h2 style={{ marginTop: "1.75rem" }}>{t("contact.parents")}</h2>
          <ul className="contact-list">
            {site.parents.map((parent, index) => (
              <li key={parent.href}>
                <a href={parent.href} target="_blank" rel="noopener noreferrer">
                  {index === 0 ? t("parent.mmm") : t("parent.bmm")}
                </a>
              </li>
            ))}
          </ul>
          <h2 style={{ marginTop: "1.75rem" }}>{site.portalLabel}</h2>
          <p>
            {t("contact.portalLead")}{" "}
            <a href={site.portalUrl} target="_blank" rel="noopener noreferrer">
              {t("contact.openPortal", { label: site.portalLabel })}
            </a>
          </p>
          {site.facebookUrl ? (
            <>
              <h2 style={{ marginTop: "1.75rem" }}>{t("contact.social")}</h2>
              <ul className="contact-list">
                <li>
                  <a href={site.facebookUrl} target="_blank" rel="noopener noreferrer">
                    Facebook (MMM)
                  </a>
                </li>
                {site.newsletterUrl ? (
                  <li>
                    <a href={site.newsletterUrl}>{t("contact.newsletter")}</a>
                  </li>
                ) : null}
              </ul>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
