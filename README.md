# Milwaukee Marathi Shala

Public website for **Milwaukee Marathi Shala** (`milwaukeeshala.org`).

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4

## Local development

```bash
npm install
npm run dev
```

## Deploy

Vercel team: `nas25`  
Domain: `milwaukeeshala.org` (DNS configured later at Squarespace)

### Squarespace DNS (after Vercel domain is attached)

Point the apex and www to Vercel using the records shown in the Vercel domain settings. Typical values:

| Host | Type | Value |
|------|------|-------|
| `@` | A | `76.76.21.21` |
| `www` | CNAME | `cname.vercel-dns.com` |

Confirm exact values in the Vercel project → Settings → Domains.

## Important links

- Student Portal: https://sislms.guruvidyazen.nasneeraj.com/auth
- Admissions email: mmm.marathishala@gmail.com
