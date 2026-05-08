export default function Footer() {
  return (
    <footer className="relative z-10 mt-16 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-slate-500">
          Built with React, Tailwind &amp; OpenAI.
        </p>
        <p className="text-xs text-slate-500">
          Ship viral content faster.
        </p>
      </div>
    </footer>
  );
}
