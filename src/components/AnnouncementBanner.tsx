"use client";

import Link from "next/link";
import { getAnnouncement, pickLocale } from "@/lib/data";
import { useI18n } from "@/lib/i18n/LanguageProvider";

export function AnnouncementBanner() {
  const { lang } = useI18n();
  const announcement = getAnnouncement();
  if (!announcement.enabled || !announcement.message) return null;

  const message = pickLocale(lang, announcement.message, announcement.messageMr);
  const linkLabel = pickLocale(
    lang,
    announcement.linkLabel || "Learn more",
    announcement.linkLabelMr,
  );

  const group = (hidden: boolean) => (
    <div
      className="announcement-group"
      aria-hidden={hidden ? true : undefined}
    >
      <span className="announcement-msg">{message}</span>
      {announcement.link ? (
        <Link href={announcement.link} className="announcement-link" tabIndex={hidden ? -1 : undefined}>
          {linkLabel} →
        </Link>
      ) : null}
    </div>
  );

  return (
    <div className="announcement-banner" role="status">
      <div className="announcement-viewport">
        <div className="announcement-track">
          {group(false)}
          {group(true)}
        </div>
      </div>
    </div>
  );
}
