# Live Rich, Die Rich — retire-ten-vault

The marketing site for *Live Rich, Die Rich* by Barry Brooksby. Vite + React + Tailwind + shadcn.

## Pages

- `/` — call funnel (homepage). Hero with masterclass video, Trustpilot stars, and step 1 / step 2 flow. *Book a Call* CTA unlocks 5 minutes in.
- `/book` — book sales page. Same layout, every CTA points to FastPayDirect or the signed-copy store.
- `/test` — VSL-first variant for A/B testing.
- `/blog` and `/blog/:slug` — Field Notes essays.
- `/quiz` and `/quiz/result/:stage` — Journey FI Quiz with five stage results.
- `/tools`, `/tools/fire-calculator`, `/tools/compound-interest-calculator`, `/tools/401k-true-cost-calculator` — calculators.
- `/worksheet` — interactive Retire-in-10 Worksheet (auto-saves, print-friendly).
- `/recording` — minimal title + video page.
- `/thank-you` and `/book-thank-you` — post-conversion pages. `/thank-you` fires the Meta Pixel Schedule event.
- `/pages` — internal sitemap.
- `/admin` — password-gated admin dashboard.
- `/settings` — runtime config overrides for pixel ID and booking URL.

## Local development

```bash
npm install
npm run dev
```

## Deploy

Pushes to `main` deploy automatically via Vercel. SPA routing falls back via `public/_redirects` and `vercel.json`.
