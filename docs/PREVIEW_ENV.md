# Preview environment (Vercel)

Production ships from the `main` branch. To preview changes before they go live:

## Option A — Vercel preview deployments (recommended)

1. In the [Vercel project](https://vercel.com/nas25/milwaukeeshala-org), open **Settings → Git**.
2. Ensure **Preview Deployments** are enabled for pull requests and non-production branches.
3. Create a branch (e.g. `development`), push changes, and open a PR — Vercel builds a unique preview URL.
4. Merge to `main` when ready; production updates automatically.

## Option B — Local preview

```bash
npm run build
npm run start
```

Open http://localhost:3000

## Health check

After deploy, verify:

```
GET https://milwaukeeshala.org/api/health
```

Returns `{ "ok": true, "site": "milwaukeeshala.org", "time": "..." }`.

## Analytics

[Vercel Analytics](https://vercel.com/docs/analytics) is enabled in the app layout. Enable the **Analytics** tab in the Vercel project dashboard to view page views (privacy-friendly, no cookies).

## Contact / volunteer forms

Optional env vars on Vercel:

| Variable | Purpose |
|----------|---------|
| `RESEND_API_KEY` | Send contact/volunteer emails via Resend |
| `CONTACT_EMAIL_TO` | Inbox (default: `mmm.marathishala@gmail.com`) |
| `CONTACT_EMAIL_FROM` | Verified sender in Resend |
| `CONTACT_FORM_WEBHOOK` | Alternative webhook URL for form posts |

Without these, forms show a message to email the school directly.
