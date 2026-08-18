import type { Property } from "../data";
import { formatPrice, confidenceScore, freshestGap } from "../data";

export default function PropertyCard({
  property,
  onOpen,
}: {
  property: Property;
  onOpen: (id: string) => void;
}) {
  const score = confidenceScore(property);
  const gap = freshestGap(property);
  const scoreColor = score >= 80 ? "bg-moss" : score >= 50 ? "bg-gold" : "bg-clay";

  return (
    <button
      onClick={() => onOpen(property.id)}
      className="text-left group rounded-2xl overflow-hidden bg-white border border-line hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/95 backdrop-blur rounded-full pl-1.5 pr-3 py-1 text-xs font-semibold">
          <span className={`h-2 w-2 rounded-full ${scoreColor}`} />
          {score} confidence
        </div>
        <div className="absolute top-3 right-3 bg-ink/70 text-paper backdrop-blur rounded-full px-2.5 py-1 text-[11px] font-medium">
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
    </button>
  );
}
