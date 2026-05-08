import CopyButton from "./CopyButton.jsx";

export default function OutputCard({
  icon,
  title,
  copyText,
  children,
  className = "",
  accent = "brand",
  delay = 0,
}) {
  const accentRing =
    accent === "cyan"
      ? "from-accent-500/30 to-transparent"
      : "from-brand-500/30 to-transparent";

  return (
    <div
      className={`glass p-5 sm:p-6 hover:border-white/20 transition-all duration-300 hover:-translate-y-0.5 animate-slide-up ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-lg bg-gradient-to-br ${accentRing} border border-white/10 flex items-center justify-center text-slate-200`}
          >
            {icon}
          </div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
            {title}
          </h3>
        </div>
        {copyText ? <CopyButton text={copyText} /> : null}
      </div>
      <div className="text-slate-200">{children}</div>
    </div>
  );
}
