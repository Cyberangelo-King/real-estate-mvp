import { useReveal } from "../hooks/useReveal";

export default function ForAgents() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section id="for-agents" className="max-w-6xl mx-auto px-5 md:px-8 py-20">
      <div ref={ref} className={`grid md:grid-cols-2 gap-12 items-center reveal ${visible ? "is-visible" : ""}`}>
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-moss">For agents &amp; owners</span>
          <h2 className="font-display text-3xl md:text-4xl mt-3">Rank by showing up, not by outbidding.</h2>
          <p className="text-ink/60 mt-4">
            Every reconfirmation — a walkthrough, a price check, tapping "still available" — writes to a
            track record tied to your name, not just this one listing. Keep your timelines current and you
            surface first in search. Let them lapse and you drop, automatically, no auction required.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex gap-3">
              <span className="text-moss font-bold">→</span> No per-lead bidding wars, no pay-to-rank.
            </li>
            <li className="flex gap-3">
              <span className="text-moss font-bold">→</span> Reconfirm a check from your phone in under 30 seconds, on-site.
            </li>
            <li className="flex gap-3">
              <span className="text-moss font-bold">→</span> Buyers see your closed-deal count and response time before they even message you.
            </li>
          </ul>
        </div>
        <div className="bg-white border border-line rounded-2xl p-6">
          <p className="text-sm text-ink/50 mb-4">Agent scorecard — what a buyer sees before messaging</p>
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-moss/15 flex items-center justify-center font-display text-xl text-moss">
              TB
            </div>
            <div>
              <p className="font-semibold">Tunde Bakare</p>
              <p className="text-xs text-ink/50">Verified agent since 2023 · Lekki, Lagos</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6 text-center">
            <div>
              <div className="font-display text-2xl">67</div>
              <div className="text-xs text-ink/45">Closed</div>
            </div>
            <div>
              <div className="font-display text-2xl">94%</div>
              <div className="text-xs text-ink/45">On-time renewals</div>
            </div>
            <div>
              <div className="font-display text-2xl">&lt;1h</div>
              <div className="text-xs text-ink/45">Response time</div>
            </div>
          </div>
          <p className="text-xs text-ink/40 mt-5 pt-4 border-t border-line">
            94% on-time renewals is the number that actually moves buyers — closed-deal counts get gamed, a
            renewal streak is harder to fake.
          </p>
        </div>
      </div>
    </section>
  );
}
