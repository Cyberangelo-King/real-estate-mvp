export type CheckStatus = "confirmed" | "aging" | "expired";

export interface TrustCheck {
  label: string;
  detail: string;
  daysAgo: number;
  renewEveryDays: number; // how often this check must be renewed to stay "confirmed"
}

export interface Property {
  id: string;
  title: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  price: number;
  currency: string;
  period?: "sale" | "month" | "night";
  beds: number;
  baths: number;
  sqm: number;
  type: "Apartment" | "House" | "Villa" | "Land" | "Penthouse";
  image: string;
  gallery: string[];
  blurb: string;
  story: string;
  agent: { name: string; verifiedSince: string; responseTime: string; listingsClosed: number };
  checks: TrustCheck[];
}

// Deterministic "now" so the decay math is stable for a demo.
export const NOW = new Date("2026-08-18T22:00:00Z");

export function statusOf(check: TrustCheck): CheckStatus {
  const ratio = check.daysAgo / check.renewEveryDays;
  if (ratio < 0.6) return "confirmed";
  if (ratio < 1) return "aging";
  return "expired";
}

export function confidenceScore(p: Property): number {
  const weights = { confirmed: 1, aging: 0.55, expired: 0.1 };
  const total = p.checks.reduce((sum, c) => sum + weights[statusOf(c)], 0);
  return Math.round((total / p.checks.length) * 100);
}

export function freshestGap(p: Property): number {
  return Math.min(...p.checks.map((c) => c.daysAgo));
}

// Used by the interactive decay demo: what would this check's status/score be
// if `extraDays` more days pass with nobody reconfirming anything?
export function statusAt(check: TrustCheck, extraDays: number): CheckStatus {
  const projected = { ...check, daysAgo: check.daysAgo + extraDays };
  return statusOf(projected);
}

export function scoreAt(p: Property, extraDays: number): number {
  const weights = { confirmed: 1, aging: 0.55, expired: 0.1 };
  const total = p.checks.reduce((sum, c) => sum + weights[statusAt(c, extraDays)], 0);
  return Math.round((total / p.checks.length) * 100);
}

