import { useState } from "react";
import { Link } from "react-router-dom";
import type { Property } from "../data";
import { formatPrice, confidenceScore } from "../data";

// Equirectangular projection: convert lat/lng to a % position over the map image.
function project(lat: number, lng: number) {
  const x = ((lng + 180) / 360) * 100;
  const y = ((90 - lat) / 180) * 100;
  return { left: `${x}%`, top: `${y}%` };
}

export default function MapView({ properties }: { properties: Property[] }) {
  const [hoverId, setHoverId] = useState<string | null>(null);
  const active = properties.find((p) => p.id === hoverId) ?? null;

  return (
    <div className="relative rounded-2xl overflow-hidden border border-line bg-[#e9e4d8]">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/8/83/Equirectangular_projection_SW.jpg"
        alt="World map"
        className="w-full h-[420px] md:h-[520px] object-cover opacity-[0.5] mix-blend-multiply saturate-[0.3] sepia-[0.25]"
      />
      <div className="absolute inset-0">
        {properties.map((p) => {
          const pos = project(p.lat, p.lng);
          const score = confidenceScore(p);
          const color = score >= 80 ? "bg-moss" : score >= 50 ? "bg-gold" : "bg-clay";
          return (
            <Link
              to={`/listing/${p.id}`}
              key={p.id}
              style={pos}
              className="absolute -translate-x-1/2 -translate-y-full group"
              onMouseEnter={() => setHoverId(p.id)}
              onMouseLeave={() => setHoverId((id) => (id === p.id ? null : id))}
            >
              <span
                className={`block h-4 w-4 rounded-full ${color} border-2 border-white shadow-lg group-hover:scale-125 transition-transform cursor-pointer`}
              />
              <span className={`block h-2 w-2 rounded-full ${color} opacity-40 mx-auto -mt-1 animate-ping`} />
            </Link>
          );
        })}
      </div>

      {active && (
        <div className="absolute bottom-4 left-4 right-4 md:right-auto md:w-72 bg-white border border-line rounded-xl p-4 shadow-xl">
          <div className="flex items-baseline justify-between gap-2">
            <h4 className="font-display text-base">{active.title}</h4>
            <span className="font-display text-sm text-moss whitespace-nowrap">{formatPrice(active)}</span>
          </div>
          <p className="text-xs text-ink/50 mt-0.5">{active.city}, {active.country}</p>
          <p className="text-xs text-ink/60 mt-1">{confidenceScore(active)} confidence</p>
        </div>
      )}

      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur rounded-full px-3 py-1.5 text-xs font-medium text-ink/60">
        {properties.length} listings on the map
      </div>
    </div>
  );
}
