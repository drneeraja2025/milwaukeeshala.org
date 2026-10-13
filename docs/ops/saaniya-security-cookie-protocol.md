# Saaniya Software — Security headers, cookies & transit protection (Phase 1)

> Short copy of the canonical protocol for this repo. Full source: `nasneeraj.com/docs/ops/saaniya-security-cookie-protocol.md`.  
> **Entity:** Saaniya Software LLC · **Site:** milwaukeeshala.org  
> **Not legal advice.**

## Phase 1 checklist

1. **Security headers** on all routes (`next.config.ts` `headers()`):
   - `Strict-Transport-Security`: `max-age=63072000; includeSubDomains; preload`
   - `X-Content-Type-Options`: `nosniff`
   - `X-Frame-Options`: `DENY`
   - `Referrer-Policy`: `strict-origin-when-cross-origin`
   - `Permissions-Policy`: `camera=(), microphone=(), geolocation=()`
   - `X-XSS-Protection`: `1; mode=block`
2. **No placeholder GA** (`G-XXXXXXXXXX`); do not load analytics without consent.
3. **Cookie + GPC**: `localStorage` key `saaniya-cookie-consent` = `essential` | `all`. If `navigator.globalPrivacyControl === true`, force essential. Banner: Essential only / Accept analytics; link `/privacy`.
4. **Vercel**: HTTPS; Preview **Standard Deployment Protection** (confirm in dashboard); secrets in Env only.

## This repo

| Control | Where |
|---------|--------|
| Headers (+ CSP) | `next.config.ts` |
| Cookie / GPC banner | `src/components/CookieConsent.tsx` (root layout) |
| Analytics gate | Vercel Insights loads only after consent=`all` and not GPC |
| Privacy page | `/privacy` |

## Agent checklist

```text
Apply Saaniya Phase 1 security/cookie protocol:
1) Add/merge security headers (HSTS, nosniff, frame deny, referrer, permissions-policy)
2) Remove placeholder GA (G-XXXXXXXXXX); gate any real analytics behind consent + GPC
3) Add cookie/GPC banner (or Next equivalent) with essential vs all
4) Confirm Preview Deployment Protection is Standard
5) Do not claim SOC 2 for Saaniya LLC; do not add attorney PDFs to public repos
6) Report: files changed, headers confirmed, consent path, residual risks
```
