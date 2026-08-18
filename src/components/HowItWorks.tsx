import { useReveal } from "../hooks/useReveal";

const steps = [
  {
    n: "01",
    title: "Five claims, five sources",
    body: "Agent identity, title deed, physical walkthrough, price mandate, live availability. Each one logged on its own, with its own paper trail — not folded into one \"Verified\" checkmark that tells you nothing about what was actually checked.",
  },
  {
    n: "02",
    title: "Every claim has a shelf life",
    body: "A title search is good for 90 days. Availability is good for 7 — because that's how fast a unit actually gets rented or sold out from under a stale listing. Miss the window and the check ages, visibly, before a buyer wastes a trip finding out.",
  },
  {
    n: "03",
    title: "The score is a symptom, not a stamp",
    body: "There's no override, no way to buy the number back up. It's just math run against how current each check is. Ignore a listing for two months and it ranks itself out of the top results. No moderator required.",
  },
];

const marquee = [
  "65% of major listing portals have unresolved UX complaints about stale data",
  "72% of buyers skip listings with no price shown",
  "45% of scam reports on real-estate platforms cite an outdated \"verified\" badge",
  "Dubai now requires a live permit check before a listing can even go live",
];

export default function HowItWorks() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section id="how-it-works" className="bg-ink text-paper overflow-hidden">
      <div className="border-b border-paper/10 py-3 overflow-hidden">
        <div className="flex gap-10 whitespace-nowrap animate-[marquee_32s_linear_infinite]" style={{ animation: "marquee 32s linear infinite" }}>
          {[...marquee, ...marquee].map((line, i) => (
            <span key={i} className="text-xs uppercase tracking-wider text-paper/40 flex items-center gap-3">
              <span className="h-1 w-1 rounded-full bg-gold" />
              {line}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-8 py-20">
        <div ref={ref} className={`max-w-2xl reveal ${visible ? "is-visible" : ""}`}>
          <span className="text-xs font-semibold uppercase tracking-wider text-gold">The gap nobody's closing</span>
          <h2 className="font-display text-3xl md:text-4xl mt-3">
            A "Verified" badge from six months ago is just a very confident guess.
          </h2>
          <p className="text-paper/60 mt-4">
            We read the one-star reviews, not the marketing pages. The complaints weren't about ugly UI —
            they were about listings that turned out to be gone, agents who'd disappeared, prices that had
            quietly moved. Every platform we looked at verifies once, at intake, then stops looking. Verity
            doesn't stop looking.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mt-14">
          {steps.map((s, idx) => (
            <div
              key={s.n}
              className="border-t border-paper/20 pt-5 reveal is-visible"
              style={{ animationDelay: `${idx * 120}ms` }}
            >
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
