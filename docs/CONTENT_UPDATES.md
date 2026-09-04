# Content updates (calendar, news, staff, photos)

You do **not** need to edit HTML for routine updates.

## Short term (now)

Edit JSON under `data/` and push to `main` (or ask Cursor in chat with the new facts):

| File | Purpose |
|------|---------|
| `data/events.manual.json` | Hardcoded calendar (Kalnirnay, MMM, fixed Shala dates). **Never overwritten by sync.** |
| `data/events.sislms.json` | GuruVidyaZen SISLMS overlay (auto). Do not hand-edit unless fixing a bad sync. |
| `data/updates.json` | News & Updates |
| `data/gallery.json` | Photo albums |
| `data/staff.json` | Staff cards (`people`) + phone `contacts` |
| `data/site-settings.json` | Fee, year label, schedule, location, form/social URLs |
| `data/announcement.json` | Site-wide alert banner (on/off) |
| `data/faq.json` | FAQ page |
| `data/resources.json` | Downloads / resources page |
| `data/testimonials.json` | Home & admissions quotes |
| `data/sponsors.json` | Program page partner links |
| `data/program-levels.json` | `/programs/beginner` etc. |
| `data/spotlights.json` | About page spotlight stories |

The site calendar **merges** manual + SISLMS (add/update SISLMS rows; manual rows stay).

### Example event

```json
{
  "id": "class-2026-09-12",
  "title": "Saturday class",
  "date": "2026-09-12",
  "startTime": "13:00",
  "endTime": "15:00",
  "location": "Hindu Temple of Wisconsin",
  "description": "Regular Saturday Marathi class"
}
```

### Example staff person

```json
{
  "id": "teacher-1",
  "name": "Full Name",
  "nameMr": "पूर्ण नाव",
  "role": "Teacher",
  "roleMr": "शिक्षक",
  "bio": "Short bio in English.",
  "bioMr": "मराठीत छोटी ओळख.",
  "photo": "/media/staff/your-photo.jpg",
  "order": 1
}
```

Put photos in `public/media/` (or `public/media/staff/`) and reference them as `/media/...`.

## Do I have to tell Cursor every time?

No. Anyone with repo access can edit the JSON files and push. Cursor chat is optional for non-technical editors (“add Aug 29 all-school meeting 4pm HTW”).

## Hybrid content entry points

| Content | Where staff work | How it reaches the site |
|---------|------------------|-------------------------|
| Upcoming / calendar | GuruVidyaZen → **Milwaukee Marathi Shala** calendar | Weekly sync → `events.sislms.json` (manual Kalnirnay/MMM stay in `events.manual.json`) |
| News (text + optional image) | [milwaukeeshala.org/staff/login](https://milwaukeeshala.org/staff/login) → Publish | Commits `data/updates.json` (+ image under `public/media/uploads/news/`) |
| Gallery photos | Same → **Photo** | Commits photo + `data/gallery.json` |
| Teacher bio / photo / phone | Same → **Teachers** | Commits `data/staff.json` (+ `public/media/uploads/staff/`) |
| Add / delete teacher | Same → **Teachers** (mode) | Updates `data/staff.json` |
| Edit / delete news | Same → **News** (manage block) | Updates `data/updates.json` |
| YouTube videos | Same → **Video** | Updates `data/gallery.json` `videos` |
| Site settings (fee, URLs) | Same → **Settings** | Commits `data/site-settings.json` |
| Alert banner | Same → **Banner** | Commits `data/announcement.json` |
| PDF / resource links | Same → **Resource** | Commits `data/resources.json` + uploads |
| Pay / admissions QR | Same → **QR** | Replaces `/media/zelle-pay-qr.png` or `/media/admissions-qr.png` |

**Entry point:** bookmark [**/staff/login**](https://milwaukeeshala.org/staff/login) (not in public nav). After login you land on `/staff/publish`. Session cookie lasts ~7 days.

Needs Vercel env:

- `CONTENT_PUBLISH_SECRET` (or optional `ADMIN_PASSWORD`) — admin login password  
- `GITHUB_CONTENT_TOKEN` — GitHub PAT with `contents:write` on this repo  
- Optional: `GITHUB_CONTENT_REPO` (default `drneeraja2025/milwaukeeshala.org`), `GITHUB_CONTENT_BRANCH` (default `main`)

API still accepts `Authorization: Bearer <same password>` for scripts.

## SISLMS calendar sync (live)

1. **Source:** GuruVidyaZen academy **Milwaukee Marathi Shala** via public feed  
   `GET https://guruvidyazen.nasneeraj.com/api/public-school-calendar?school=Milwaukee%20Marathi%20Shala`  
   (implemented in Gurukul-by-NAS `api/public-school-calendar.ts`).
2. **Merge rules:** Manual events in `events.manual.json` are never replaced. Sync only rewrites `events.sislms.json` (ids prefixed `sislms-`).
3. **Automation:** GitHub Action `.github/workflows/sync-sislms-calendar.yml` runs **weekly (Mondays)** and on `workflow_dispatch`. Local: `npm run sync:sislms-calendar`.
4. Do **not** put private student data on this marketing site (feed excludes assignments/announcements/participants).

## Legal / branding notes

- Never mention SISMMS on this site.
- Portal label is **SISLMS**.
- Company attribution: **Saaniya Software LLC**.
