# Anugamana — Frontend Integration Guide

Complete reference for building the Anugamana frontend against this backend.
Covers every page, every API call, Clerk auth, TypeScript types, error states, and edge cases.

---

## Stack Assumptions

This guide assumes:
- **Framework**: Next.js 14+ (App Router)
- **Auth**: Clerk
- **Styling**: Tailwind CSS
- **HTTP**: fetch or axios
- **State**: React Query (TanStack Query) for server state

Adjust as needed for your actual stack.

---

## Environment Variables

```env
# .env.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
NEXT_PUBLIC_API_URL=http://localhost:8000        # dev
# NEXT_PUBLIC_API_URL=https://api.anugamana.com  # prod

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/search
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/search
```

---

## Clerk Setup

### Install

```bash
npm install @clerk/nextjs
```

### Wrap the app

```tsx
// app/layout.tsx
import { ClerkProvider } from '@clerk/nextjs'

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}
```

### Middleware — protect routes

```ts
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher([
  '/history(.*)',
  '/dashboard(.*)',
])

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect()
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
```

### Public routes (no auth required)
- `/` — landing page
- `/search` — main search (allow anonymous, but require auth for history)
- `/verse/[id]` — verse detail
- `/sign-in`, `/sign-up`

### Auth-required routes
- `/history` — past searches
- `/dashboard` — metrics (if you add an admin section)

### Passing auth token to the API

When a user is signed in, pass their Clerk session token as a Bearer token.
The backend does not currently validate it (auth is not yet implemented server-side),
but include it now so the backend can add validation later without breaking the frontend.

```ts
// lib/api.ts
import { auth } from '@clerk/nextjs/server'  // server component
// or
import { useAuth } from '@clerk/nextjs'       // client component

async function apiRequest(path: string, options?: RequestInit) {
  const { getToken } = auth()                  // server
  // const { getToken } = useAuth()            // client
  const token = await getToken()

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  })
}
```

---

## TypeScript Types

Copy these into `types/api.ts`:

```ts
export interface VerseResult {
  verse_id: string          // "2.47"
  chapter: number           // 2
  verse: number             // 47
  devanagari: string        // "कर्मण्येवाधिकारस्ते..."
  sanskrit: string          // "karmaṇy evādhikāras te..."
  translation: string       // "You have a right to perform..."
  score: number             // 0–1 normalized, 1.0 = best match
  ai_guidance: string       // "" if generation failed
}

export interface QueryMeta {
  guardrail: 'relevant' | 'off_topic'
  query_route: 'semantic' | 'direct_lookup' | 'sanskrit'
  retrieval_ms: number
  rerank_ms: number
  generation_ms: number
  total_ms: number
  response_id: number | null
  degraded_stages: string[]        // e.g. ["hyde", "expansion"]
  confidence_filtered: number      // how many results were dropped
  low_confidence: boolean          // true = no clear winner in results
}

export interface SearchResponse {
  results: VerseResult[]
  query_meta: QueryMeta
}

export interface SearchRequest {
  query: string
  top_k?: number   // 1–5, default 3
}

export interface MetricsResponse {
  window_days: number
  total_queries: number
  avg_latency_ms: number
  avg_faith_score: number | null
  judged_count: number
  thumbs_up: number
  thumbs_down: number
}
```

---

## API Reference

Base URL: `NEXT_PUBLIC_API_URL`

### `POST /search`

The main endpoint. Powers the entire search experience.

**Request:**
```ts
{
  query: string    // user's question or situation
  top_k?: number   // 1–5 results, default 3
}
```

**Response:** `SearchResponse`

**Important behaviours to handle in the UI:**
- `results` can be an empty array (no match found or all confidence-filtered)
- `ai_guidance` can be `""` if Claude was down (show the verse without guidance)
- `degraded_stages` tells you if any stage failed — show a subtle warning
- `low_confidence: true` means the top result may not be a strong match
- `query_route: "direct_lookup"` means a verse reference was detected — show a "Direct lookup" badge
- HTTP `422` means the query was off-topic — show the `detail` message from the response

