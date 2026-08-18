# Verity — Research, Thesis & Team Reviews

*A 3-hour sprint: study the real-estate category, find one genuine gap, build a convincing MVP.*

## 0–20 min: What we studied

Live web research across global platforms (Zillow, Redfin, Realtor.com, Trulia), Nigerian
platforms (PropertyPro.ng), award-winning boutique developer sites (The Archer Residences,
Maxwell Downtown Brooklyn), and category-wide trust research (MEI 2025 portal audit, Dubai's
Trakheesi verification system).

**Patterns found:**

| What works | Why | What's missing |
|---|---|---|
| Redfin's fast status updates (own agents, not third-party feeds) | Buyers trust freshness more than raw inventory count | Only Redfin has this; the rest of the category runs on stale, syndicated data |
| Boutique developer sites (Archer Residences, Maxwell Brooklyn) — cinematic, editorial storytelling | Makes one property feel desirable, not just listed | Beautiful but not searchable — a single-property brochure, not a discovery product |
| "Verified" badges (every major platform, PropertyPro.ng included) | Signals safety at a glance | It's a one-time stamp. Once granted, nothing forces it to stay true — see below |
| Dubai's Trakheesi mandatory permit system | Regulator-enforced verification measurably cuts scam exposure | Government-mandated, not something a product itself can replicate — but the *mechanism* (a durable, checkable record) is copyable |

**Hard data that shaped the thesis:**
- MEI 2025 audit of 20 real-estate portals: **UX gaps in 65%**, **scam themes in 45%**,
  **stale inventory in 40%**, wrong-location errors in 20%.
- REA Group survey (6,000+ buyers): **72% skip listings with no price shown** — the #1 named
  frustration in the category.
- Zillow/Trulia 1–3 star review analysis: recurring complaints about listings that already sold
  weeks earlier, and "Premier Agent" lead-resale making buyers feel spammed rather than served.
- Nigeria-specific reality (used as an *insight advantage*, not a geographic limiter): land title
  fraud and double-selling are common enough that "verify with the government registry" is a
  default buyer instinct here — a market forcing function the rest of the world experiences only
  after being burned once.

## 20–35 min: The thesis, red-teamed

**The real human problem:** platforms verify a listing *once*, at intake, then let that trust sit
unquestioned for months while the underlying facts — price, availability, even ownership — quietly
drift. The badge stays green long after the truth has changed. That gap is where scams, stale
listings, and wasted viewings all come from.

**The idea:** the **Confidence Timeline** — every listing shows a live, itemized, timestamped
record of five specific checks (agent identity, title/ownership, physical walkthrough, price
consistency, current availability), each with its own expiry window. Miss the window and that
check visibly ages from *confirmed* → *aging* → *expired*, and the listing's overall confidence
score drops in public view until someone renews it. Trust is earned continuously, not stamped once.

**Red team:**
- *Genuinely useful?* Yes — it maps directly onto the two loudest complaint clusters in the data
  (scams 45%, stale inventory 40%).
- *Actually different?* Yes — every competitor we looked at (global and Nigerian) uses a static
  binary "Verified" badge. None expose *when* it was checked or *when* it expires.
- *More than visual polish?* Yes — it's a scoring model with real decay math, not a green
  checkmark icon. Killing the "just a badge but shinier" version was the actual red-team output:
  the first draft of this idea was a single trust score; it only became defensible once we made
  the underlying checks individually inspectable and individually perishable.
- *Would a real user care?* Directly answers "is this actually still available" and "is the price
  real" — the top two named frustrations in the research.
- *Demonstrable in 3 hours?* Yes, with mock data carrying realistic `daysAgo` values so the decay
  states (confirmed / aging / expired) are visibly different across the sample listings without
  needing a live backend.

**What we cut:** a full map-based search (nice, not differentiating — every platform has it), a
mortgage calculator (commodity feature, not the story), user accounts / saved searches (needs
real auth + persistence, not needed to prove the thesis in 3 hours), and a second "AI chat search"
feature that we considered — rejected because it's currently a bandwagon feature (Redfin, Zillow
already shipped it) and would have diluted focus away from the one idea worth defending.

## 35–50 min: Design direction

Editorial, warm, print-inspired (serif display type, cream paper background, moss/clay/gold
accents) — the opposite of the "dark mode, gradient, glassmorphism SaaS" look that reads as
AI-generated. Borrowed the *quiet confidence* of the boutique developer sites we studied, applied
it to a searchable multi-listing product instead of a single-property brochure.

## White team (validation)

- **User:** a timeline that ages in front of them is a mental model people already have from
  fitness rings, uptime dashboards, and "last synced" indicators — no new behavior to teach.
- **Business:** agents who let checks lapse lose visibility automatically — a retention/engagement
  loop that doesn't require the platform to police anyone manually.
- **Product:** the same five-check schema works identically for a Lagos villa, an Amsterdam canal
  house, or a Singapore penthouse — proving the idea travels globally instead of reading as a
  Nigeria-only trust patch.

## Blue team (implementation)

React + TypeScript + Vite + Tailwind v4, fully static, mock data with a fixed reference date so
decay states are stable for a demo. No backend needed to prove the thesis — confidence score is a
pure function of each check's `daysAgo` vs its `renewEveryDays` threshold. Supabase would only
earn its place once checks need to be genuinely submitted/renewed by real agents (see "Path to
Production" in the main README).

## Gold team (final review)

Looking at this as the investor who set the "do better in a week" challenge: the answer to "what
did you do better" is visible within the first scroll — every card shows a *confidence score*, not
just a photo and price, and opening any listing shows *why* that score is what it is, with a visible
expiry clock instead of a permanent green checkmark. That is the one idea. Nothing else was added
to pad the demo.
