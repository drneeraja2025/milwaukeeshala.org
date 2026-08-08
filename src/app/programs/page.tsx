import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Marathi learning at Milwaukee Marathi Shala, including Avant Assessment pathways for college credit. Certified proctors on staff.",
};

export default function ProgramsPage() {
  return (
    <div className="page-shell">
      <PageHero
        eyebrow="Programs"
        title="Language learning with a path forward"
        lead="Our Saturday classes build Marathi skills for ages 5–14. Students interested in college credit can pursue Avant Assessment in 11th grade with support from certified proctors on staff."
      />

      <div className="split">
        <div className="content-panel">
          <h2>Classroom program</h2>
          <ul className="program-points">
            <li>
              Age-appropriate Marathi speaking, reading, and writing aligned with
              the BMM Marathi Shala curriculum.
            </li>
            <li>
              Community learning on Saturdays at {site.location}, 1:00–3:00 PM.
            </li>
            <li>
              Cultural connection through songs, stories, celebrations, and
              family involvement.
            </li>
          </ul>

          <h2 style={{ marginTop: "1.75rem" }}>Avant Assessment</h2>
          <ul className="program-points">
            <li>
              Milwaukee Marathi Shala is <strong>not</strong> a Seal of
              Biliteracy Avant-certified program.
            </li>
            <li>
              Students can still take the Avant exam in 11th grade as a pathway
              toward college credit.
            </li>
            <li>
              Certified Avant Assessment proctors are on staff to help families
              navigate testing.
            </li>
          </ul>
          <div className="cta-row" style={{ marginTop: "1.25rem" }}>
            <a
              className="btn btn-navy"
              href={site.avantUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn about Avant / BMM
            </a>
          </div>
        </div>

        <div className="program-visuals">
          <figure>
            <Image
              src="/media/IMG-20260117-WA0003.jpg"
              alt="Students during an exam session"
              fill
              sizes="(max-width: 900px) 100vw, 40vw"
            />
          </figure>
          <figure>
            <Image
              src="/media/20260521_171946.jpg"
              alt="Certificate presentation"
              fill
              sizes="(max-width: 900px) 100vw, 40vw"
            />
          </figure>
        </div>
      </div>
    </div>
  );
}
