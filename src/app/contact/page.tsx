import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { getStaff } from "@/lib/data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Milwaukee Marathi Shala — email mmm.marathishala@gmail.com and school phone contacts for admissions and questions.",
};

export default function ContactPage() {
  const staff = getStaff();

  return (
    <div className="page-shell">
      <PageHero
        eyebrow="Reach us"
        title="Contact"
        lead="Questions about admissions, classes, or volunteering? We would love to hear from you."
      />

      <div className="split">
        <div className="contact-panel">
          <h2>Email</h2>
          <p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
          <p className="muted">
            Ready to apply?{" "}
            <a
              href={site.admissionsFormUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open the admissions form
            </a>
            , or email{" "}
            <a href={site.admissionsMailto}>{site.email}</a> with questions.
          </p>

          <h2 style={{ marginTop: "1.75rem" }}>Phone contacts</h2>
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
          <h2>Staff directory</h2>
          <p>
            Meet teachers and contacts on the{" "}
            <a href="/staff">Staff</a> page. Profiles will grow as bios arrive.
          </p>
          <p style={{ marginTop: "1rem" }}>
            <a className="btn btn-secondary" href={site.payPath}>
              Pay / Donate
            </a>
          </p>
          <ul className="program-points">
            {staff.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
          <h2 style={{ marginTop: "1.75rem" }}>Parent organizations</h2>
          <ul className="contact-list">
            {site.parents.map((parent) => (
              <li key={parent.href}>
                <a href={parent.href} target="_blank" rel="noopener noreferrer">
                  {parent.label}
                </a>
              </li>
            ))}
          </ul>
          <h2 style={{ marginTop: "1.75rem" }}>{site.portalLabel}</h2>
          <p>
            School-wide login for Milwaukee Marathi Shala on GuruVidyaZen SISLMS.{" "}
            <a href={site.portalUrl} target="_blank" rel="noopener noreferrer">
              Open {site.portalLabel}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
