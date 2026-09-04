import manualEvents from "../../data/events.manual.json";
import sislmsEvents from "../../data/events.sislms.json";
import updates from "../../data/updates.json";
import gallery from "../../data/gallery.json";
import staff from "../../data/staff.json";
import faq from "../../data/faq.json";
import resources from "../../data/resources.json";
import testimonials from "../../data/testimonials.json";
import sponsors from "../../data/sponsors.json";
import programLevels from "../../data/program-levels.json";
import spotlights from "../../data/spotlights.json";
import announcement from "../../data/announcement.json";
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
  source?: "sislms" | string;
  detailHref?: string;
  rsvpUrl?: string;
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
  image?: string;
  publishAt?: string;
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

export type GalleryVideo = {
  id: string;
  title: string;
  titleMr?: string;
  youtubeId: string;
  caption?: string;
  captionMr?: string;
};

export type FaqItem = {
  id: string;
  question: string;
  questionMr?: string;
  answer: string;
  answerMr?: string;
};

export type ResourceItem = {
  id: string;
  title: string;
  titleMr?: string;
  description: string;
  descriptionMr?: string;
  href: string;
  type: "pdf" | "image" | "link";
};

export type Testimonial = {
  id: string;
  quote: string;
  quoteMr?: string;
  author: string;
  authorMr?: string;
};

export type Sponsor = {
  id: string;
  name: string;
  href: string;
  logo: string | null;
};

export type ProgramLevel = {
  id: string;
  title: string;
  titleMr?: string;
  summary: string;
  summaryMr?: string;
  body: string;
  bodyMr?: string;
};

export type Spotlight = {
  id: string;
  title: string;
  titleMr?: string;
  summary: string;
  summaryMr?: string;
  body: string;
  bodyMr?: string;
};

export type Announcement = {
  enabled: boolean;
  message: string;
  messageMr?: string;
  link?: string;
  linkLabel?: string;
};

export function pickLocale<T>(lang: Lang, en: T, mr?: T | null): T {
  return lang === "mr" && mr != null && mr !== "" ? mr : en;
}

export function getEvents(): EventItem[] {
  const merged = [...(manualEvents as EventItem[]), ...(sislmsEvents as EventItem[])];
  return merged.sort((a, b) => {
    const aKey = `${a.date}T${a.startTime}`;
    const bKey = `${b.date}T${b.startTime}`;
    return aKey.localeCompare(bKey);
  });
}

export function getEventById(id: string): EventItem | undefined {
  return getEvents().find((e) => e.id === id);
}

export function getUpcomingEvents(limit = 3): EventItem[] {
  const today = new Date().toISOString().slice(0, 10);
  return getEvents().filter((event) => event.date >= today).slice(0, limit);
}

function isPublished(item: { date: string; publishAt?: string }): boolean {
  const now = new Date().toISOString().slice(0, 10);
  if (item.publishAt && item.publishAt > now) return false;
  return true;
}

export function getUpdates(): UpdateItem[] {
  return [...(updates as UpdateItem[])]
    .filter(isPublished)
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** All news items including scheduled (for staff admin). */
export function getAllUpdates(): UpdateItem[] {
  return [...(updates as UpdateItem[])].sort((a, b) => b.date.localeCompare(a.date));
}

export function getGallery() {
  return gallery as { albums: GalleryAlbum[]; videos: GalleryVideo[] };
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

export function getFaq(): FaqItem[] {
  return faq as FaqItem[];
}

export function getResources(): ResourceItem[] {
  return resources as ResourceItem[];
}

export function getTestimonials(): Testimonial[] {
  return testimonials as Testimonial[];
}

export function getSponsors(): Sponsor[] {
  return sponsors as Sponsor[];
}

export function getProgramLevels(): ProgramLevel[] {
  return programLevels as ProgramLevel[];
}

export function getProgramLevel(id: string): ProgramLevel | undefined {
  return getProgramLevels().find((p) => p.id === id);
}

export function getSpotlights(): Spotlight[] {
  return spotlights as Spotlight[];
}

export function getAnnouncement(): Announcement {
  return announcement as Announcement;
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

export function googleCalendarUrl(event: EventItem): string {
  const start = `${event.date.replace(/-/g, "")}T${event.startTime.replace(":", "")}00`;
  const end = `${event.date.replace(/-/g, "")}T${(event.endTime || event.startTime).replace(":", "")}00`;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${start}/${end}`,
    details: event.description,
    location: event.location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