const img = (seed: string, w = 1200, h = 800) =>
  `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const properties: Property[] = [
  {
    id: "meridian-loft-lisbon",
    lat: 38.7169,
    lng: -9.1399,
    title: "The Meridian Loft",
    city: "Lisbon",
    country: "Portugal",
    price: 890000,
    currency: "EUR",
    period: "sale",
    beds: 3,
    baths: 2,
    sqm: 148,
    type: "Apartment",
    image: img("photo-1502672260266-1c1ef2d93688"),
    gallery: [
      img("photo-1502672260266-1c1ef2d93688"),
      img("photo-1493809842364-78817add7ffb"),
      img("photo-1502005229762-cf1b2da7c5d6"),
    ],
    blurb: "A restored 1920s loft above Alfama, with the original tile work and a rooftop that looks over the whole river.",
    story:
      "The building was a textile warehouse before it was three apartments. We kept the iron trusses exposed on purpose — most buyers ask if they're original, and they are, right down to the rivets.",
    agent: { name: "Inês Carvalho", verifiedSince: "2024", responseTime: "under 2 hours", listingsClosed: 41 },
    checks: [
      { label: "Agent identity", detail: "Government ID + real-estate license cross-checked", daysAgo: 12, renewEveryDays: 180 },
      { label: "Title & ownership", detail: "Land registry deed matches seller of record", daysAgo: 9, renewEveryDays: 90 },
      { label: "Physical walkthrough", detail: "Verity inspector confirmed condition on-site", daysAgo: 3, renewEveryDays: 30 },
      { label: "Price consistency", detail: "Asking price matches signed mandate on file", daysAgo: 3, renewEveryDays: 30 },
      { label: "Still available", detail: "Agent reconfirmed the unit is on the market", daysAgo: 1, renewEveryDays: 7 },
    ],
  },
  {
    id: "palm-villa-lekki",
    lat: 6.4488,
    lng: 3.4726,
    title: "Palm Court Villa",
    city: "Lekki, Lagos",
    country: "Nigeria",
    price: 420000000,
    currency: "NGN",
    period: "sale",
    beds: 5,
    baths: 6,
    sqm: 610,
    type: "Villa",
    image: img("photo-1613490493576-7fde63acd811"),
    gallery: [
      img("photo-1613490493576-7fde63acd811"),
      img("photo-1600585154340-be6161a56a0c"),
      img("photo-1600607687939-ce8a6c25118c"),
    ],
    blurb: "Gated waterside villa with a private jetty, built for a family that entertains often and travels more.",
    story:
      "The developer over-specified the generator and borehole capacity on purpose — buyers here ask about power and water before they ask about the kitchen, so we lead with it.",
    agent: { name: "Tunde Bakare", verifiedSince: "2023", responseTime: "under 1 hour", listingsClosed: 67 },
    checks: [
      { label: "Agent identity", detail: "Government ID + real-estate license cross-checked", daysAgo: 40, renewEveryDays: 180 },
      { label: "Title & ownership", detail: "Certificate of Occupancy verified with the Lands Registry", daysAgo: 58, renewEveryDays: 90 },
      { label: "Physical walkthrough", detail: "Verity inspector confirmed condition on-site", daysAgo: 26, renewEveryDays: 30 },
      { label: "Price consistency", detail: "Asking price matches signed mandate on file", daysAgo: 11, renewEveryDays: 30 },
      { label: "Still available", detail: "Agent reconfirmed the unit is on the market", daysAgo: 4, renewEveryDays: 7 },
    ],
  },
  {
    id: "canal-house-amsterdam",
    lat: 52.3676,
    lng: 4.9041,
    title: "Prinsengracht Canal House",
    city: "Amsterdam",
    country: "Netherlands",
    price: 3200,
    currency: "EUR",
    period: "month",
    beds: 2,
    baths: 1,
    sqm: 95,
    type: "House",
    image: img("photo-1560448204-e02f11c3d0e2"),
    gallery: [
      img("photo-1560448204-e02f11c3d0e2"),
      img("photo-1524230572899-a752b3835840"),
      img("photo-1484154218962-a197022b5858"),
    ],
    blurb: "Narrow, steep-staired, and completely worth it — a canal-facing house share landlords rarely list directly.",
    story:
      "Dutch canal houses were taxed by frontage width, which is why it's four meters wide and thirteen deep. We kept the staircase original; it's steep, and we say so upfront instead of letting people find out on move-in day.",
    agent: { name: "Sara de Boer", verifiedSince: "2022", responseTime: "under 3 hours", listingsClosed: 29 },
    checks: [
      { label: "Landlord identity", detail: "Government ID + property ownership cross-checked", daysAgo: 5, renewEveryDays: 180 },
      { label: "Title & ownership", detail: "Kadaster land registry record matches landlord", daysAgo: 70, renewEveryDays: 90 },
      { label: "Physical walkthrough", detail: "Verity inspector confirmed condition on-site", daysAgo: 33, renewEveryDays: 30 },
      { label: "Price consistency", detail: "Asking price matches signed mandate on file", daysAgo: 2, renewEveryDays: 30 },
      { label: "Still available", detail: "Agent reconfirmed the unit is on the market", daysAgo: 9, renewEveryDays: 7 },
    ],
  },
  {
    id: "skyline-penthouse-singapore",
    lat: 1.3521,
    lng: 103.8198,
    title: "Marina Skyline Penthouse",
    city: "Singapore",
    country: "Singapore",
    price: 5800000,
    currency: "SGD",
    period: "sale",
    beds: 4,
    baths: 4,
    sqm: 265,
    type: "Penthouse",
    image: img("photo-1580587771525-78b9dba3b914"),
    gallery: [
      img("photo-1580587771525-78b9dba3b914"),
      img("photo-1512917774080-9991f1c4c750"),
      img("photo-1522708323590-d24dbb6b0267"),
    ],
    blurb: "Full-floor views of the strait, private lift lobby, and a plunge pool that catches the evening light.",
    story:
      "The developer's floor plan called this a 'sky villa'; we call it what it is — a very good penthouse. The plunge pool faces west on purpose, and every viewing we've run has been booked for golden hour since.",
    agent: { name: "Wei Ling Tan", verifiedSince: "2021", responseTime: "under 1 hour", listingsClosed: 88 },
    checks: [
      { label: "Agent identity", detail: "Government ID + CEA license cross-checked", daysAgo: 21, renewEveryDays: 180 },
      { label: "Title & ownership", detail: "SLA land title search matches seller of record", daysAgo: 14, renewEveryDays: 90 },
      { label: "Physical walkthrough", detail: "Verity inspector confirmed condition on-site", daysAgo: 6, renewEveryDays: 30 },
      { label: "Price consistency", detail: "Asking price matches signed mandate on file", daysAgo: 6, renewEveryDays: 30 },
      { label: "Still available", detail: "Agent reconfirmed the unit is on the market", daysAgo: 2, renewEveryDays: 7 },
    ],
  },
  {
    id: "adobe-retreat-oaxaca",
    lat: 17.0732,
    lng: -96.7266,
    title: "Casa de Barro Retreat",
    city: "Oaxaca",
    country: "Mexico",
    price: 240,
    currency: "USD",
    period: "night",
    beds: 3,
    baths: 3,
    sqm: 180,
    type: "House",
    image: img("photo-1523217582562-09d0def993a6"),
    gallery: [
      img("photo-1523217582562-09d0def993a6"),
      img("photo-1505843513577-22bb7d21e455"),
      img("photo-1505691938895-1758d7feb511"),
    ],
    blurb: "Hand-built adobe walls, a wood-fired oven the family still uses, and a courtyard full of bougainvillea.",
    story:
      "The owner's grandfather built the walls by hand in the 1970s; you can still see the finger marks in the plaster near the courtyard door. We photographed it, not to be quaint, but because it's the first thing every guest touches on arrival.",
    agent: { name: "Marisol Reyes", verifiedSince: "2020", responseTime: "under 4 hours", listingsClosed: 15 },
    checks: [
      { label: "Host identity", detail: "Government ID + property ownership cross-checked", daysAgo: 60, renewEveryDays: 180 },
      { label: "Title & ownership", detail: "Municipal property record matches host", daysAgo: 41, renewEveryDays: 90 },
      { label: "Physical walkthrough", detail: "Verity inspector confirmed condition on-site", daysAgo: 12, renewEveryDays: 30 },
      { label: "Price consistency", detail: "Nightly rate matches host's signed terms", daysAgo: 1, renewEveryDays: 30 },
      { label: "Still available", detail: "Calendar reconfirmed against booking system", daysAgo: 0, renewEveryDays: 7 },
    ],
  },
  {
    id: "harbour-plot-capetown",
    lat: -34.0483,
    lng: 18.3535,
    title: "Hout Bay Coastal Plot",
    city: "Cape Town",
    country: "South Africa",
    price: 6500000,
    currency: "ZAR",
    period: "sale",
    beds: 0,
    baths: 0,
    sqm: 1200,
    type: "Land",
    image: img("photo-1500375592092-40eb2168fd21"),
    gallery: [
      img("photo-1500375592092-40eb2168fd21"),
      img("photo-1444927714506-8492d94b5ba0"),
      img("photo-1476514525535-07fb3b4ae5f1"),
    ],
    blurb: "A cleared, surveyed plot above the harbour with mountain water rights already secured.",
    story:
      "Land listings are where most trust problems start — plots get sold twice, boundaries move. This one comes with the actual surveyor's diagram, not a sketch, because that's the document buyers ask for first and usually can't get.",
    agent: { name: "Johan Pretorius", verifiedSince: "2019", responseTime: "under 6 hours", listingsClosed: 33 },
    checks: [
      { label: "Agent identity", detail: "Government ID + PPRA registration cross-checked", daysAgo: 90, renewEveryDays: 180 },
      { label: "Title & ownership", detail: "Deeds Office title deed matches seller of record", daysAgo: 75, renewEveryDays: 90 },
      { label: "Physical walkthrough", detail: "Verity inspector confirmed boundary pegs on-site", daysAgo: 40, renewEveryDays: 30 },
      { label: "Price consistency", detail: "Asking price matches signed mandate on file", daysAgo: 40, renewEveryDays: 30 },
      { label: "Still available", detail: "Agent reconfirmed the plot is unsold", daysAgo: 15, renewEveryDays: 7 },
    ],
  },
];

export function formatPrice(p: Property): string {
  const symbols: Record<string, string> = { USD: "$", EUR: "€", GBP: "£", NGN: "₦", SGD: "S$", ZAR: "R" };
  const s = symbols[p.currency] ?? p.currency + " ";
  const n = p.price.toLocaleString("en-US");
  const suffix = p.period === "month" ? "/mo" : p.period === "night" ? "/night" : "";
  return `${s}${n}${suffix}`;
}
