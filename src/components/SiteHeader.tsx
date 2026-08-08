"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import { navLinks, site } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { t, lang, setLang } = useI18n();

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand-lockup" onClick={() => setOpen(false)}>
          <Image
            src="/MMSlogo.jpg"
            alt="Milwaukee Marathi Shala logo"
            width={52}
            height={52}
            className="brand-logo"
            priority
          />
          <span className="brand-text">
            <span className="brand-en">{site.name}</span>
            <span className="brand-mr" lang="mr">
              {site.nameMr}
            </span>
          </span>
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{t("cta.menu")}</span>
          <span aria-hidden="true">{open ? "✕" : "☰"}</span>
        </button>

        <nav
          id="primary-nav"
          className={`primary-nav ${open ? "is-open" : ""}`}
          aria-label="Primary"
        >
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={active ? "nav-link is-active" : "nav-link"}
                onClick={() => setOpen(false)}
              >
                {t(link.labelKey)}
              </Link>
            );
          })}
          <div className="lang-toggle" role="group" aria-label="Language">
            <button
              type="button"
              className={lang === "en" ? "is-active" : ""}
              onClick={() => setLang("en")}
            >
              EN
            </button>
            <button
              type="button"
              className={lang === "mr" ? "is-active" : ""}
              onClick={() => setLang("mr")}
              lang="mr"
            >
              मराठी
            </button>
          </div>
          <Link
            href={site.payPath}
            className="nav-cta nav-cta-pay"
            onClick={() => setOpen(false)}
          >
            {t("cta.pay")}
          </Link>
          <a
            href={site.portalUrl}
            className="nav-cta"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("cta.sislms")}
          </a>
        </nav>
      </div>
    </header>
  );
}
