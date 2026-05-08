# Deployment Guide — Vercel

This project deploys as **two separate Vercel projects**: one for the backend (serverless API) and one for the frontend (Vite static site).

---

## 1. Deploy the Backend

The backend is wrapped as a Vercel serverless function via `backend/api/index.js`.

### Steps

1. Push the repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) → **Import Git Repository**.
3. Select the repo → set the **Root Directory** to `backend`.
4. Framework preset: **Other** (Vercel will detect Node.js).
5. Build command: leave empty.
6. Output directory: leave empty.
7. **Environment Variables**:
   - `OPENAI_API_KEY` → your OpenAI key
   - `OPENAI_MODEL` → `gpt-4.1` (or any other supported model)
   - `CORS_ORIGIN` → your frontend domain, e.g. `https://video-script-writer.vercel.app`
8. Click **Deploy**.

After deployment, your API will be live at `https://<your-backend>.vercel.app/generate-script`.

Test it:

```bash
curl -X POST https://<your-backend>.vercel.app/generate-script \
  -H "Content-Type: application/json" \
  -d '{"topic":"AI agents","platform":"YouTube Long-form","tone":"Energetic","duration":"5-7 minutes"}'
```

---

## 2. Deploy the Frontend

1. Go to [vercel.com/new](https://vercel.com/new) → **Import Git Repository**.
2. Select the same repo → set the **Root Directory** to `frontend`.
3. Framework preset: **Vite** (auto-detected).
4. Build command: `npm run build`
5. Output directory: `dist`
6. **Environment Variables**:
   - `VITE_API_URL` → the backend URL from step 1, e.g. `https://<your-backend>.vercel.app`
7. Click **Deploy**.

---

## 3. Update CORS

Once the frontend is live, update the backend's `CORS_ORIGIN` env var with the actual frontend URL and redeploy the backend.

---

## 4. Verify

- Open the frontend URL.
- Submit a topic.
- Confirm you see all 6 output sections render with copy buttons working.

---

## Troubleshooting

| Issue                                     | Fix                                                                                             |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `CORS error` in browser                   | Set `CORS_ORIGIN` on backend to the exact frontend URL (no trailing slash) and redeploy.        |
| `OPENAI_API_KEY missing`                  | Add the env var in Vercel dashboard → Settings → Environment Variables → Redeploy.              |
| Frontend calls `localhost:5000`           | `VITE_API_URL` must be set **before** building. Trigger a fresh Vercel deploy after setting it. |
| 504 timeout                               | OpenAI may be slow. Increase `maxDuration` in `backend/vercel.json` (Pro plan required >10s).   |
