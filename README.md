# Anugamana — अनुगमन

> *"Following the path."*

Anugamana is a search engine for the **Bhagavad Gita As It Is** by Srila Prabhupada — but not like any search engine you've used before.

Instead of typing keywords, you describe what you're going through in plain language. The app finds the verse that speaks to your situation, and explains *why* it applies to you — drawing only from Prabhupada's commentary.

**Example:** Type "I'm paralyzed by fear of making the wrong decision" → get Bhagavad Gita 2.47 with a full explanation of why it addresses that exact feeling.

---

## What makes this different

Traditional keyword search fails on ancient texts. The vocabulary gap between how people talk today ("I feel burnt out and lost") and how a 5,000-year-old Sanskrit commentary is written is too wide for simple matching.

Anugamana uses semantic search — it understands the *meaning* behind your words, not just the words themselves. It then generates guidance that is faithfully grounded in the retrieved verse and Prabhupada's purport. Nothing is invented.

---

## Features

- **Semantic search** — Describe your situation or emotion in natural language
- **Verse lookup** — Type a reference like `2.47` or `BG 6.5` for direct retrieval
- **AI guidance** — A plain-English explanation of why that verse applies to you, based strictly on the purport
- **Multilingual** — Works in English and 10 Indian languages
- **Search history** — Signed-in users can revisit past searches
- **Shareable results** — Every verse has its own link

---

## Tech stack

**Frontend** (this repo)
- React + Vite + TypeScript
- Tailwind CSS
- Clerk for authentication
- React Query for data fetching

**Backend** — [anugamana-backend](https://github.com/swayam-mishra/anugamana-backend)
- FastAPI (Python)
- ChromaDB for vector storage
- BAAI/bge-m3 for embeddings (dense + sparse, multilingual)
- ms-marco cross-encoder for reranking
- Claude Haiku 4.5 for query enrichment and guidance generation

---

## Running locally

### Prerequisites

- Node.js 18+
- The backend running at `http://localhost:8000` — see [anugamana-backend](https://github.com/swayam-mishra/anugamana-backend) for setup

### Setup

```bash
npm install
```

Create a `.env.local` file:

```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_API_URL=http://localhost:8000
```

Then start the dev server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Backend

The API and search pipeline live in a separate repo:
**[github.com/swayam-mishra/anugamana-backend](https://github.com/swayam-mishra/anugamana-backend)**

That repo covers the full pipeline — data scraping, indexing, hybrid retrieval, reranking, and RAG generation — along with setup instructions and architecture notes.

---

## Status

Currently in **beta**. The core search and guidance pipeline is live. Voice input and audio playback are planned for a future release.
