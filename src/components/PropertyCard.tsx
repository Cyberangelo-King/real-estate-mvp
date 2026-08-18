import { Link } from "react-router-dom";
import type { Property } from "../data";
import { formatPrice, confidenceScore, freshestGap, statusOf } from "../data";
import { useFavorites } from "../hooks/useFavorites";

export default function PropertyCard({ property }: { property: Property }) {
  const score = confidenceScore(property);
  const gap = freshestGap(property);
  const scoreColor = score >= 80 ? "bg-moss" : score >= 50 ? "bg-gold" : "bg-clay";
  const dueSoon = property.checks.filter((c) => statusOf(c) !== "confirmed");
  const { isFavorite, toggle } = useFavorites();
  const saved = isFavorite(property.id);

  return (
    <div className="relative group rounded-2xl overflow-hidden bg-white border border-line hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <button
        onClick={(e) => {
          e.preventDefault();
          toggle(property.id);
        }}
        aria-label={saved ? "Remove from saved listings" : "Save this listing"}
        className="absolute top-3 right-3 z-20 h-8 w-8 rounded-full bg-white/95 backdrop-blur flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
      >
        <svg
          viewBox="0 0 24 24"
          className={`h-4 w-4 ${saved ? "fill-clay stroke-clay" : "fill-none stroke-ink/60"}`}
          strokeWidth={2}
        >
          <path d="M12 21s-6.7-4.35-9.33-8.2C.87 10.06 1.6 6.4 4.6 5.02c2.4-1.1 4.9-.2 6.4 1.8l1 1.33 1-1.33c1.5-2 4-2.9 6.4-1.8 3 1.38 3.73 5.04 1.93 7.78C18.7 16.65 12 21 12 21z" />
        </svg>
      </button>

      <Link to={`/listing/${property.id}`} className="block text-left">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={property.image}
            alt={property.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3">
            <div className="peer flex items-center gap-1.5 bg-white/95 backdrop-blur rounded-full pl-1.5 pr-3 py-1 text-xs font-semibold cursor-help">
              <span className={`h-2 w-2 rounded-full ${scoreColor}`} />
              {score} confidence
            </div>
            <div className="hidden peer-hover:block hover:block absolute top-full left-0 mt-2 z-10 w-52 bg-ink text-paper text-xs rounded-lg p-3 shadow-xl">
              {dueSoon.length === 0 ? (
                <p>All 5 checks current — nothing due soon.</p>
              ) : (
                <>
                  <p className="text-paper/60 mb-1.5">{dueSoon.length} check{dueSoon.length > 1 ? "s" : ""} need attention:</p>
                  <ul className="space-y-1">
                    {dueSoon.map((c) => (
                      <li key={c.label} className="flex justify-between gap-2">
                        <span>{c.label}</span>
                        <span className="text-gold">{statusOf(c) === "expired" ? "expired" : "aging"}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
          <div className="absolute bottom-3 right-3 bg-ink/70 text-paper backdrop-blur rounded-full px-2.5 py-1 text-[11px] font-medium">
            {property.type}
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-display text-lg leading-tight">{property.title}</h3>
            <span className="font-display text-lg text-moss whitespace-nowrap">{formatPrice(property)}</span>
          </div>
          <p className="text-sm text-ink/50 mt-1">
            {property.city}, {property.country}
          </p>
          <div className="mt-3 flex items-center justify-between text-xs text-ink/45">
            <span>
              {property.beds > 0 ? `${property.beds} bd · ${property.baths} ba · ` : ""}
              {property.sqm} m²
            </span>
            <span className="text-ink/60">Confirmed {gap === 0 ? "today" : `${gap}d ago`}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
