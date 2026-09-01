---
name: hotl-hybrid-admin
description: >-
  HOTL execute the milwaukeeshala.org hybrid admin content plan (staff publish
  for news, photos, teachers, QR). Use when the user says /hotl for hybrid
  admin, staff publish, or points at docs/plans/2026-08-31-hybrid-admin-content.md.
---

# HOTL — Hybrid admin content

Read and execute: `docs/plans/2026-08-31-hybrid-admin-content.md`

Then run the global **offline-verify-push** loop for **this repo only**: build → commit → push `main` (Production).

## Done when (from plan)

- Staff page tabs: News | Photo | Teachers | QR  
- API kinds: `news` | `photo` | `teacher` | `qr`  
- `npm run build` green  
- Pushed to `main`  

## Never

- Commit secrets  
- Touch GuruVidyaZen unless user names it  
- Force-push  

## Final reply

**Done** or **Blocked** with evidence table (build / SHA / Production URL).
