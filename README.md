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

- Vercel team: `nas25` (`team_lHXh86Jypc6v6Hnt9vJgsH9A`)
- Vercel project: `milwaukeeshala-org`
- Production URL: https://milwaukeeshala-org.vercel.app
- GitHub: https://github.com/drneeraja2025/milwaukeeshala.org

Domains `milwaukeeshala.org` and `www.milwaukeeshala.org` are attached on Vercel. Keep Squarespace nameservers; only update DNS records.

### Squarespace DNS records (recommended by Vercel)

| Host | Type | Value |
|------|------|-------|
| `@` | A | `216.150.1.1` |
| `@` | A | `216.150.16.1` |
| `www` | CNAME | `dc3ccac0eb87bf52.vercel-dns-016.com` |

### Alternate (still accepted by Vercel)

| Host | Type | Value |
|------|------|-------|
| `@` | A | `76.76.21.21` |
| `www` | CNAME | `cname.vercel-dns.com` |

Do **not** change Squarespace nameservers to Vercel unless you intend to move DNS hosting entirely.

## Important links

- Student Portal: https://sislms.guruvidyazen.nasneeraj.com/auth
- Admissions email: mmm.marathishala@gmail.com
