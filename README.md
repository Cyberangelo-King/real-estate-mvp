# Verity — real estate you can verify, not just view

A 3-hour concept MVP built to answer one challenge: *"study real estate websites, then do
something better."* See [`RESEARCH.md`](./RESEARCH.md) for the full research trail, thesis,
and red/white/blue/gold team review.

## The idea in one line

Every listing carries a **Confidence Timeline** — five individually-timestamped trust checks
(agent identity, title/ownership, physical walkthrough, price consistency, live availability),
each with its own expiry window. Miss the window and that check visibly ages and the listing's
public confidence score drops, instead of a "Verified" badge that's granted once and never
revisited.

## Stack

React 19 + TypeScript + Vite + Tailwind CSS v4. Fully static, mock data only — no backend
required to demonstrate the thesis (see "Path to production" below for what would need real
persistence).

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build -> dist/
```

## Path to production

- **Auth + persistence (Supabase or similar):** real agents need accounts to submit and renew
  checks; buyers need saved searches. Currently everything is mock data recalculated client-side.
- **Document verification pipeline:** the "title & ownership" and "agent identity" checks need a
  real integration with land registries / licensing bodies per market (this is genuinely the hard,
  valuable part of the product — worth scoping market-by-market rather than faking).
- **Photo/video authenticity:** reverse-image-check listing photos to catch recycled/stock images,
  a common scam vector this MVP doesn't yet address.
- **Payments/booking flow** for the short-term-rental style listings.
- **Real map-based discovery** once there's a real inventory to place on it.
- **Mobile app or PWA** — research showed mobile is the dominant search device; this MVP is
  responsive but a native/PWA layer would matter for the "reconfirm from the field" agent flow.

## What we cut, and why

See "What we cut" in `RESEARCH.md` — map search, mortgage calculator, and AI chat search were all
considered and dropped to keep the demo focused on the one defensible idea instead of feature
padding.
