import { useState } from "react";

const PLATFORMS = [
  "YouTube Long-form",
  "YouTube Shorts",
  "Instagram Reels",
  "TikTok",
];

const TONES = [
  "Energetic",
  "Educational",
  "Funny",
  "Inspirational",
  "Professional",
  "Casual",
];

const DURATIONS = [
  "30 seconds",
  "60 seconds",
  "1-2 minutes",
  "3-5 minutes",
  "5-7 minutes",
  "8-10 minutes",
];

export default function ScriptForm({ onSubmit, loading }) {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState(PLATFORMS[0]);
  const [tone, setTone] = useState(TONES[0]);
  const [duration, setDuration] = useState(DURATIONS[3]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!topic.trim() || loading) return;
    onSubmit({
      topic: topic.trim(),
      platform,
      tone,
      duration,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-strong p-6 sm:p-8 animate-slide-up"
    >
      <div className="space-y-5">
        <div>
          <label htmlFor="topic" className="label">
            Video topic or idea
          </label>
          <textarea
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. How AI agents are replacing SaaS and what builders should do next"
            rows={3}
            maxLength={500}
            className="input-field resize-none scrollbar-thin"
            required
          />
          <div className="flex justify-end mt-1">
            <span className="text-xs text-slate-500">{topic.length}/500</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="platform" className="label">
              Platform
            </label>
            <select
              id="platform"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="select-field"
            >
              {PLATFORMS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="tone" className="label">
              Tone
            </label>
            <select
              id="tone"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="select-field"
            >
              {TONES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="duration" className="label">
              Duration
            </label>
            <select
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="select-field"
            >
              {DURATIONS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={!topic.trim() || loading}
            className="btn-primary w-full sm:w-auto"
          >
            {loading ? (
              <>
                <svg
                  className="w-4 h-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="opacity-20"
                  />
                  <path
                    d="M22 12a10 10 0 0 1-10 10"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
                Generating…
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
                </svg>
                Generate Script
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
