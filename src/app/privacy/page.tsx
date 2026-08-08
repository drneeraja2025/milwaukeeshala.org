import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for milwaukeeshala.org",
};

export default function PrivacyPage() {
  return (
    <div className="page-shell legal-page">
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        lead="How this website handles information. This is not legal advice."
      />
      <div className="content-panel prose-legal">
        <p>
          <strong>Effective date:</strong> August 8, 2026 ·{" "}
          <strong>Last updated:</strong> August 8, 2026
        </p>
        <h2>Who we are</h2>
        <p>
          This website (<strong>milwaukeeshala.org</strong>) provides public
          information about <strong>Milwaukee Marathi Shala</strong>, a community
          Marathi language school associated with Milwaukee Marathi Mandal. School
          content and program decisions are the responsibility of the school /
          mandal community.
        </p>
        <p>
          Website technology and hosting support may be provided by{" "}
          <strong>{site.saaniya}</strong>. {site.saaniya} is a software company
          and is <strong>not</strong> the school. The separate{" "}
          <strong>GuruVidyaZen SISLMS</strong> portal is a product of{" "}
          {site.saaniya} and is governed by that product’s own policies when you
          use it.
        </p>
        <h2>Information this marketing site collects</h2>
        <p>
          This site is primarily informational. We do not operate student
          information databases on milwaukeeshala.org. Typical interactions:
        </p>
        <ul>
          <li>
            Links to email (<a href={`mailto:${site.email}`}>{site.email}</a>)
          </li>
          <li>
            Off-site admissions Google Forms operated by Google / the school
          </li>
          <li>Optional analytics or hosting logs collected by Vercel (IP, user agent)</li>
          <li>Language preference stored in your browser (localStorage)</li>
        </ul>
        <h2>Children’s privacy</h2>
        <p>
          This marketing site is intended for parents and guardians. Do not submit
          children’s personal data on this site except through official school
          forms the school provides. School records, if any, will live in SISLMS
          or other school systems—not on this public website.
        </p>
        <h2>Third-party services</h2>
        <p>
          Links to Google Forms, Zelle, parent organizations, Avant Assessment,
          and SISLMS are third-party services with their own privacy practices.
          We do not control those services.
        </p>
        <h2>Payments</h2>
        <p>
          Fee payments and donations via Zelle are processed by the payee shown on
          the Pay page—not by {site.saaniya}. Do not send payment credentials to
          this website.
        </p>
        <h2>Contact</h2>
        <p>
          School / website content questions:{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>. For GuruVidyaZen /
          SISLMS product privacy terms, refer to that product’s policies.
        </p>
        <p>
          See also <Link href="/terms">Terms of Use</Link> and{" "}
          <Link href="/disclaimer">Disclaimer</Link>.
        </p>
      </div>
    </div>
  );
}
