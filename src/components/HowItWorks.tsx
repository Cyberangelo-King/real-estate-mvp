const steps = [
  {
    n: "01",
    title: "Every claim gets a source",
    body: "Agent identity, title deed, physical walkthrough, price mandate, and live availability are each logged individually — not bundled into one vague 'Verified' badge.",
  },
  {
    n: "02",
    title: "Every check has an expiry",
    body: "A title search stays trustworthy for 90 days. Availability stays trustworthy for 7. Miss the window and that check visibly ages on the listing — before a buyer ever has to find out the hard way.",
  },
  {
    n: "03",
    title: "The score decays, publicly",
    body: "Confidence isn't a one-time stamp. It's recalculated from how current each check is, so listings that go stale lose visibility automatically — the incentive to keep information honest is structural, not optional.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-ink text-paper">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-20">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-gold">The problem we picked</span>
          <h2 className="font-display text-3xl md:text-4xl mt-3">
            "Verified" badges are shown once and trusted forever. That's the gap.
          </h2>
          <p className="text-paper/60 mt-4">
            Across the category — from Zillow's stale-listing complaints to Nigeria's document-fraud
            problem to Dubai's mandatory permit system — the pattern repeats: platforms verify a listing
            once, at intake, then let that trust sit unchallenged for months. Buyers pay the price when
            reality has moved on. Verity treats trust as something that ages, like the listing itself.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mt-14">
          {steps.map((s) => (
            <div key={s.n} className="border-t border-paper/20 pt-5">
              <span className="font-display text-3xl text-gold">{s.n}</span>
              <h3 className="font-display text-xl mt-3">{s.title}</h3>
              <p className="text-paper/55 text-sm mt-2 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
