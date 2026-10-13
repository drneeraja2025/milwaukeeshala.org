"use client";

import Script from "next/script";
import { useCallback, useEffect, useState } from "react";

const KEY = "saaniya-cookie-consent";
const VERSION = "20261013";

type Consent = "essential" | "all";

function gpcOn(): boolean {
  try {
    return navigator.globalPrivacyControl === true;
  } catch {
    return false;
  }
}

function readConsent(): Consent | null {
  try {
    const value = localStorage.getItem(KEY);
    if (value === "essential" || value === "all") return value;
  } catch {
    /* private mode */
  }
  return null;
}

function writeConsent(value: Consent) {
  try {
    localStorage.setItem(KEY, value);
    localStorage.setItem(`${KEY}-v`, VERSION);
  } catch {
    /* private mode */
  }
}

function allowAnalytics(consent: Consent | null): boolean {
  if (gpcOn()) return false;
  return consent === "all";
}

type CookieConsentProps = {
  /** Server-passed: only load Vercel Web Analytics when deployed on Vercel. */
  loadVercelInsights?: boolean;
};

/**
 * Saaniya Phase 1 cookie + GPC consent.
 * localStorage: saaniya-cookie-consent = "essential" | "all"
 * GPC on => force essential; do not load analytics.
 */
export function CookieConsent({ loadVercelInsights = false }: CookieConsentProps) {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [ready, setReady] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (gpcOn()) {
      writeConsent("essential");
      setConsent("essential");
      setShowBanner(false);
      setReady(true);
      return;
    }
    const stored = readConsent();
    setConsent(stored);
    setShowBanner(stored === null);
    setReady(true);
  }, []);

  const choose = useCallback((value: Consent) => {
    writeConsent(value);
    setConsent(value);
    setShowBanner(false);
    window.dispatchEvent(new CustomEvent("saaniya-cookie-consent", { detail: value }));
  }, []);

  useEffect(() => {
    window.saaniyaAllowAnalytics = () => allowAnalytics(readConsent());
  }, [consent]);

  const analyticsOk = ready && allowAnalytics(consent);

  return (
    <>
      {showBanner ? (
        <div
          id="saaniya-cookie-banner"
          role="dialog"
          aria-label="Cookie preferences"
          className="saaniya-cookie-banner"
        >
          <p>
            We use essential cookies for site function (for example language). Optional analytics
            help us improve the site. We do not sell personal data. See our{" "}
            <a href="/privacy">Privacy Policy</a>. Global Privacy Control (GPC) is honored when your
            browser sends it.
          </p>
          <div className="saaniya-cookie-actions">
            <button
              type="button"
              className="saaniya-cookie-essential"
              onClick={() => choose("essential")}
            >
              Essential only
            </button>
            <button type="button" className="saaniya-cookie-all" onClick={() => choose("all")}>
              Accept analytics
            </button>
          </div>
        </div>
      ) : null}
      {analyticsOk && loadVercelInsights ? (
        <Script src="/_vercel/insights/script.js" strategy="afterInteractive" />
      ) : null}
    </>
  );
}

declare global {
  interface Window {
    saaniyaAllowAnalytics?: () => boolean;
  }
}
