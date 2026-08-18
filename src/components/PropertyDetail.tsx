import type { Property } from "../data";
import { formatPrice } from "../data";
import TrustTimeline from "./TrustTimeline";

export default function PropertyDetail({ property, onBack }: { property: Property; onBack: () => void }) {
  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-10">
      <button onClick={onBack} className="text-sm font-semibold text-ink/60 hover:text-ink mb-6 inline-flex items-center gap-1">
        ← Back to all listings
      </button>

      <div className="grid md:grid-cols-2 gap-2 rounded-2xl overflow-hidden">
        <img src={property.gallery[0]} alt={property.title} className="w-full h-[340px] md:h-[440px] object-cover" />
        <div className="grid grid-cols-2 gap-2">
          {property.gallery.slice(1).map((src, i) => (
            <img key={i} src={src} alt="" className="w-full h-full object-cover" />
          ))}
          <div className="relative">
            <img src={property.gallery[0]} alt="" className="w-full h-full object-cover opacity-90" />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-[1.3fr_0.9fr] gap-10 mt-10">
        <div>
          <div className="flex items-baseline justify-between flex-wrap gap-2">
            <h1 className="font-display text-3xl md:text-4xl">{property.title}</h1>
            <span className="font-display text-2xl text-moss">{formatPrice(property)}</span>
          </div>
          <p className="text-ink/55 mt-1">
            {property.city}, {property.country}
          </p>
          <div className="flex gap-6 mt-5 text-sm text-ink/60 border-y border-line py-4">
            {property.beds > 0 && <span>{property.beds} bedrooms</span>}
            {property.baths > 0 && <span>{property.baths} bathrooms</span>}
            <span>{property.sqm} m²</span>
            <span>{property.type}</span>
          </div>

          <h2 className="font-display text-xl mt-8 mb-2">About this place</h2>
          <p className="text-ink/70 leading-relaxed">{property.blurb}</p>
          <p className="text-ink/60 leading-relaxed mt-3 italic">"{property.story}"</p>

          <div className="mt-10">
            <TrustTimeline property={property} />
          </div>
        </div>

        <aside className="md:sticky md:top-24 h-fit bg-white border border-line rounded-2xl p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-moss/15 flex items-center justify-center font-display text-lg text-moss">
              {property.agent.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <p className="font-semibold">{property.agent.name}</p>
              <p className="text-xs text-ink/50">
                On Verity since {property.agent.verifiedSince} · {property.agent.listingsClosed} closed
              </p>
            </div>
          </div>
          <p className="text-sm text-ink/55 mt-4">Typically responds {property.agent.responseTime}.</p>
          <button className="w-full mt-5 bg-ink text-paper font-semibold rounded-full py-3 hover:bg-moss transition-colors">
            Request a viewing
          </button>
          <button className="w-full mt-2 border border-line font-semibold rounded-full py-3 hover:bg-paper-dim transition-colors">
            Message {property.agent.name.split(" ")[0]}
          </button>
          <p className="text-xs text-ink/40 mt-4 text-center">
            You're contacting the verified agent directly — no lead resale, no third-party spam.
          </p>
        </aside>
      </div>
    </div>
  );
}
