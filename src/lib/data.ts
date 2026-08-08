import events from "../../data/events.json";
import updates from "../../data/updates.json";
import gallery from "../../data/gallery.json";
import staff from "../../data/staff.json";

export type EventItem = {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
};

export type UpdateItem = {
  id: string;
  date: string;
  title: string;
  summary: string;
  body: string;
};

export type GalleryPhoto = {
  src: string;
  alt: string;
  caption: string;
};

export type GalleryAlbum = {
  id: string;
  title: string;
  description: string;
  cover: string;
  photos: GalleryPhoto[];
};

export function getEvents(): EventItem[] {
  return [...events].sort((a, b) => {
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
  return [...updates].sort((a, b) => b.date.localeCompare(a.date));
}

export function getGallery() {
  return gallery as { albums: GalleryAlbum[]; videos: unknown[] };
}

export function getStaff() {
  return staff;
}

export function formatEventDate(date: string): string {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatShortDate(date: string): string {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatTime(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;
  return `${hour12}:${String(minutes).padStart(2, "0")} ${period}`;
}
