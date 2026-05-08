# Video Script Writer AI

A modern full-stack AI web app that turns a single topic into a complete viral video package: titles, thumbnail text, hook, full script, CTA, and hashtags — optimized for YouTube Shorts, long-form, and Instagram Reels.

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS (dark glassmorphic UI)
- **Backend**: Node.js + Express
- **AI**: OpenAI API (GPT-4.1 / latest)
- **Deployment**: Vercel (frontend + serverless backend)

## Project Structure

```
videoscriptwriter/
├── backend/              Express API + OpenAI integration
│   ├── src/
│   │   ├── config/       Env + OpenAI client
│   │   ├── middleware/   Error handler
│   │   ├── routes/       /generate-script
│   │   ├── services/     OpenAI service + system prompt
│   │   └── server.js     Express entry
│   ├── api/              Vercel serverless wrapper
│   ├── .env.example
│   └── package.json
├── frontend/             React + Vite + Tailwind
│   ├── src/
│   │   ├── components/   ScriptForm, OutputCards, etc.
│   │   ├── hooks/        useGenerateScript
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   └── package.json
└── README.md
```

## Quick Start

### 1. Clone and install

```bash
git clone <your-repo>
cd videoscriptwriter

# Backend
cd backend
npm install
cp .env.example .env   # then add your OPENAI_API_KEY

# Frontend (in a new terminal)
cd ../frontend
npm install
cp .env.example .env   # default points to http://localhost:5000
```

### 2. Run in development

```bash
# Terminal 1 — backend on http://localhost:5000
cd backend
npm run dev

# Terminal 2 — frontend on http://localhost:5173
cd frontend
npm run dev
```

Open http://localhost:5173.

## Environment Variables

### Backend (`backend/.env`)

| Variable          | Description                              |
| ----------------- | ---------------------------------------- |
| `OPENAI_API_KEY`  | Your OpenAI API key (required)           |
| `OPENAI_MODEL`    | Model name. Default: `gpt-4.1`           |
| `PORT`            | Server port. Default: `5000`             |
| `CORS_ORIGIN`     | Allowed origin. Default: `*` in dev      |

### Frontend (`frontend/.env`)

| Variable          | Description                                   |
| ----------------- | --------------------------------------------- |
| `VITE_API_URL`    | Backend base URL. Default: `http://localhost:5000` |

## API

### `POST /generate-script`

**Request body**

```json
{
  "topic": "How AI agents will replace SaaS",
  "platform": "YouTube Long-form",
  "tone": "Energetic",
  "duration": "5-7 minutes"
}
```

**Response**

```json
{
  "titles": ["...", "..."],
  "thumbnailText": "AI KILLS SAAS",
  "hook": "...",
  "script": "...",
  "cta": "...",
  "hashtags": ["#ai", "#startups"]
}
```

## Deployment (Vercel)

Both apps deploy to Vercel as separate projects.

### Backend
1. Import `backend/` folder as a new Vercel project.
2. Add `OPENAI_API_KEY` (and optional `OPENAI_MODEL`, `CORS_ORIGIN`) in Project Settings → Environment Variables.
3. Vercel auto-detects `api/index.js` as a serverless function. No build command needed.

### Frontend
1. Import `frontend/` folder as a new Vercel project.
2. Framework preset: **Vite**.
3. Add `VITE_API_URL` pointing to your deployed backend URL.
4. Build command: `npm run build` · Output: `dist`.

See `DEPLOYMENT.md` for detailed step-by-step instructions.

## License

MIT
