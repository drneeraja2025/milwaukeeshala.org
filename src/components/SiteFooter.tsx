import Image from "next/image";
import Link from "next/link";
import { navLinks, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Image
            src="/MMSlogo.jpg"
            alt="Milwaukee Marathi Shala logo"
            width={64}
            height={64}
          />
          <div>
            <p className="footer-name">{site.name}</p>
            <p className="footer-motto" lang="mr">
              {site.motto}
            </p>
            <p className="footer-meta">
              {site.schedule} · {site.location}
            </p>
          </div>
        </div>

        <div className="footer-cols">
          <div>
            <h2>Explore</h2>
            <ul>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Connect</h2>
            <ul>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <a
                  href={site.admissionsFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Admissions form
                </a>
              </li>
              <li>
                <a
                  href={site.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {site.portalLabel}
                </a>
              </li>
              {site.parents.map((parent) => (
                <li key={parent.href}>
                  <a href={parent.href} target="_blank" rel="noopener noreferrer">
                    {parent.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Milwaukee Marathi Shala · A program of
          Milwaukee Marathi Mandal
        </p>
        <p className="footer-credit">Site by Saaniya Software LLC</p>
      </div>
    </footer>
  );
}
