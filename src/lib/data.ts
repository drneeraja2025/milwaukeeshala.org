import manualEvents from "../../data/events.manual.json";
import sislmsEvents from "../../data/events.sislms.json";
import updates from "../../data/updates.json";
import gallery from "../../data/gallery.json";
import staff from "../../data/staff.json";
import type { Lang } from "@/lib/i18n/dictionaries";

export type EventItem = {
  id: string;
  title: string;
  titleMr?: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  locationMr?: string;
  description: string;
  descriptionMr?: string;
  /** Present on SISLMS-synced rows only; hardcoded Kalnirnay/MMM rows omit this. */
  source?: "sislms" | string;
};

export type UpdateItem = {
  id: string;
  date: string;
  title: string;
  titleMr?: string;
  summary: string;
  summaryMr?: string;
  body: string;
  bodyMr?: string;
};

export type GalleryPhoto = {
  src: string;
  alt: string;
  altMr?: string;
  caption: string;
  captionMr?: string;
};

export type GalleryAlbum = {
  id: string;
  title: string;
  titleMr?: string;
  description: string;
  descriptionMr?: string;
  cover: string;
  photos: GalleryPhoto[];
};

export function pickLocale<T>(lang: Lang, en: T, mr?: T | null): T {
  return lang === "mr" && mr != null && mr !== "" ? mr : en;
}

export function getEvents(): EventItem[] {
  // Hardcoded Kalnirnay/MMM/etc. stay forever; SISLMS layer adds/updates separately.
  const merged = [
    ...(manualEvents as EventItem[]),
    ...(sislmsEvents as EventItem[]),
  ];
  return merged.sort((a, b) => {
    const aKey = `${a.date}T${a.startTime}`;
    const bKey = `${b.date}T${b.startTime}`;
    return aKey.localeCompare(bKey);
  });
}

export function getUpcomingEvents(limit = 3): EventItem[] {
  const today = new Date().toISOString().slice(0, 10);
  return getEvents().filter((event) => event.date >= today).slice(0, limit);
}

export function getUpdates(): UpdateItem[] {
  return [...(updates as UpdateItem[])].sort((a, b) => b.date.localeCompare(a.date));
}

export function getGallery() {
  return gallery as { albums: GalleryAlbum[]; videos: unknown[] };
}

export function getStaff() {
  return staff as {
    contacts: Array<{
      name: string;
      role: string;
      roleMr?: string;
      phone: string;
      email: string | null;
    }>;
    people: Array<{
      id: string;
      name: string;
      nameMr?: string;
      role: string;
      roleMr?: string;
      bio: string;
      bioMr?: string;
      photo: string | null;
      order: number;
    }>;
    notes: string[];
    notesMr?: string[];
  };
}

function localeTag(lang: Lang = "en"): string {
  return lang === "mr" ? "mr-IN" : "en-US";
}

export function formatEventDate(date: string, lang: Lang = "en"): string {
  return new Date(`${date}T12:00:00`).toLocaleDateString(localeTag(lang), {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatShortDate(date: string, lang: Lang = "en"): string {
  return new Date(`${date}T12:00:00`).toLocaleDateString(localeTag(lang), {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatTime(time: string, lang: Lang = "en"): string {
  const [hours, minutes] = time.split(":").map(Number);
  const hour12 = hours % 12 || 12;
  const mm = String(minutes).padStart(2, "0");
  if (lang === "mr") {
    const period = hours >= 12 ? "अपराह्न" : "पूर्वाह्न";
    return `${hour12}:${mm} ${period}`;
  }
  const period = hours >= 12 ? "PM" : "AM";
  return `${hour12}:${mm} ${period}`;
}
