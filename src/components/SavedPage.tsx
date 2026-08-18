import { Link } from "react-router-dom";
import { properties } from "../data";
import PropertyCard from "./PropertyCard";
import { useFavorites } from "../hooks/useFavorites";

export default function SavedPage() {
  const { ids } = useFavorites();
  const saved = properties.filter((p) => ids.includes(p.id));

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-14 min-h-[60vh]">
      <h1 className="font-display text-3xl mb-2">Saved listings</h1>
      <p className="text-ink/55 mb-8">
        Stored on this device. Favorite a listing from any card to see it here.
      </p>
      {saved.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-line rounded-2xl">
          <p className="text-ink/50 mb-4">You haven't saved anything yet.</p>
          <Link to="/#discover" className="bg-ink text-paper rounded-full px-5 py-2.5 font-semibold text-sm">
            Browse listings
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {saved.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      )}
    </div>
  );
}
