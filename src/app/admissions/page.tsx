import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Admissions",
  description:
    "Milwaukee Marathi Shala 2026–27 admissions — Balvarg for new students, $150 fee, BMM books, Saturdays 1–3 PM from September 5.",
};

export default function AdmissionsPage() {
  return (
    <div className="page-shell">
      <PageHero
        eyebrow={`Admissions ${site.yearLabel}`}
        title="Join us for year two"
        lead="New and returning students are welcome. Classes meet Saturdays from 1:00–3:00 PM starting September 5, 2026 at the Hindu Temple of Wisconsin."
      />

      <div className="split">
        <div className="content-panel">
          <h2>What to know</h2>
          <ul className="fact-list">
            <li>
              <strong>School year</strong>
              Second year · {site.yearLabel}
            </li>
            <li>
              <strong>New students</strong>
              Balvarg pathway for beginners joining the school
            </li>
            <li>
              <strong>Fee</strong>
              {site.fee} for the school year
            </li>
            <li>
              <strong>Books</strong>
              BMM curriculum books (ordered for {site.yearLabel})
            </li>
            <li>
              <strong>Schedule</strong>
              Saturdays, 1:00–3:00 PM · begins September 5, 2026
            </li>
            <li>
              <strong>Location</strong>
              {site.location}
            </li>
          </ul>
          <div className="cta-row" style={{ marginTop: "1.25rem" }}>
            <a
              className="btn btn-primary"
              href={site.admissionsFormUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open admissions form
            </a>
            <a className="btn btn-ghost" href="/media/MMS2026-27flyer.jpg" download>
              Download flyer
            </a>
          </div>

          <div className="admissions-qr">
            <Image
              src="/media/admissions-qr.png"
              alt="QR code to Milwaukee Marathi Shala admissions Google Form"
              width={180}
              height={180}
            />
            <div>
              <h3>Scan to apply</h3>
              <p className="muted">
                Point your phone camera at this QR code to open the admissions
                form, or use the button above.
              </p>
            </div>
          </div>

          <p className="muted" style={{ marginTop: "1rem" }}>
            Questions? Email{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </div>

        <div>
          <div className="flyer-preview">
            <Image
              src="/media/MMS2026-27flyer.jpg"
              alt="Milwaukee Marathi Shala 2026-27 admissions flyer"
              width={900}
              height={1200}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
