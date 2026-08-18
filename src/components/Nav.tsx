import { Link } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";

export default function Nav() {
  const { ids } = useFavorites();

  return (
    <header className="sticky top-0 z-40 bg-paper/85 backdrop-blur border-b border-line">
      <div className="max-w-6xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="h-7 w-7 rounded-full bg-moss flex items-center justify-center">
            <span className="h-2.5 w-2.5 rounded-full bg-paper" />
          </span>
          <span className="font-display text-xl tracking-tight">Verity</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-ink/60">
          <Link to="/#try-it" className="hover:text-ink transition-colors">Watch it decay</Link>
          <Link to="/#discover" className="hover:text-ink transition-colors">Discover</Link>
          <Link to="/#how-it-works" className="hover:text-ink transition-colors">Why it works</Link>
          <Link to="/#for-agents" className="hover:text-ink transition-colors">For agents</Link>
          <Link to="/saved" className="hover:text-ink transition-colors flex items-center gap-1.5">
            Saved
            {ids.length > 0 && (
              <span className="bg-clay text-white text-[11px] leading-none rounded-full h-4 min-w-4 px-1 flex items-center justify-center">
                {ids.length}
              </span>
            )}
          </Link>
        </nav>
        <button className="text-sm font-semibold bg-ink text-paper rounded-full px-4 py-2 hover:bg-moss transition-colors">
          List a property
        </button>
      </div>
    </header>
  );
}
