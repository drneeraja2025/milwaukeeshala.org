"use client";

import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import { navLinks, site } from "@/lib/site";

export function SiteFooter() {
  const { t, lang } = useI18n();
  const year = new Date().getFullYear();

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
            <p className="footer-name">
              {lang === "mr" ? site.nameMr : site.name}
            </p>
            <p className="footer-motto" lang="mr">
              {site.motto}
            </p>
            <p className="footer-meta">
              {t("site.schedule")} · {t("site.location")}
            </p>
          </div>
        </div>

        <div className="footer-cols">
          <div>
            <h2>{t("footer.explore")}</h2>
            <ul>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{t(link.labelKey)}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>{t("footer.connect")}</h2>
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
                  {t("footer.admissionsForm")}
                </a>
              </li>
              <li>
                <Link href={site.payPath}>{t("cta.pay")}</Link>
              </li>
              <li>
                <a
                  href={site.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("cta.sislms")}
                </a>
              </li>
              {site.parents.map((parent, index) => (
                <li key={parent.href}>
                  <a href={parent.href} target="_blank" rel="noopener noreferrer">
                    {index === 0 ? t("parent.mmm") : t("parent.bmm")}
                  </a>
                </li>
              ))}
              {site.facebookUrl ? (
                <li>
                  <a href={site.facebookUrl} target="_blank" rel="noopener noreferrer">
                    Facebook
                  </a>
                </li>
              ) : null}
              <li>
                <Link href="/volunteer">{t("nav.volunteer")}</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2>{t("footer.legal")}</h2>
            <ul>
              <li>
                <Link href="/privacy">{t("footer.privacy")}</Link>
              </li>
              <li>
                <Link href="/terms">{t("footer.terms")}</Link>
              </li>
              <li>
                <Link href="/disclaimer">{t("footer.disclaimer")}</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>{t("footer.copy", { year })}</p>
        <p className="footer-credit">{t("footer.credit")}</p>
      </div>
    </footer>
  );
}
