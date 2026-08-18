import { useEffect, useState } from "react";

const liveLines = [
  "Casa de Barro Retreat — availability reconfirmed today, Oaxaca",
  "Marina Skyline Penthouse — title re-checked 2 days ago, Singapore",
  "The Meridian Loft — walkthrough logged 3 days ago, Lisbon",
  "Prinsengracht Canal House — price re-matched 2 days ago, Amsterdam",
];

export default function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % liveLines.length), 3200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="max-w-6xl mx-auto px-5 md:px-8 pt-16 pb-20 md:pt-24 md:pb-28 grid md:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-moss bg-moss/10 rounded-full px-3 py-1.5">
            A listing site with an expiry date on its own trust
          </span>
          <h1 className="font-display text-4xl md:text-6xl leading-[1.03] mt-5 text-ink">
            "Verified" shouldn't mean <em className="not-italic text-clay">verified once.</em>
          </h1>
          <p className="text-lg text-ink/60 mt-5 max-w-lg">
            Zillow checks a listing on the way in, then trusts it for the life of the post. So do the sites
            copying Zillow. Verity re-checks every listing on a clock — agent, title, price, walkthrough,
            availability — and the moment one of those lapses, the score drops where buyers can see it.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#try-it"
              className="bg-clay text-paper font-semibold rounded-full px-6 py-3.5 hover:bg-ink transition-colors"
            >
              Watch a listing decay →
            </a>
            <a href="#discover" className="font-semibold text-ink/70 hover:text-ink transition-colors">
              Browse listings
            </a>
          </div>
          <div className="mt-10 flex items-center gap-2.5 text-sm text-ink/55 h-6 overflow-hidden">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-moss opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-moss" />
            </span>
            <span key={i} className="animate-fade-slide">{liveLines[i]}</span>
          </div>
        </div>
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&h=1200&q=80"
            alt="A villa listed on Verity, mid-reconfirmation"
            className="rounded-2xl object-cover w-full h-[420px] md:h-[520px] shadow-xl"
          />
          <div className="absolute -bottom-6 -left-6 bg-white rounded-xl border border-line shadow-lg p-4 w-60 hidden sm:block">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <span className="h-2 w-2 rounded-full bg-moss" /> 96 confidence — climbing
            </div>
            <p className="text-xs text-ink/50 mt-1">Title, price and availability all reconfirmed within the week.</p>
          </div>
          <div className="absolute -top-4 -right-4 bg-ink text-paper rounded-xl shadow-lg px-3.5 py-2.5 text-xs font-medium hidden sm:block rotate-2">
            5 checks. 1 clock each.
          </div>
        </div>
      </div>
    </section>
  );
}
