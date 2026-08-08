# Security notes — milwaukeeshala.org

Scope: **static public marketing site** (Next.js on Vercel). No student database or auth on this repo.

## Applied controls

- Security headers in `next.config.ts`: HSTS, `X-Content-Type-Options`, `X-Frame-Options: DENY`, Referrer-Policy, Permissions-Policy, Content-Security-Policy
- `poweredByHeader: false`
- External links use `rel="noopener noreferrer"` where applicable
- `public/robots.txt` present
- No secrets committed; env files not required for v1
- Payments via Zelle happen off-site (QR / banking apps) — this site does not collect card data
- Admissions form is Google Forms (third party)

## Out of scope here

Supabase RLS, session hardening, and app auth belong to **GuruVidyaZen SISLMS**, not this marketing site.

## Reporting

School content issues: mmm.marathishala@gmail.com
