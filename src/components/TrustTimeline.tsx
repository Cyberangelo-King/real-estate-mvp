import type { Property, TrustCheck } from "../data";
import { statusOf, confidenceScore } from "../data";

const statusStyle: Record<string, { dot: string; text: string; label: string }> = {
  confirmed: { dot: "bg-moss", text: "text-moss", label: "Confirmed" },
  aging: { dot: "bg-gold", text: "text-gold", label: "Aging — due soon" },
  expired: { dot: "bg-clay", text: "text-clay", label: "Expired — needs reconfirmation" },
};

function relative(daysAgo: number): string {
  if (daysAgo === 0) return "today";
  if (daysAgo === 1) return "yesterday";
  return `${daysAgo} days ago`;
}

function CheckRow({ check }: { check: TrustCheck }) {
  const status = statusOf(check);
  const style = statusStyle[status];
  return (
    <li className="relative pl-10 pb-6 last:pb-0">
      <span
        className={`absolute left-[9px] top-1.5 h-3.5 w-3.5 rounded-full ring-4 ring-paper ${style.dot}`}
        aria-hidden
      />
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <p className="font-semibold text-ink">{check.label}</p>
        <span className={`text-xs font-semibold uppercase tracking-wide ${style.text}`}>{style.label}</span>
      </div>
      <p className="text-sm text-ink/60 mt-0.5">{check.detail}</p>
      <p className="text-xs text-ink/40 mt-1">
        Last confirmed {relative(check.daysAgo)} · renews every {check.renewEveryDays} days
      </p>
    </li>
  );
}

export default function TrustTimeline({ property }: { property: Property }) {
  const score = confidenceScore(property);
  const scoreColor = score >= 80 ? "text-moss" : score >= 50 ? "text-gold" : "text-clay";
  const anyExpired = property.checks.some((c) => statusOf(c) === "expired");

  return (
    <div className="bg-white border border-line rounded-2xl p-6 md:p-8">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h3 className="font-display text-2xl">Confidence Timeline</h3>
          <p className="text-sm text-ink/55 mt-1 max-w-md">
            Not a badge — a living record. Every check has an expiry. If it isn't reconfirmed in time,
            it visibly ages here and the listing's score drops until someone renews it.
          </p>
        </div>
        <div className="text-right">
          <div className={`font-display text-4xl ${scoreColor}`}>{score}</div>
          <div className="text-xs uppercase tracking-wide text-ink/40">Confidence score</div>
        </div>
      </div>

      {anyExpired && (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-clay/10 border border-clay/30 px-3 py-2 text-sm text-clay">
          One or more checks have expired. This listing is flagged for the agent to reconfirm before it can
          show a full score.
        </div>
      )}

      <ol className="timeline-track relative mt-6">
        {property.checks
          .slice()
          .sort((a, b) => a.daysAgo - b.daysAgo)
          .map((c) => (
            <CheckRow key={c.label} check={c} />
          ))}
      </ol>

      <div className="mt-4 pt-4 border-t border-line flex items-center justify-between text-sm">
        <span className="text-ink/50">
          Verified by <span className="text-ink font-medium">{property.agent.name}</span> · agent on Verity
          since {property.agent.verifiedSince}
        </span>
        <button className="font-semibold text-moss hover:text-moss-light transition-colors">
          Report an inaccuracy →
        </button>
      </div>
    </div>
  );
}
