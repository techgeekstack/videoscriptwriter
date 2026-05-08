export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-8 text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-xs text-slate-400 mb-6">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
        AI-powered viral video toolkit
      </div>

      <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.05]">
        Turn one idea into a{" "}
        <span className="text-gradient">viral video</span>
        <br className="hidden sm:block" />
        in 30 seconds.
      </h2>

      <p className="mt-5 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
        Generate scroll-stopping titles, thumbnail text, hooks, full scripts,
        CTAs, and hashtags — tuned for YouTube, Shorts, and Reels.
      </p>
    </section>
  );
}
