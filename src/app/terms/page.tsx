import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of Use for milwaukeeshala.org",
};

export default function TermsPage() {
  return (
    <div className="page-shell legal-page">
      <PageHero
        eyebrow="Legal"
        title="Terms of Use"
        lead="Rules for using milwaukeeshala.org. This is not legal advice."
      />
      <div className="content-panel prose-legal">
        <p>
          <strong>Effective date:</strong> August 8, 2026 ·{" "}
          <strong>Last updated:</strong> August 8, 2026
        </p>
        <h2>Acceptance</h2>
        <p>
          By using milwaukeeshala.org you agree to these Terms. If you do not
          agree, do not use the site.
        </p>
        <h2>Purpose of the site</h2>
        <p>
          This site publishes public information about Milwaukee Marathi Shala
          (admissions, calendar, news, photos, and related community information).
          It is not an accredited Seal of Biliteracy program page and does not
          replace official school or government guidance.
        </p>
        <h2>School vs software</h2>
        <p>
          Educational program content is provided by Milwaukee Marathi Shala /
          community organizers. Technology for this website and the separate
          GuruVidyaZen SISLMS product involves <strong>{site.saaniya}</strong>.
          Using this website does not create a student, employment, or software
          subscription relationship with {site.saaniya} unless you separately
          agree to product terms on SISLMS / GuruVidyaZen.
        </p>
        <h2>Accounts and portal</h2>
        <p>
          The <strong>SISLMS</strong> link opens a separate application. Portal
          accounts, grades, and student data are governed by that system’s terms
          and privacy policy—not solely by these marketing-site Terms.
        </p>
        <h2>User conduct</h2>
        <p>
          Do not misuse the site, attempt to disrupt hosting, scrape personal
          data, or submit false information through linked forms.
        </p>
        <h2>Intellectual property</h2>
        <p>
          School logos, photos, and copy on this site are used for Milwaukee
          Marathi Shala community purposes. {site.saaniya} branding remains
          property of {site.saaniya}. Do not reuse marks without permission.
        </p>
        <h2>Limitation</h2>
        <p>
          THE SITE IS PROVIDED “AS IS.” TO THE MAXIMUM EXTENT PERMITTED BY LAW,
          MILWAUKEE MARATHI SHALA COMMUNITY ORGANIZERS AND {site.saaniya.toUpperCase()}{" "}
          DISCLAIM WARRANTIES AND LIMIT LIABILITY FOR DAMAGES ARISING FROM USE OF
          THIS MARKETING SITE. See the <Link href="/disclaimer">Disclaimer</Link>.
        </p>
        <h2>Changes</h2>
        <p>
          We may update these Terms by posting a new version on this page.
        </p>
        <h2>Contact</h2>
        <p>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
        <p>
          Related: <Link href="/privacy">Privacy Policy</Link> ·{" "}
          <Link href="/disclaimer">Disclaimer</Link>
        </p>
      </div>
    </div>
  );
}
