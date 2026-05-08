import { Router } from "express";
import { generateScript } from "../services/scriptService.js";

const router = Router();

const PLATFORMS = new Set([
  "YouTube Shorts",
  "YouTube Long-form",
  "Instagram Reels",
  "TikTok",
]);

const TONES = new Set([
  "Energetic",
  "Educational",
  "Funny",
  "Inspirational",
  "Professional",
  "Casual",
]);

const DURATIONS = new Set([
  "30 seconds",
  "60 seconds",
  "1-2 minutes",
  "3-5 minutes",
  "5-7 minutes",
  "8-10 minutes",
]);

function validateBody(body) {
  const errors = [];
  const { topic, platform, tone, duration } = body || {};

  if (typeof topic !== "string" || topic.trim().length < 3) {
    errors.push("topic is required (min 3 characters)");
  }
  if (typeof topic === "string" && topic.length > 500) {
    errors.push("topic must be under 500 characters");
  }
  if (typeof platform !== "string" || !PLATFORMS.has(platform)) {
    errors.push(`platform must be one of: ${[...PLATFORMS].join(", ")}`);
  }
  if (typeof tone !== "string" || !TONES.has(tone)) {
    errors.push(`tone must be one of: ${[...TONES].join(", ")}`);
  }
  if (typeof duration !== "string" || !DURATIONS.has(duration)) {
    errors.push(`duration must be one of: ${[...DURATIONS].join(", ")}`);
  }

  return errors;
}

router.post("/generate-script", async (req, res, next) => {
  try {
    const errors = validateBody(req.body);
    if (errors.length > 0) {
      return res.status(400).json({
        error: "Invalid request body",
        details: errors,
      });
    }

    const { topic, platform, tone, duration } = req.body;
    const result = await generateScript({
      topic: topic.trim(),
      platform,
      tone,
      duration,
    });

    res.json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