**Error responses:**
```
400 — empty query
422 — off-topic query (body: { "detail": "Anugamana is designed for..." })
429 — rate limited (20 requests/minute)
500 — should not happen (graceful degradation prevents it)
```

**Example call:**
```ts
async function search(query: string, topK = 3): Promise<SearchResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, top_k: topK }),
  })

  if (res.status === 422) {
    const { detail } = await res.json()
    throw new OffTopicError(detail)
  }
  if (!res.ok) throw new Error(`Search failed: ${res.status}`)

  return res.json()
}
```

---

### `GET /metrics?days=7`

Rolling system metrics. Optional `days` query param (default 7).

**Response:** `MetricsResponse`

**When to show this:** Admin/debug page, or a subtle status indicator in the footer.

---

### `POST /feedback`

Submit thumbs up/down after a search result.

**Request:**
```ts
{
  response_id: number   // from query_meta.response_id
  rating: 1 | -1        // +1 = helpful, -1 = not helpful
}
```

**Response:** `{ "status": "ok" }`

**Error responses:**
```
400 — invalid rating value
```

**Note:** `response_id` can be `null` if feedback logging failed server-side.
Guard against this before calling the endpoint:

```ts
async function submitFeedback(responseId: number | null, rating: 1 | -1) {
  if (!responseId) return  // logging failed server-side, silently skip
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/feedback`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ response_id: responseId, rating }),
  })
}
```

---

## Pages

### 1. Landing Page `/`

**Purpose:** Introduce the product, convert visitors to users.

**Sections:**
- Hero: tagline + search bar (auto-redirects to `/search?q=...` on submit)
- The problem: "Standard search fails on ancient texts" — show the vocabulary gap example
- How it works: 3-step visual (describe situation → find verse → receive guidance)
- Example queries: clickable cards that pre-fill the search bar
  - *"I'm scared of making the wrong decision"*
  - *"How do I deal with my anger"*
  - *"What does the Gita say about duty"*
  - *"verse 2.47"*
- CTA: Sign up for history / bookmarks

**No auth required.** The search bar on the landing page should work for anonymous users.

---

### 2. Search Page `/search`

**Purpose:** The core product experience. Most users will spend all their time here.

**URL state:** `?q=<query>` — so search results are shareable and bookmarkable.

**Layout:**
```
┌─────────────────────────────────────┐
│  [Search bar — large, centred]      │
│  [Recent searches — if signed in]   │
├─────────────────────────────────────┤
│  Query meta bar (subtle)            │
│  Route badge · Latency · Warnings   │
├─────────────────────────────────────┤
│  Result card 1          Score: ●●●○○│
│  ┌──────────────────────────────┐   │
│  │ Verse 2.47                   │   │
│  │ कर्मण्येवाधिकारस्ते...        │   │
│  │ "You have a right to..."     │   │
│  │ ─────────────────────────    │   │
│  │ AI Guidance                  │   │
│  │ The anxiety you feel...      │   │
│  │ ─────────────────────────    │   │
│  │ 👍  👎  [View full verse →]  │   │
│  └──────────────────────────────┘   │
│                                     │
│  Result card 2...                   │
└─────────────────────────────────────┘
```

**Search bar behaviour:**
- Submit on Enter or click
- Show loading spinner during request
- Debounce is NOT needed — only search on explicit submit
- Preserve query in URL (`router.push('/search?q=...')`)

**Query meta bar (small, below search bar):**
- Only show after a result
- Route badge: `Direct lookup` (blue), `Sanskrit` (orange), `Semantic` (grey)
- Latency: `1.2s`
- Degraded warning: if `degraded_stages.length > 0`, show subtle warning icon
  `⚠ Some features unavailable (pipeline degraded)`
- Low confidence: if `low_confidence: true`, show `Results may not be strongly relevant`

**Result card states:**
1. **Loading** — skeleton card
2. **Has guidance** — full card with verse + AI guidance
3. **No guidance** (`ai_guidance === ""`) — show verse only, with note "Guidance unavailable"
4. **Empty results** — "No matching verses found. Try rephrasing your question."
5. **Off-topic** (422) — show the server's message directly

**Score display:**
`score` is 0–1. Display as filled dots or a bar, not a raw number:
- `score >= 0.8` → 5 filled dots
- `score >= 0.6` → 4 filled dots
- `score >= 0.4` → 3 filled dots
- `score >= 0.2` → 2 filled dots
- `score < 0.2`  → 1 filled dot

**Feedback buttons:**
- Show 👍 / 👎 after result renders
- On click: call `POST /feedback`, show brief confirmation, disable both buttons
- Only show if `query_meta.response_id` is not null

**top_k selector:**
- Small toggle: `1 / 3 / 5 results` — default 3
- Updates the request's `top_k` field

---

### 3. Verse Detail Page `/verse/[verse_id]`

**Purpose:** Full verse view — complete purport, all metadata, shareable URL.

**URL example:** `/verse/2.47`

**Content:**
- Verse reference and chapter name
- Devanagari text (large, beautiful rendering)
- Sanskrit transliteration
- Word-by-word synonyms (from `gita_enriched.json` — currently not in API, could be added)
- Full English translation
- Full purport (Prabhupada's commentary)
- AI guidance (from a search, if arriving from search results)
- Share button (copy URL)
- "Find related verses" button (searches by verse translation text)

**How to reach this page:**
- "View full verse →" link on search result cards
- Direct URL navigation

**API call:** `POST /search` with `query: "verse 2.47"` and `top_k: 1`.
This hits the `direct_lookup` route and returns instantly.

---

### 4. History Page `/history` *(requires auth)*

**Purpose:** Let signed-in users see their past searches.

**Note:** The backend currently logs all queries to SQLite (`feedback.db`), but there is
no endpoint to query history by user. This page requires either:
- A new `GET /history` endpoint (to be built)
- OR storing history client-side in localStorage/database

**For now:** Implement with localStorage. When the backend adds a history endpoint,
replace the data source without changing the UI.

**Layout:**
- List of past queries (most recent first)
- Each item: query text + timestamp + "Search again" button
- Clear history button
- Empty state: "Your search history will appear here"

**localStorage implementation:**
```ts
// lib/history.ts
const HISTORY_KEY = 'anugamana_history'
const MAX_ITEMS = 50

