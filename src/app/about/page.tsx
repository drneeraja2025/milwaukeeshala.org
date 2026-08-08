import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Milwaukee Marathi Shala — a Milwaukee Marathi Mandal and BMM program for ages 5–14 at HTW on Saturdays.",
};

export default function AboutPage() {
  return (
    <div className="page-shell">
      <PageHero
        eyebrow="Our story"
        title="A home for Marathi in Milwaukee"
        lead="Milwaukee Marathi Shala brings children and families together to learn language, culture, and community — आपली माणसं, आपली भाषा."
      />

      <div className="split">
        <div className="content-panel">
          <h2>MMM + BMM</h2>
          <div className="logo-row">
            <Image
              src="/MMSlogo.jpg"
              alt="Milwaukee Marathi Shala logo"
              width={88}
              height={88}
            />
            <Image
              src="/BMM-Shala-Logo.jpg"
              alt="BMM Marathi Shala logo"
              width={88}
              height={88}
            />
          </div>
          <p>
            Milwaukee Marathi Shala is a community language school organized
            with{" "}
            <a href="https://www.mmmilwaukee.org/" target="_blank" rel="noopener noreferrer">
              Milwaukee Marathi Mandal (MMM)
            </a>{" "}
            and aligned with the{" "}
            <a
              href="https://bmmonline.org/marathishala/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Bharatiya Marathi Mandal (BMM) Marathi Shala
            </a>{" "}
            curriculum.
          </p>
          <p>
            Our mission is to help children build confidence in Marathi
            speaking, reading, and writing while celebrating the culture that
            connects our families across Greater Milwaukee.
          </p>
        </div>

        <div className="content-panel">
          <h2>At a glance</h2>
          <ul className="fact-list">
            <li>
              <strong>Ages</strong>
              5–14
            </li>
            <li>
              <strong>When</strong>
              {site.schedule}
            </li>
            <li>
              <strong>Where</strong>
              {site.location}
            </li>
            <li>
              <strong>School year</strong>
              {site.yearLabel} (second year)
            </li>
          </ul>
        </div>
      </div>

      <div className="section-tight">
        <div className="press-frame">
          <h2>In the press</h2>
          <p className="muted">
            Local coverage of Milwaukee Marathi Shala and our growing community.
          </p>
          <Image
            src="/media/IMG-20260111-WA0029.jpg"
            alt="Press clipping about Milwaukee Marathi Shala"
            width={1200}
            height={900}
            style={{ width: "100%", height: "auto", marginTop: "1rem" }}
          />
        </div>
      </div>
    </div>
  );
}
