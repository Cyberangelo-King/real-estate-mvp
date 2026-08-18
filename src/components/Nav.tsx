export default function Nav({ onHome }: { onHome: () => void }) {
  return (
    <header className="sticky top-0 z-40 bg-paper/85 backdrop-blur border-b border-line">
      <div className="max-w-6xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
        <button onClick={onHome} className="flex items-center gap-2">
          <span className="h-7 w-7 rounded-full bg-moss flex items-center justify-center">
            <span className="h-2.5 w-2.5 rounded-full bg-paper" />
          </span>
          <span className="font-display text-xl tracking-tight">Verity</span>
        </button>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-ink/60">
          <a href="#discover" className="hover:text-ink transition-colors">Discover</a>
          <a href="#how-it-works" className="hover:text-ink transition-colors">How it works</a>
          <a href="#for-agents" className="hover:text-ink transition-colors">For agents</a>
        </nav>
        <button className="text-sm font-semibold bg-ink text-paper rounded-full px-4 py-2 hover:bg-moss transition-colors">
          List a property
        </button>
      </div>
    </header>
  );
}
