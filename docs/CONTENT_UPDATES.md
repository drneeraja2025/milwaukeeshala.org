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

## SISLMS calendar sync (live)

1. **Source:** GuruVidyaZen academy **Milwaukee Marathi School** via public feed  
   `GET https://guruvidyazen.nasneeraj.com/api/public-school-calendar?school=Milwaukee%20Marathi%20School`  
   (implemented in Gurukul-by-NAS `api/public-school-calendar.ts`).
2. **Merge rules:** Manual events in `events.manual.json` are never replaced. Sync only rewrites `events.sislms.json` (ids prefixed `sislms-`).
3. **Automation:** GitHub Action `.github/workflows/sync-sislms-calendar.yml` runs **weekly (Mondays)** and on `workflow_dispatch`. Local: `npm run sync:sislms-calendar`.
4. Do **not** put private student data on this marketing site (feed excludes assignments/announcements/participants).

## Legal / branding notes

- Never mention SISMMS on this site.
- Portal label is **SISLMS**.
- Company attribution: **Saaniya Software LLC**.
