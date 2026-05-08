import OutputCard from "./OutputCard.jsx";
import {
  TitleIcon,
  ThumbnailIcon,
  HookIcon,
  ScriptIcon,
  CtaIcon,
  HashIcon,
} from "./Icons.jsx";

export default function OutputGrid({ data }) {
  if (!data) return null;

  const allText = [
    "TITLES:",
    ...data.titles.map((t, i) => `${i + 1}. ${t}`),
    "",
    `THUMBNAIL: ${data.thumbnailText}`,
    "",
    `HOOK: ${data.hook}`,
    "",
    `SCRIPT:\n${data.script}`,
    "",
    `CTA: ${data.cta}`,
    "",
    `HASHTAGS: ${data.hashtags.join(" ")}`,
  ].join("\n");

  return (
    <div className="space-y-4 sm:space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3 px-1">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <h3 className="text-sm font-medium text-slate-300">
            Generated package
          </h3>
        </div>
        <button
          type="button"
          onClick={() => navigator.clipboard.writeText(allText)}
          className="btn-ghost"
        >
          <svg
            className="w-3.5 h-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          Copy all
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
        <OutputCard
          icon={<TitleIcon />}
          title="Viral Titles"
          copyText={data.titles.join("\n")}
          delay={0}
        >
          <ol className="space-y-2.5">
            {data.titles.map((t, i) => (
              <li key={i} className="flex gap-3 group">
                <span className="flex-shrink-0 w-6 h-6 rounded-md bg-white/[0.06] border border-white/10 flex items-center justify-center text-xs font-semibold text-brand-400">
                  {i + 1}
                </span>
                <span className="text-slate-200 leading-relaxed group-hover:text-white transition-colors">
                  {t}
                </span>
              </li>
            ))}
          </ol>
        </OutputCard>

        <OutputCard
          icon={<ThumbnailIcon />}
          title="Thumbnail Text"
          copyText={data.thumbnailText}
          accent="cyan"
          delay={60}
        >
          <div className="rounded-xl bg-gradient-to-br from-brand-500/10 via-fuchsia-500/10 to-accent-500/10 border border-white/10 p-6 text-center">
            <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gradient leading-tight">
              {data.thumbnailText}
            </p>
          </div>
        </OutputCard>

        <OutputCard
          icon={<HookIcon />}
          title="Hook"
          copyText={data.hook}
          delay={120}
        >
          <p className="text-slate-100 leading-relaxed text-base">
            "{data.hook}"
          </p>
        </OutputCard>

        <OutputCard
          icon={<CtaIcon />}
          title="Call to Action"
          copyText={data.cta}
          accent="cyan"
          delay={180}
        >
          <p className="text-slate-100 leading-relaxed text-base">
            {data.cta}
          </p>
        </OutputCard>

        <OutputCard
          icon={<ScriptIcon />}
          title="Full Script"
          copyText={data.script}
          className="lg:col-span-2"
          delay={240}
        >
          <div className="max-h-[28rem] overflow-y-auto scrollbar-thin pr-2">
            <pre className="whitespace-pre-wrap break-words font-sans text-slate-200 leading-relaxed text-[15px]">
              {data.script}
            </pre>
          </div>
        </OutputCard>

        <OutputCard
          icon={<HashIcon />}
          title="Hashtags"
          copyText={data.hashtags.join(" ")}
          className="lg:col-span-2"
          accent="cyan"
          delay={300}
        >
          <div className="flex flex-wrap gap-2">
            {data.hashtags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-sm text-slate-200 hover:bg-brand-500/10 hover:border-brand-500/30 hover:text-brand-300 transition-colors cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </OutputCard>
      </div>
    </div>
  );
}
