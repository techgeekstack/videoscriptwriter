import { env } from "../config/env.js";

export function notFoundHandler(req, res) {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.path}` });
}

export function errorHandler(err, req, res, _next) {
  const status = err.status || err.statusCode || 500;

  // Map common OpenAI error shapes to clean messages
  let message = err.message || "Internal server error";
  if (err?.error?.message) message = err.error.message;
  if (err?.code === "invalid_api_key") {
    message = "Invalid OpenAI API key.";
  }

  console.error(`[${status}] ${message}`);
  if (env.nodeEnv !== "production" && err.stack) {
    console.error(err.stack);
  }

  const body = { error: message };
  if (err.details) body.details = err.details;

  res.status(status).json(body);
}
