import { useCallback, useState } from "react";

const PROD_BACKEND_URL = "https://videoscriptwriter.vercel.app";
const DEV_BACKEND_URL = "http://localhost:5000";

function resolveApiUrl() {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && envUrl.trim()) return envUrl.trim().replace(/\/$/, "");
  return import.meta.env.PROD ? PROD_BACKEND_URL : DEV_BACKEND_URL;
}

const API_URL = resolveApiUrl();

export function useGenerateScript() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = useCallback(async (payload) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch(`${API_URL}/generate-script`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        const message =
          json?.error ||
          (Array.isArray(json?.details) ? json.details.join("; ") : null) ||
          `Request failed with status ${res.status}`;
        throw new Error(message);
      }

      setData(json);
      return json;
    } catch (err) {
      const msg =
        err.name === "TypeError"
          ? "Could not reach the API. Is the backend running?"
          : err.message || "Something went wrong.";
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  return { data, loading, error, generate, reset };
}
