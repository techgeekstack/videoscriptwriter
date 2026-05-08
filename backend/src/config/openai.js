import OpenAI from "openai";
import { env } from "./env.js";

let client = null;

export function getOpenAIClient() {
  if (!env.openaiApiKey) {
    throw new Error(
      "OPENAI_API_KEY is not set. Add it to your environment variables."
    );
  }
  if (!client) {
    client = new OpenAI({ apiKey: env.openaiApiKey });
  }
  return client;
}
