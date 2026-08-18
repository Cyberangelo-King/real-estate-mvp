export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-paper/70">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-10 flex flex-wrap items-center justify-between gap-4 text-sm">
        <div className="flex items-center gap-2 font-display text-lg text-paper">
          <span className="h-2.5 w-2.5 rounded-full bg-gold" /> Verity
        </div>
        <p className="text-paper/50">
          Concept build, mock data throughout — made to prove one idea: trust that expires unless it's earned again.
        </p>
      </div>
    </footer>
  );
}
