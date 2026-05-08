export default function Header() {
  return (
    <header className="relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center shadow-glow">
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 text-white"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7L8 5z" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">
              Video Script Writer
              <span className="text-gradient ml-1.5">AI</span>
            </h1>
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
              Viral content engine
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <span className="chip">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse" />
            Powered by GPT
          </span>
        </div>
      </div>
    </header>
  );
}
