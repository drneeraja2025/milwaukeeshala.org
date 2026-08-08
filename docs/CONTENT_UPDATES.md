# Content updates (calendar, news, staff, photos)

You do **not** need to edit HTML for routine updates.

## Short term (now)

Edit JSON under `data/` and push to `main` (or ask Cursor in chat with the new facts):

| File | Purpose |
|------|---------|
| `data/events.json` | Calendar / upcoming dates |
| `data/updates.json` | News & Updates |
| `data/gallery.json` | Photo albums |
| `data/staff.json` | Staff cards (`people`) + phone `contacts` |

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

## When SISLMS calendar goes live

1. Keep publishing **public** dates on this site via `events.json` (families expect a public page).
2. Later option: export or sync from GuruVidyaZen SISLMS into `events.json`, or a read-only ICS/API if the product exposes one.
3. Do **not** put private student data on this marketing site.

## Legal / branding notes

- Never mention SISMMS on this site.
- Portal label is **SISLMS**.
- Company attribution: **Saaniya Software LLC**.
