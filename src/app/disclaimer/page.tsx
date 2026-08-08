import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Disclaimer for milwaukeeshala.org and Saaniya Software LLC",
};

export default function DisclaimerPage() {
  return (
    <div className="page-shell legal-page">
      <PageHero
        eyebrow="Legal"
        title="Disclaimer"
        lead="Important limits on warranties and liability. This is not legal advice."
      />
      <div className="content-panel prose-legal">
        <p>
          <strong>Effective date:</strong> August 8, 2026 ·{" "}
          <strong>Last updated:</strong> August 8, 2026
        </p>
        <h2>General</h2>
        <p>
          Information on milwaukeeshala.org is for general community information
          about Milwaukee Marathi Shala. Content may change; schedules, fees, and
          admissions rules can be updated without notice.
        </p>
        <h2>No educational warranties</h2>
        <p>
          Milwaukee Marathi Shala is <strong>not</strong> a Seal of Biliteracy
          Avant-certified program. Mentions of Avant Assessment describe a
          possible pathway (including exams often taken in later grades) and do
          not guarantee college credit, certification, or outcomes. Families
          should verify requirements with schools and Avant / BMM resources.
        </p>
        <h2>Saaniya Software LLC</h2>
        <p>
          <strong>{site.saaniya}</strong> may develop, host, or support this
          website and offers the separate GuruVidyaZen SISLMS product.{" "}
          {site.saaniya}:
        </p>
        <ul>
          <li>is not the school and does not operate classroom instruction;</li>
          <li>does not accredit programs or grant Seal of Biliteracy;</li>
          <li>
            does not process Milwaukee Marathi Shala tuition on this marketing
            site (Zelle payments go to the listed school/organization payee);
          </li>
          <li>
            provides software and related services “as is” except where a
            separate written agreement says otherwise.
          </li>
        </ul>
        <h2>Third-party links & payments</h2>
        <p>
          External sites (Google Forms, Zelle, MMM, BMM, Avant, SISLMS, and
          others) are not controlled by this website. Use them at your own risk.
        </p>
        <h2>Limitation of liability</h2>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, NEITHER THE
          MILWAUKEE MARATHI SHALA COMMUNITY ORGANIZERS NOR {site.saaniya.toUpperCase()}{" "}
          SHALL BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
          PUNITIVE DAMAGES, OR ANY LOSS OF DATA, PROFITS, OR BUSINESS ARISING
          FROM USE OF THIS WEBSITE OR RELIANCE ON ITS CONTENT.
        </p>
        <h2>Contact</h2>
        <p>
          School questions: <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
        <p>
          <Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link>
        </p>
      </div>
    </div>
  );
}
