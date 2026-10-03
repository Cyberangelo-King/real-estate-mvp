# Verity — real estate you can verify, not just view

A focused product MVP built around one problem: property listings can become stale, misleading or difficult to verify after publication.

## Core idea

Every listing carries a **Confidence Timeline** made from independently expiring checks such as agent identity, ownership/title evidence, physical walkthrough, price consistency and availability.

A check ages when it is not renewed. The interface therefore communicates **freshness of evidence**, not a permanent “verified” badge.

## Why this matters

Trust in property discovery is not a decorative badge. It is a process. The product should make the underlying evidence, date and uncertainty visible to the buyer.

## Current architecture

React 19 · TypeScript · Vite · Tailwind CSS

The current MVP uses mock data deliberately so the product thesis can be tested before expensive integrations are built.

## Production path

- Identity and role-based accounts
- Evidence-backed agent verification
- Market-specific title/ownership verification
- Timestamped inspection evidence
- Listing-photo authenticity checks
- Availability renewal
- Saved searches and alerts
- Secure document handling
- Audit trails for every verification event

## Product rule

Do not fake trust. If a check cannot be independently verified, show that limitation instead of manufacturing confidence.

## Status

Concept MVP. The next stage is validation with agents and buyers, followed by a narrow real-data pilot in one market.