interface HistoryItem {
  query: string
  timestamp: string
  verse_id?: string  // top result
}

export function addToHistory(query: string, topVerseId?: string) {
  const history = getHistory()
  const item: HistoryItem = {
    query,
    timestamp: new Date().toISOString(),
    verse_id: topVerseId,
  }
  const updated = [item, ...history.filter(h => h.query !== query)].slice(0, MAX_ITEMS)
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated))
}

export function getHistory(): HistoryItem[] {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]')
  } catch {
    return []
  }
}
```

---

### 5. Auth Pages

Clerk handles these automatically via its hosted UI.
Just ensure the redirect URLs are set correctly in your Clerk dashboard
and in `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` / `AFTER_SIGN_UP_URL`.

- `/sign-in` — Clerk's `<SignIn />` component
- `/sign-up` — Clerk's `<SignUp />` component

**Custom styling:** Use Clerk's `appearance` prop to match your design.

---

### 6. About Page `/about` *(optional)*

Brief project description, how it works, the research behind it.
No API calls. Static content.

---

## State Management Patterns

### Search state with React Query

```ts
// hooks/useSearch.ts
import { useMutation } from '@tanstack/react-query'
import { SearchRequest, SearchResponse } from '@/types/api'

export function useSearch() {
  return useMutation<SearchResponse, Error, SearchRequest>({
    mutationFn: async ({ query, top_k = 3 }) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, top_k }),
      })

      if (res.status === 422) {
        const { detail } = await res.json()
        throw new Error(detail)  // off-topic message
      }
      if (res.status === 429) throw new Error('Too many requests. Please wait a moment.')
      if (!res.ok) throw new Error('Search failed. Please try again.')

      return res.json()
    },
  })
}
```

### Usage in search page

```tsx
const { mutate, data, isPending, error } = useSearch()

