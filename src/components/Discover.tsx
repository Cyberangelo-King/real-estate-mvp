import { useMemo, useState } from "react";
import { properties, confidenceScore } from "../data";
import PropertyCard from "./PropertyCard";

type SortKey = "confidence" | "price-asc" | "price-desc" | "fresh";

export default function Discover({ onOpen }: { onOpen: (id: string) => void }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<string>("All");
  const [sort, setSort] = useState<SortKey>("confidence");
  const [minConfidence, setMinConfidence] = useState(0);

  const types = ["All", ...Array.from(new Set(properties.map((p) => p.type)))];

  const results = useMemo(() => {
    let list = properties.filter((p) => {
      const matchesQuery =
        query.trim() === "" ||
        `${p.title} ${p.city} ${p.country}`.toLowerCase().includes(query.toLowerCase());
      const matchesType = type === "All" || p.type === type;
      const matchesConfidence = confidenceScore(p) >= minConfidence;
      return matchesQuery && matchesType && matchesConfidence;
    });

    list = list.slice().sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "confidence") return confidenceScore(b) - confidenceScore(a);
      return 0;
    });
    return list;
  }, [query, type, sort, minConfidence]);

  return (
    <section id="discover" className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-20">
      <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
        <div>
          <h2 className="font-display text-3xl">Six markets. Same receipts every time.</h2>
          <p className="text-ink/55 mt-1">Hover the confidence badge on any card — it tells you exactly what's aging, not just a number.</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-8 bg-white border border-line rounded-2xl p-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search city, country, or listing…"
          className="flex-1 min-w-[200px] bg-paper-dim/60 rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-moss/40"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="bg-paper-dim/60 rounded-full px-4 py-2.5 text-sm outline-none"
        >
          {types.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="bg-paper-dim/60 rounded-full px-4 py-2.5 text-sm outline-none"
        >
          <option value="confidence">Sort: Highest confidence</option>
          <option value="price-asc">Sort: Price, low to high</option>
          <option value="price-desc">Sort: Price, high to low</option>
        </select>
        <div className="flex items-center gap-2 bg-paper-dim/60 rounded-full px-4 py-2.5 text-sm">
          <label htmlFor="minConf" className="text-ink/60 whitespace-nowrap">
            Min confidence {minConfidence}
          </label>
          <input
            id="minConf"
            type="range"
            min={0}
            max={100}
            step={10}
            value={minConfidence}
            onChange={(e) => setMinConfidence(Number(e.target.value))}
          />
        </div>
      </div>

      {results.length === 0 ? (
        <p className="text-ink/50 text-center py-16">
          No listings clear that confidence bar right now — try lowering it.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((p) => (
            <PropertyCard key={p.id} property={p} onOpen={onOpen} />
          ))}
        </div>
      )}
    </section>
  );
}
