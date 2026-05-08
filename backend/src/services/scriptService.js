import { getOpenAIClient } from "../config/openai.js";
import { env } from "../config/env.js";
import { SYSTEM_PROMPT } from "./systemPrompt.js";

function buildUserPrompt({ topic, platform, tone, duration }) {
  return `Generate a complete viral video package for the following:

Topic: ${topic}
Platform: ${platform}
Tone: ${tone}
Duration: ${duration}

Tailor pacing, length, and style to the platform and duration. Return only the JSON object — no markdown, no extra text.`;
}

function validateOutput(data) {
  const errors = [];

  if (!data || typeof data !== "object") {
    return ["Response is not an object"];
  }
  if (!Array.isArray(data.titles) || data.titles.length === 0) {
    errors.push("titles must be a non-empty array");
  }
  if (typeof data.thumbnailText !== "string" || !data.thumbnailText.trim()) {
    errors.push("thumbnailText must be a non-empty string");
  }
  if (typeof data.hook !== "string" || !data.hook.trim()) {
    errors.push("hook must be a non-empty string");
  }
  if (typeof data.script !== "string" || !data.script.trim()) {
    errors.push("script must be a non-empty string");
  }
  if (typeof data.cta !== "string" || !data.cta.trim()) {
    errors.push("cta must be a non-empty string");
  }
  if (!Array.isArray(data.hashtags) || data.hashtags.length === 0) {
    errors.push("hashtags must be a non-empty array");
  }

  return errors;
}

export async function generateScript({ topic, platform, tone, duration }) {
  const openai = getOpenAIClient();

  const completion = await openai.chat.completions.create({
    model: env.openaiModel,
    response_format: { type: "json_object" },
    temperature: 0.85,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: buildUserPrompt({ topic, platform, tone, duration }) },
    ],
  });

  const raw = completion.choices?.[0]?.message?.content;
  if (!raw) {
    const err = new Error("OpenAI returned an empty response.");
    err.status = 502;
    throw err;
  }

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    const err = new Error("OpenAI returned invalid JSON.");
    err.status = 502;
    err.details = raw.slice(0, 500);
    throw err;
  }

  const errors = validateOutput(parsed);
  if (errors.length > 0) {
    const err = new Error(`Invalid AI response shape: ${errors.join("; ")}`);
    err.status = 502;
    throw err;
  }

  return {
    titles: parsed.titles.map(String),
    thumbnailText: String(parsed.thumbnailText),
    hook: String(parsed.hook),
    script: String(parsed.script),
    cta: String(parsed.cta),
    hashtags: parsed.hashtags.map((t) => {
      const s = String(t).trim();
      return s.startsWith("#") ? s : `#${s}`;
    }),
  };
}
