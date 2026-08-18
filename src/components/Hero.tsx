export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="max-w-6xl mx-auto px-5 md:px-8 pt-16 pb-20 md:pt-24 md:pb-28 grid md:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-moss bg-moss/10 rounded-full px-3 py-1.5">
            A different kind of listing site
          </span>
          <h1 className="font-display text-4xl md:text-6xl leading-[1.05] mt-5 text-ink">
            Real estate you can <em className="not-italic text-clay">verify</em>, not just view.
          </h1>
          <p className="text-lg text-ink/60 mt-5 max-w-lg">
            Every listing on Verity carries a live Confidence Timeline — a record of who checked what, and
            when. Trust doesn't just get granted once. It has to be renewed, or it visibly fades.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#discover"
              className="bg-ink text-paper font-semibold rounded-full px-6 py-3.5 hover:bg-moss transition-colors"
            >
              Explore verified listings
            </a>
            <a href="#how-it-works" className="font-semibold text-ink/70 hover:text-ink transition-colors">
              See how trust is measured →
            </a>
          </div>
          <div className="mt-10 flex items-center gap-8 text-sm text-ink/50">
            <div>
              <div className="font-display text-2xl text-ink">6</div>
              global markets shown
            </div>
            <div>
              <div className="font-display text-2xl text-ink">5</div>
              live checks per listing
            </div>
            <div>
              <div className="font-display text-2xl text-ink">7 days</div>
              max staleness before flagging
            </div>
          </div>
        </div>
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&h=1200&q=80"
            alt="A verified villa listing"
            className="rounded-2xl object-cover w-full h-[420px] md:h-[520px] shadow-xl"
          />
          <div className="absolute -bottom-6 -left-6 bg-white rounded-xl border border-line shadow-lg p-4 w-56 hidden sm:block">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <span className="h-2 w-2 rounded-full bg-moss" /> 96 confidence
            </div>
            <p className="text-xs text-ink/50 mt-1">Title, price and availability reconfirmed 1 day ago.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