const handleSearch = (query: string) => {
  mutate({ query, top_k: topK })
  addToHistory(query)
}
```

---

## Loading & Error States Checklist

For the search page, handle all these states:

| State | When | UI |
|---|---|---|
| Idle | No query yet | Show example queries |
| Loading | Request in flight | Skeleton cards |
| Success, results | `results.length > 0` | Result cards |
| Success, empty | `results.length === 0` | "No matching verses" message |
| Off-topic error | HTTP 422 | Show server's message with suggestion |
| Rate limited | HTTP 429 | "Too many searches, wait a moment" |
| Server error | HTTP 500 | "Something went wrong" with retry |
| No guidance | `ai_guidance === ""` | Show verse only, no guidance section |
| Degraded | `degraded_stages.length > 0` | Subtle warning icon in meta bar |
| Low confidence | `low_confidence: true` | Soft warning under results |

---

## Devanagari Rendering

Install a proper Devanagari font for the `devanagari` field:

```tsx
// app/layout.tsx
import { Noto_Serif_Devanagari } from 'next/font/google'

const devanagari = Noto_Serif_Devanagari({
  subsets: ['devanagari'],
  display: 'swap',
})
```

Apply it to the devanagari text:

```tsx
<p className={`${devanagari.className} text-2xl leading-loose`}>
  {verse.devanagari}
</p>
```

---

## Rate Limiting

The API allows **20 requests per minute** per IP.

- On HTTP 429, show a friendly message and a retry button
- Add a minimum 1-second debounce between rapid re-submissions
- Do not auto-retry on 429 — wait for user action

---

## Phase 8 — Future API Fields (Sarvam Integrations)

When Phase 8 is built, the API response will gain these additional fields.
Design your components to gracefully handle them being present or absent:

```ts
// Future additions to VerseResult
verse_audio_url?: string         // "/audio/2.47.mp3" — Sanskrit TTS
guidance_audio_url?: string      // per-request guidance audio

// Future additions to QueryMeta
detected_language?: string       // "hi", "en", "ta" etc.
original_query?: string          // original non-English query
translated_query?: string        // English translation of original
translation_ms?: number
tts_ms?: number
```

**Audio player:** When `verse_audio_url` is present, show a play button on the verse card.
Use a simple HTML5 `<audio>` element or a library like `react-player`.

---

## Suggested Component Tree

```
app/
├── layout.tsx                  ClerkProvider, fonts, nav
├── page.tsx                    Landing page
├── search/
│   └── page.tsx                Search page (reads ?q= from URL)
├── verse/
│   └── [verse_id]/
│       └── page.tsx            Verse detail page
├── history/
│   └── page.tsx                History page (protected)
├── sign-in/[[...sign-in]]/
│   └── page.tsx                Clerk SignIn
├── sign-up/[[...sign-up]]/
│   └── page.tsx                Clerk SignUp
│
components/
├── SearchBar.tsx               Query input + submit
├── SearchResult.tsx            Single verse result card
├── VerseText.tsx               Devanagari + Sanskrit + translation
├── AiGuidance.tsx              Guidance section with feedback buttons
├── QueryMetaBar.tsx            Route badge, latency, warnings
├── ScoreIndicator.tsx          Dot-based 0–1 score display
├── FeedbackButtons.tsx         👍 👎 with submit logic
├── LoadingSkeleton.tsx         Skeleton card for loading state
│
hooks/
├── useSearch.ts                React Query mutation
├── useFeedback.ts              Feedback submission
│
types/
└── api.ts                      All TypeScript interfaces
│
lib/
├── api.ts                      Base fetch wrapper with Clerk token
└── history.ts                  localStorage history management
```

---

## Quick Reference — API Calls

| Action | Method | Path | Auth |
|---|---|---|---|
| Search | POST | `/search` | Optional |
| Get metrics | GET | `/metrics` | Optional |
| Submit feedback | POST | `/feedback` | Optional |

All endpoints are currently unauthenticated. Include the Clerk Bearer token anyway
so no frontend changes are needed when the backend adds validation.

---

## CORS

The backend currently allows `http://localhost:5173` by default (set via `ALLOWED_ORIGINS`
env var). Add your frontend's dev URL to the backend's `.env`:

```env
ALLOWED_ORIGINS=http://localhost:3000,https://anugamana.com
```

---

*Backend repo: anugamana-backend*
*Last updated: May 2026*
