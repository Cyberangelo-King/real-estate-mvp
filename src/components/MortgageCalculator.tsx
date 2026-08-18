import { useMemo, useState } from "react";
import type { Property } from "../data";

const symbols: Record<string, string> = { USD: "$", EUR: "€", GBP: "£", NGN: "₦", SGD: "S$", ZAR: "R" };

export default function MortgageCalculator({ property }: { property: Property }) {
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(6.5);
  const [years, setYears] = useState(30);

  const symbol = symbols[property.currency] ?? property.currency + " ";

  const { monthly, principal, totalInterest } = useMemo(() => {
    const principal = property.price * (1 - downPct / 100);
    const monthlyRate = rate / 100 / 12;
    const n = years * 12;
    const monthly =
      monthlyRate === 0 ? principal / n : (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
    const totalInterest = monthly * n - principal;
    return { monthly, principal, totalInterest };
  }, [property.price, downPct, rate, years]);

  const fmt = (n: number) =>
    `${symbol}${Math.round(n).toLocaleString("en-US")}`;

  return (
    <div className="bg-white border border-line rounded-2xl p-6">
      <h3 className="font-display text-lg mb-1">Mortgage estimate</h3>
      <p className="text-xs text-ink/45 mb-5">
        Illustrative only — actual rates depend on your lender and location.
      </p>

      <div className="space-y-5">
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-ink/60">Down payment</span>
            <span className="font-semibold">{downPct}% · {fmt(property.price * (downPct / 100))}</span>
          </div>
          <input
            type="range"
            min={0}
            max={90}
            step={5}
            value={downPct}
            onChange={(e) => setDownPct(Number(e.target.value))}
            className="w-full accent-moss"
          />
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-ink/60">Interest rate</span>
            <span className="font-semibold">{rate.toFixed(1)}%</span>
          </div>
          <input
            type="range"
            min={2}
            max={14}
            step={0.1}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full accent-moss"
          />
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-ink/60">Loan term</span>
            <span className="font-semibold">{years} years</span>
          </div>
          <input
            type="range"
            min={10}
            max={30}
            step={5}
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full accent-moss"
          />
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-line">
        <p className="text-xs text-ink/45">Estimated monthly payment</p>
        <p className="font-display text-3xl text-moss">{fmt(monthly)}<span className="text-sm text-ink/40 font-sans">/mo</span></p>
        <div className="flex justify-between text-xs text-ink/45 mt-3">
          <span>Loan amount: {fmt(principal)}</span>
          <span>Total interest: {fmt(totalInterest)}</span>
        </div>
      </div>
    </div>
  );
}
