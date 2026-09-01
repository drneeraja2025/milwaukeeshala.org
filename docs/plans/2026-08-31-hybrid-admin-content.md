# Plan: Hybrid admin content (milwaukeeshala.org)

**Date:** 2026-08-31  
**Product:** milwaukeeshala.org only  
**Mode:** HOTL → offline-verify-push

## Goal

Let school admins update public website content without editing code:

| Area | Owner | Mechanism |
|------|--------|-----------|
| Upcoming / calendar | GuruVidyaZen · Milwaukee Marathi Shala | Existing weekly calendar sync |
| News (text + image) | Staff publish page | `/staff/publish` → GitHub commit |
| Gallery photos | Staff publish page | same |
| Teacher bio + photo | Staff publish page | **new** Teachers tab |
| Pay / admissions QR | Staff publish page | **new** QR tab |

## Done when

1. `/staff/login` sets a signed session; `/staff/publish` has tabs: News | Photo | Teachers | QR  
2. API accepts session cookie or Bearer `kind=news|photo|teacher|qr`  
3. `npm run build` succeeds  
4. Changes committed and pushed to `main` (Production)  
5. Docs list env vars and entry points  

## Out of scope

- GuruVidyaZen / Gurukul-by-NAS code changes  
- Putting secrets in git  
- Changing fee copy, Google Form URL, or hero (unless via later plan)  
- Private student data on the marketing site  

## Implementation notes

- Auth: `/staff/login` password (`ADMIN_PASSWORD` or `CONTENT_PUBLISH_SECRET`) → signed httpOnly cookie; API also accepts Bearer for scripts  
- Persist via GitHub Contents API (`GITHUB_CONTENT_TOKEN`)  
- Teacher photos → `public/media/uploads/staff/` + `data/staff.json`  
- QR replaces fixed paths: `/media/zelle-pay-qr.png`, `/media/admissions-qr.png`  
- Ship: this repo `main` only (no separate preview branch)  

## Residual ops (human)

Set Vercel Production env: `CONTENT_PUBLISH_SECRET`, `GITHUB_CONTENT_TOKEN` (and optional repo/branch overrides). Without these, the page loads but publish returns 500/401.
