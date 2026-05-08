import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { env } from "./config/env.js";
import generateScriptRouter from "./routes/generateScript.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

const app = express();

const allowedOrigins =
  env.corsOrigin === "*"
    ? "*"
    : env.corsOrigin.split(",").map((s) => s.trim()).filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "OPTIONS"],
    credentials: false,
  })
);

app.use(express.json({ limit: "100kb" }));

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests. Please slow down." },
});
app.use("/generate-script", limiter);

app.get("/", (_req, res) => {
  res.json({
    name: "video-script-writer-api",
    status: "ok",
    endpoints: ["POST /generate-script", "GET /health"],
  });
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok", model: env.openaiModel });
});

app.use(generateScriptRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
