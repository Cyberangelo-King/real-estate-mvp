export default function ForAgents() {
  return (
    <section id="for-agents" className="max-w-6xl mx-auto px-5 md:px-8 py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-moss">For agents &amp; owners</span>
          <h2 className="font-display text-3xl md:text-4xl mt-3">A reputation you build once and keep proving.</h2>
          <p className="text-ink/60 mt-4">
            Every reconfirmation you make — a walkthrough, a price check, a "yes, still available" — adds to
            a visible track record tied to your name, not just the listing. Agents who keep their timelines
            current get surfaced first in search. It's the opposite of pay-to-rank lead auctions.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex gap-3">
              <span className="text-moss font-bold">→</span> No per-lead bidding wars or exclusivity auctions.
            </li>
            <li className="flex gap-3">
              <span className="text-moss font-bold">→</span> One tap to reconfirm a check from your phone in the field.
            </li>
            <li className="flex gap-3">
              <span className="text-moss font-bold">→</span> Buyers see your closed-listing count and response time up front.
            </li>
          </ul>
        </div>
        <div className="bg-white border border-line rounded-2xl p-6">
          <p className="text-sm text-ink/50 mb-4">Agent scorecard preview</p>
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
        </div>
      </div>
    </section>
  );
}
