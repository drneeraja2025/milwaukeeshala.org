"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import { navSections, site } from "@/lib/site";

const DESKTOP_MQ = "(min-width: 1024px)";

function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const { t, lang, setLang } = useI18n();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [desktopPinned, setDesktopPinned] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(navSections.map((s) => [s.id, true])),
  );

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ);
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!drawerOpen || isDesktop) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [drawerOpen, isDesktop]);

  const sidebarVisible = isDesktop ? desktopPinned : drawerOpen;

  function toggleSection(id: string) {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function closeMobile() {
    if (!isDesktop) setDrawerOpen(false);
  }

  return (
    <>
      <header className="site-topbar">
        <div className="topbar-inner">
          <div className="topbar-start">
            <button
              type="button"
              className="nav-toggle"
              aria-expanded={sidebarVisible}
              aria-controls="site-sidebar"
              onClick={() => {
                if (isDesktop) setDesktopPinned((v) => !v);
                else setDrawerOpen((v) => !v);
              }}
            >
              <span className="sr-only">{t("cta.menu")}</span>
              <span aria-hidden="true">{sidebarVisible ? "✕" : "☰"}</span>
            </button>

            <Link href="/" className="brand-lockup" onClick={closeMobile}>
              <Image
                src="/MMSlogo.jpg"
                alt="Milwaukee Marathi Shala logo"
                width={44}
                height={44}
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
          </div>

          <div className="topbar-actions">
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
            <Link href={site.payPath} className="nav-cta nav-cta-pay">
              {t("cta.pay")}
            </Link>
            <a
              href={site.portalUrl}
              className="nav-cta topbar-sislms"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("cta.sislms")}
            </a>
          </div>
        </div>
      </header>

      {!isDesktop && drawerOpen ? (
        <button
          type="button"
          className="nav-backdrop"
          aria-label={t("nav.closeMenu")}
          onClick={() => setDrawerOpen(false)}
        />
      ) : null}

      <aside
        id="site-sidebar"
        className={`site-sidebar ${sidebarVisible ? "is-open" : ""} ${
          isDesktop && desktopPinned ? "is-desktop-pinned" : ""
        }`}
        aria-hidden={!sidebarVisible}
      >
        <div className="sidebar-brand">
          <Link href="/" className="brand-lockup" onClick={closeMobile}>
            <Image
              src="/MMSlogo.jpg"
              alt=""
              width={48}
              height={48}
              className="brand-logo"
            />
            <span className="brand-text">
              <span className="brand-en">{site.name}</span>
              <span className="brand-mr" lang="mr">
                {site.motto}
              </span>
            </span>
          </Link>
        </div>

        <nav className="sidebar-nav" aria-label="Primary">
          {navSections.map((section) => {
            const expanded = openSections[section.id] !== false;
            const sectionActive = section.links.some((link) =>
              isActivePath(pathname, link.href),
            );
            return (
              <div
                key={section.id}
                className={`nav-section ${sectionActive ? "has-active" : ""}`}
              >
                <button
                  type="button"
                  className="nav-section-toggle"
                  aria-expanded={expanded}
                  onClick={() => toggleSection(section.id)}
                >
                  <span>{t(section.labelKey)}</span>
                  <span className="nav-chevron" aria-hidden="true">
                    {expanded ? "▾" : "▸"}
                  </span>
                </button>
                {expanded ? (
                  <ul className="nav-section-links">
                    {section.links.map((link) => {
                      const active = isActivePath(pathname, link.href);
                      return (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className={`nav-link ${active ? "is-active" : ""}`}
                            onClick={closeMobile}
                          >
                            {t(link.labelKey)}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </div>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <Link
            href={site.payPath}
            className="btn btn-primary sidebar-cta"
            onClick={closeMobile}
          >
            {t("cta.pay")}
          </Link>
          <a
            href={site.portalUrl}
            className="btn btn-secondary sidebar-cta"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMobile}
          >
            {t("cta.sislms")}
          </a>
        </div>
      </aside>
    </>
  );
}
