/**
 * Sync public SISLMS (GuruVidyaZen) calendar into data/events.sislms.json.
 * Never modifies data/events.manual.json.
 *
 * Env:
 *   SISLMS_CALENDAR_URL  — default production public feed
 *   SISLMS_SCHOOL_NAME   — default "Milwaukee Marathi School"
 *   TZ display uses America/Chicago for date/time split
 */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outPath = join(root, "data", "events.sislms.json");

const SCHOOL = process.env.SISLMS_SCHOOL_NAME || "Milwaukee Marathi Shala";
const DEFAULT_URL = `https://guruvidyazen.nasneeraj.com/api/public-school-calendar?school=${encodeURIComponent(SCHOOL)}`;
const FEED_URL = process.env.SISLMS_CALENDAR_URL || DEFAULT_URL;
const TIME_ZONE = "America/Chicago";

function partsInChicago(iso) {
  const d = new Date(iso);
  const dateFmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const timeFmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return {
    date: dateFmt.format(d),
    time: timeFmt.format(d),
  };
}

function mapEvent(raw) {
  let date;
  let startTime;
  let endTime;
  if (raw.date && raw.startTime && raw.endTime) {
    date = String(raw.date).slice(0, 10);
    startTime = String(raw.startTime).slice(0, 5);
    endTime = String(raw.endTime).slice(0, 5);
  } else {
    const start = partsInChicago(raw.start_time);
    const end = partsInChicago(raw.end_time);
    date = start.date;
    startTime = start.time;
    endTime = end.time;
  }
  const location = raw.location?.trim() || "Milwaukee Marathi Shala";
  const description =
    (raw.description && String(raw.description).trim()) ||
    `Synced from GuruVidyaZen SISLMS (${raw.event_type || "event"}).`;

  return {
    id: `sislms-${raw.id}`,
    title: raw.title || "School event",
    date,
    startTime,
    endTime,
    location,
    description,
    source: "sislms",
    sislmsSource: raw.source,
    sislmsEventType: raw.event_type || null,
    sislmsUpdatedAt: new Date().toISOString(),
  };
}

async function main() {
  console.log(`[sync-sislms-calendar] Fetching ${FEED_URL}`);
  const res = await fetch(FEED_URL, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Feed HTTP ${res.status}: ${body.slice(0, 500)}`);
  }

  const payload = await res.json();
  const remote = Array.isArray(payload.events) ? payload.events : [];
  const mapped = remote.map(mapEvent);

  // Dedupe by id (last wins)
  const byId = new Map();
  for (const ev of mapped) byId.set(ev.id, ev);
  const next = [...byId.values()].sort((a, b) => {
    const aKey = `${a.date}T${a.startTime}`;
    const bKey = `${b.date}T${b.startTime}`;
    return aKey.localeCompare(bKey);
  });

  let prev = [];
  try {
    prev = JSON.parse(readFileSync(outPath, "utf8"));
  } catch {
    prev = [];
  }

  const prevJson = JSON.stringify(prev, null, 2) + "\n";
  const nextJson = JSON.stringify(next, null, 2) + "\n";
  writeFileSync(outPath, nextJson, "utf8");

  const changed = prevJson !== nextJson;
  console.log(
    `[sync-sislms-calendar] school=${payload.school?.name || SCHOOL} events=${next.length} changed=${changed}`,
  );
  if (changed) {
    console.log("[sync-sislms-calendar] Wrote data/events.sislms.json");
  } else {
    console.log("[sync-sislms-calendar] No content change");
  }
}

main().catch((err) => {
  console.error("[sync-sislms-calendar] FAILED", err);
  process.exit(1);
});
