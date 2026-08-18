import { useEffect, useRef, useState } from "react";
import { properties, statusAt, scoreAt } from "../data";

const demoProperty = properties.find((p) => p.id === "meridian-loft-lisbon")!;

const statusDot: Record<string, string> = {
  confirmed: "bg-moss",
  aging: "bg-gold",
  expired: "bg-clay",
};

const reactions: { max: number; line: string }[] = [
  { max: 10, line: "Nobody has touched this listing in months. This is how a buyer flies out for a viewing that fell through weeks ago." },
  { max: 35, line: "The cracks are showing. Availability and price are the first things to go stale — and the first things a buyer checks." },
  { max: 60, line: "Aging, not dead. Someone should reconfirm before this loses its place in search." },
  { max: 85, line: "Mostly solid, one or two checks due soon. This is what most \"verified\" listings actually look like six months in." },
  { max: 100, line: "Everything current. This is the state a listing is in the day it goes live — the question is what happens after." },
];

function reactionFor(score: number): string {
  return reactions.find((r) => score <= r.max)?.line ?? reactions[reactions.length - 1].line;
}

export default function LiveDecayDemo() {
  const [days, setDays] = useState(0);
  const [playing, setPlaying] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!playing) return;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      setDays((d) => {
        const next = d + dt / 45;
        if (next >= 150) {
          setPlaying(false);
          return 150;
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [playing]);

  const shownDays = Math.round(days);
  const score = scoreAt(demoProperty, shownDays);
  const scoreColor = score >= 80 ? "text-moss" : score >= 50 ? "text-gold" : "text-clay";

  return (
    <section id="try-it" className="border-y border-line bg-paper-dim/50">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-20">
        <span className="text-xs font-semibold uppercase tracking-wider text-clay">Don't take our word for it</span>
        <h2 className="font-display text-3xl md:text-4xl mt-3 max-w-2xl">
          Stop touching this listing and watch what happens.
        </h2>
        <p className="text-ink/60 mt-3 max-w-xl">
          This is a real listing from the grid below, frozen at the moment nobody reconfirms anything ever
          again. Drag the slider — or hit play — and watch trust erode on its own schedule, exactly like it
          would on a live listing nobody's minding.
        </p>

        <div className="mt-10 grid lg:grid-cols-[1fr_1.1fr] gap-10 items-start">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <button
                onClick={() => {
                  if (shownDays >= 150) setDays(0);
                  setPlaying((p) => !p);
                }}
                className="shrink-0 h-11 w-11 rounded-full bg-ink text-paper flex items-center justify-center hover:bg-moss transition-colors"
                aria-label={playing ? "Pause" : "Play"}
              >
                {playing ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><rect x="2" y="1" width="3.5" height="12" /><rect x="8.5" y="1" width="3.5" height="12" /></svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M2 1 L13 7 L2 13 Z" /></svg>
                )}
              </button>
              <input
                type="range"
                min={0}
                max={150}
                step={1}
                value={shownDays}
                onChange={(e) => {
                  setPlaying(false);
                  setDays(Number(e.target.value));
                }}
                className="flex-1 accent-clay"
              />
              <span className="font-display text-lg text-ink w-24 text-right tabular-nums">
                +{shownDays} day{shownDays === 1 ? "" : "s"}
              </span>
            </div>

            <div className="mt-6 bg-white border border-line rounded-2xl p-6">
              <div className="flex items-baseline justify-between">
                <div>
                  <p className="font-display text-xl">{demoProperty.title}</p>
                  <p className="text-sm text-ink/50">{demoProperty.city}, {demoProperty.country}</p>
                </div>
                <div className="text-right">
                  <div className={`font-display text-5xl tabular-nums transition-colors ${scoreColor}`}>{score}</div>
                  <div className="text-xs uppercase tracking-wide text-ink/40">confidence, right now</div>
                </div>
              </div>
              <p className="text-sm text-ink/70 mt-4 leading-relaxed border-t border-line pt-4">{reactionFor(score)}</p>
            </div>
          </div>

          <div className="bg-white border border-line rounded-2xl p-6 md:p-7">
            <p className="text-sm text-ink/50 mb-5">Same five checks, aging in real time</p>
            <ul className="space-y-4">
              {demoProperty.checks.map((c) => {
                const status = statusAt(c, shownDays);
                const totalAge = c.daysAgo + shownDays;
                const ratio = Math.min(1, totalAge / c.renewEveryDays);
                return (
                  <li key={c.label}>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="font-medium flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${statusDot[status]} transition-colors`} />
                        {c.label}
                      </span>
                      <span className="text-ink/45 text-xs tabular-nums">{totalAge}d / {c.renewEveryDays}d window</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-paper-dim overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-[width] duration-150 ${statusDot[status]}`}
                        style={{ width: `${Math.min(100, ratio * 100)}%` }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
