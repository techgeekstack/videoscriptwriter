import dotenv from "dotenv";

dotenv.config();

const required = ["OPENAI_API_KEY"];
const missing = required.filter((k) => !process.env[k]);

if (missing.length > 0) {
  // Don't throw at import time — log a warning so the server can still boot
  // and surface a clean error on the first API call instead.
  console.warn(
    `[env] Missing environment variables: ${missing.join(
      ", "
    )}. The /generate-script endpoint will fail until these are set.`
  );
}

export const env = {
  openaiApiKey: process.env.OPENAI_API_KEY || "",
  openaiModel: process.env.OPENAI_MODEL || "gpt-4.1",
  port: Number(process.env.PORT) || 5000,
  corsOrigin: process.env.CORS_ORIGIN || "*",
  nodeEnv: process.env.NODE_ENV || "development",
};
