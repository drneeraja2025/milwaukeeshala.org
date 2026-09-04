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

  return (
    <div className="announcement-banner" role="status">
      <p>{message}</p>
      {announcement.link ? (
        <Link href={announcement.link} className="announcement-link">
          {linkLabel} →
        </Link>
      ) : null}
    </div>
  );
}
