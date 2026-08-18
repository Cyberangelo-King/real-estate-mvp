import { Link, useNavigate, useParams } from "react-router-dom";
import { properties, formatPrice } from "../data";
import TrustTimeline from "./TrustTimeline";
import MortgageCalculator from "./MortgageCalculator";
import { useFavorites } from "../hooks/useFavorites";
import { useEffect } from "react";

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const property = properties.find((p) => p.id === id);
  const { isFavorite, toggle } = useFavorites();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [id]);

  if (!property) {
    return (
      <div className="max-w-2xl mx-auto px-5 py-24 text-center">
        <h1 className="font-display text-2xl mb-3">Listing not found</h1>
        <p className="text-ink/55 mb-6">It may have been unpublished or the link is off.</p>
        <button onClick={() => navigate("/")} className="bg-ink text-paper rounded-full px-5 py-2.5 font-semibold">
          Back to all listings
        </button>
      </div>
    );
  }

  const saved = isFavorite(property.id);
  const similar = properties.filter((p) => p.id !== property.id && p.type === property.type).slice(0, 3);
  const canFinance = property.period === "sale";

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-10">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <nav className="text-sm text-ink/45 flex items-center gap-1.5 flex-wrap">
          <Link to="/" className="hover:text-ink transition-colors">Home</Link>
          <span>/</span>
          <Link to="/#discover" className="hover:text-ink transition-colors">{property.country}</Link>
          <span>/</span>
          <span className="text-ink/70">{property.title}</span>
        </nav>
        <button
          onClick={() => toggle(property.id)}
          className={`inline-flex items-center gap-2 text-sm font-semibold rounded-full px-4 py-2 border transition-colors ${
            saved ? "border-clay bg-clay/10 text-clay" : "border-line hover:bg-paper-dim"
          }`}
        >
          <svg viewBox="0 0 24 24" className={`h-4 w-4 ${saved ? "fill-clay stroke-clay" : "fill-none stroke-ink/60"}`} strokeWidth={2}>
            <path d="M12 21s-6.7-4.35-9.33-8.2C.87 10.06 1.6 6.4 4.6 5.02c2.4-1.1 4.9-.2 6.4 1.8l1 1.33 1-1.33c1.5-2 4-2.9 6.4-1.8 3 1.38 3.73 5.04 1.93 7.78C18.7 16.65 12 21 12 21z" />
          </svg>
          {saved ? "Saved" : "Save listing"}
        </button>
      </div>

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

          <h2 className="font-display text-xl mt-10 mb-3">Location</h2>
          <div className="rounded-2xl overflow-hidden border border-line relative h-56">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/8/83/Equirectangular_projection_SW.jpg"
              alt="Map"
              className="w-full h-full object-cover opacity-[0.55] saturate-[0.3] sepia-[0.25]"
              style={{
                objectPosition: `${((property.lng + 180) / 360) * 100}% ${((90 - property.lat) / 180) * 100}%`,
                transform: "scale(4)",
              }}
            />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full h-4 w-4 rounded-full bg-clay border-2 border-white shadow-lg" />
            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur rounded-full px-3 py-1.5 text-xs font-medium">
              {property.city}, {property.country} · exact address shared after a viewing is booked
            </div>
          </div>

          <div className="mt-10">
            <TrustTimeline property={property} />
          </div>
        </div>

        <aside className="space-y-6">
          <div className="md:sticky md:top-24 space-y-6">
            <div className="bg-white border border-line rounded-2xl p-6">
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
            </div>

            {canFinance && <MortgageCalculator property={property} />}
          </div>
        </aside>
      </div>

      {similar.length > 0 && (
        <div className="mt-16 pt-10 border-t border-line">
          <h2 className="font-display text-2xl mb-6">More {property.type.toLowerCase()}s like this</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similar.map((p) => (
              <Link key={p.id} to={`/listing/${p.id}`} className="group rounded-2xl overflow-hidden bg-white border border-line hover:shadow-xl hover:-translate-y-1 transition-all duration-300 block">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-display text-lg leading-tight">{p.title}</h3>
                    <span className="font-display text-lg text-moss whitespace-nowrap">{formatPrice(p)}</span>
                  </div>
                  <p className="text-sm text-ink/50 mt-1">{p.city}, {p.country}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
