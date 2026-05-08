# Anugamana — Design System

> Reference guide for colours, typography, spacing, components, and motion.
> The intent behind every decision is documented so future additions feel native, not bolted on.

---

## Design Philosophy

The app sits at the intersection of **ancient spiritual text** and **modern AI product**. The design should feel like both at once — warm, considered, and unhurried, but also clean and trustworthy.

The primary emotional register is **contemplative**. Nothing should feel urgent, aggressive, or corporate. Gradients are soft. Shadows are light. Text is given room to breathe.

The orange/indigo pairing is deliberate:
- **Orange** = warmth, fire, saffron — the colour of the tradition itself
- **Indigo/purple** = depth, the mystical, the inner world — used for AI guidance and philosophical content

These two colours should never compete. Orange owns the UI chrome (nav, buttons, borders, inputs). Indigo owns the interpretive layer (AI guidance panels, quote sections, special moments).

---

## Colour Palette

All colours are defined in OKLCH in `src/styles/globals.css` under `@theme`.

### Orange — Primary Brand

| Token | OKLCH | Usage |
|-------|-------|-------|
| `orange-50` | `oklch(.98 .016 73.684)` | Page background, hero gradient start |
| `orange-100` | `oklch(.954 .038 75.164)` | Section backgrounds, header gradient |
| `orange-200` | `oklch(.901 .076 70.697)` | Card borders, dividers, icon backgrounds |
| `orange-300` | `oklch(.837 .128 66.29)` | Input borders, hover states, divider lines |
| `orange-400` | `oklch(.75 .183 55.934)` | Divider dot accent |
| `orange-600` | `oklch(.646 .222 41.116)` | Primary button fill, CTA gradient start |
| `orange-700` | `oklch(.553 .195 38.402)` | Primary button hover, gradient end, body text |
| `orange-800` | `oklch(.47 .157 37.304)` | Transliteration text, sub-labels |
| `orange-900` | `oklch(.408 .123 38.172)` | Brand name, strong headings |
| `orange-950` | `oklch(.266 .079 36.259)` | Darkest text, verse headings, page body colour |

### Indigo — Interpretive / AI Layer

| Token | OKLCH | Usage |
|-------|-------|-------|
| `indigo-50` | `oklch(.962 .018 272.314)` | Guidance panel background |
| `indigo-200` | `oklch(.87 .065 274.039)` | Guidance panel border, dividers |
| `indigo-300` | `oklch(.785 .115 274.713)` | Hover borders |
| `indigo-600` | `oklch(.511 .262 276.966)` | Sparkles icon, guidance heading |
| `indigo-700` | `oklch(.457 .24 277.023)` | Guidance body text |
| `indigo-800` | `oklch(.398 .195 277.366)` | Translated guidance text |
| `indigo-900` | `oklch(.359 .144 278.697)` | Deep guidance headings |
| `indigo-950` | `oklch(.257 .09 281.288)` | Dark section text, guidance card text |

### Semantic / Supporting

| Colour | Usage |
|--------|-------|
| `white` | Card fills, input backgrounds, badge backgrounds |
| `gray-50 / gray-200` | "Coming soon" / muted / disabled states |
| `gray-500 / gray-600` | Secondary body copy on white cards |
| `blue-100 / blue-200 / blue-600` | Sarvam AI badge only |
| `red-50 / red-200 / red-800` | Network error state |
| `indigo-950 → purple-950 → indigo-900` | Dark quote section gradient |

### Body Background

```css
body {
  background: linear-gradient(to bottom, orange-50, orange-100);
}
```

The page is never flat white — it always has a faint warm tint.

---

## Typography

### Fonts

| Role | Font | Class |
|------|------|-------|
| UI / everything | System sans-serif (Tailwind default) | _(default)_ |
| Sanskrit / Devanagari text | Noto Serif Devanagari | `font-serif` |

Noto Serif Devanagari is loaded from Google Fonts at weights 400, 500, 600. It is used **only** for Devanagari script text and transliteration — never for UI copy.

### Type Scale

| Role | Classes | Where |
|------|---------|-------|
| Hero display | `text-5xl md:text-7xl font-light tracking-tight leading-[1.1]` | LandingPage hero headline |
| Section heading | `text-3xl md:text-4xl font-light` | Section h2 titles |
| About / page heading | `text-4xl font-light` | AboutPage hero |
| Card heading | `text-xl font-semibold` | ResultCard verse heading |
| Feature card title | `text-sm font-semibold` | Feature grid cards |
| Body copy (large) | `text-lg leading-relaxed` | Hero sub-text, translation text |
| Body copy (default) | `text-sm leading-relaxed` | Card body, how-it-works steps |
| Body copy (small) | `text-xs leading-relaxed` | Feature card body, meta labels |
| Devanagari verse | `text-xl md:text-2xl font-serif whitespace-pre-line` | DevanagariBlock |
| Transliteration | `text-base md:text-lg font-serif italic` | SanskritBlock |
| Label / eyebrow | `text-xs font-medium uppercase tracking-wide` | Section sub-labels, stat labels |
| Footer / caption | `text-xs` | Footer, attribution |

### Type Colour Rules

- **Headings on light backgrounds** → `text-orange-950`
- **Subtext / descriptive copy on light backgrounds** → `text-orange-800` or `text-gray-500`
- **Labels, meta, secondary** → `text-orange-700` or `text-orange-600`
- **Body copy on white cards** → `text-gray-500` or `text-gray-600`
- **Guidance / AI content** → `text-indigo-950` (headings), `text-indigo-800` (body)
- **Text on dark sections** → `text-white/90` (primary), `text-indigo-200` (secondary), `text-indigo-400` (tertiary)

---

## Spacing & Layout

### Container

```
container mx-auto px-4
```

Max-width varies by content density:

| Context | Max-width |
|---------|-----------|
| Hero / search panel | `max-w-3xl` |
| Results / verse cards | `max-w-4xl` |
| Features grid / pipeline | `max-w-5xl` |
| About page | `max-w-3xl` |
| CTA / quote sections | `max-w-2xl` or `max-w-lg` |

### Section Padding

- Standard sections: `py-20` (80px)
- Generous/hero sections: `py-24` (96px)
- Compact inner sections: `py-12`

### Card Padding

- Full result cards: `p-6`
- Feature / trust cards: `p-5`
- Small badges / pills: `px-2.5 py-1` or `px-4 py-2`

### Grid Gaps

- Feature card grid: `gap-4`
- Result card stack: `space-y-6`
- How-it-works 3-col: `gap-10`
- Trust / pipeline 3-col: `gap-6`

---

## Component Patterns

### Buttons

**Primary CTA (gradient pill)**
```
px-8 py-3.5
bg-linear-to-r from-orange-600 to-orange-700
hover:from-orange-700 hover:to-orange-800
text-white rounded-full font-medium
shadow-lg hover:shadow-xl transition-all
```

**Secondary (outlined pill)**
```
px-5 py-2.5
bg-white border-2 border-orange-300
text-orange-700 rounded-full
hover:bg-orange-50 transition-all font-medium text-sm
```

**Ghost / nav link**
```
text-sm text-orange-700 hover:text-orange-900 transition-colors
```

**Header CTA (Join waitlist)**
```
px-4 py-1.5
bg-orange-600 hover:bg-orange-700
text-white text-sm font-medium rounded-full
transition-colors shadow-sm
```

### Cards

**Content card (white)**
```
bg-white rounded-2xl shadow-xl border border-orange-100 p-6
```

**Feature card (orange tint)**
```
bg-orange-50 border border-orange-200 rounded-2xl p-5
hover:shadow-md transition-shadow
```

**Feature card (indigo tint)**
```
bg-indigo-50 border border-indigo-200 rounded-2xl p-5
hover:shadow-md transition-shadow
```

**AI Guidance panel**
```
bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50
rounded-2xl shadow-xl border-2 border-indigo-200 p-6
relative overflow-hidden
```
— includes a decorative blur blob: `absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-2xl -mr-16 -mt-16`

**Muted / coming-soon card**
```
bg-gray-50/80 border border-gray-200 rounded-2xl p-5
opacity-75 (applied via CSS, not Tailwind directly)
```

### Badges & Pills

**Score pill**
```
px-2.5 py-1 bg-orange-100 border border-orange-300
rounded-full text-xs font-medium text-orange-800
```

**Language badge**
```
px-2.5 py-1 bg-indigo-100 border border-indigo-300
rounded-full text-xs font-medium text-indigo-800
```

**"Soon" badge**
```
px-2 py-0.5 bg-gray-200 text-gray-500
rounded-full text-[9px] font-bold uppercase tracking-widest
```

**Sarvam AI badge**
```
px-2 py-1 bg-white rounded-full border border-gray-200
```
Contains `<img src="/sarvam-wordmark.png" className="h-2.5 w-auto" />`

**Pipeline timing pills**
```
px-2 py-0.5 bg-orange-100 rounded-full text-xs text-orange-700
```

**Guardrail / soft error banner**
```
bg-indigo-50 border border-indigo-200 text-indigo-800
p-4 rounded-xl
```

**Hard error banner**
```
bg-red-50 border border-red-200 text-red-800
p-4 rounded-xl
```

### Inputs

**Textarea (search)**
```
w-full h-40 px-6 py-4 rounded-2xl
border-2 border-orange-200 focus:border-orange-400 focus:outline-none
resize-none text-lg
bg-white/80 backdrop-blur-sm
disabled:bg-gray-100 disabled:text-gray-500
transition-all placeholder:transition-opacity placeholder:duration-500
```

**Select (chapter filter / language)**
```
px-4 py-2 rounded-lg
bg-white/50 border border-orange-200
text-orange-900 text-sm
focus:outline-none focus:border-orange-400
cursor-pointer hover:bg-white/80 transition-colors
```

### Section Divider

Used between content blocks within a card:
```jsx
<div className="flex items-center gap-3">
  <div className="flex-1 h-px bg-linear-to-r from-transparent via-orange-300 to-transparent" />
  <div className="w-2 h-2 rounded-full bg-orange-400" />
  <div className="flex-1 h-px bg-linear-to-r from-transparent via-orange-300 to-transparent" />
</div>
```

### Header

Sticky, `z-50`, `bg-white/50 backdrop-blur-sm`, `border-b border-orange-200`.

---

## Decorative Patterns

### Background Blobs

Used in hero sections and dark sections. Absolutely positioned, `pointer-events-none`:

```jsx
<div className="absolute top-0 right-0 w-[500px] h-[500px]
  bg-orange-200/25 rounded-full blur-3xl
  -mr-48 -mt-48 pointer-events-none" />
```

Typically 2–3 blobs per hero: one top-right (larger), one bottom-left (smaller, slightly different hue).

### Hero Gradient Background

```
bg-linear-to-br from-orange-50 via-amber-50 to-orange-100
```

### Dark Quote / Feature Section

```
bg-linear-to-br from-indigo-950 via-purple-950 to-indigo-900
```
This is the only fully dark surface in the app. Text colours invert — see type colour rules above.

### Feature Icon Container

Small icon accent block used at the top of feature cards:
```
w-9 h-9 rounded-xl flex items-center justify-center
bg-orange-200 text-orange-700   (orange variant)
bg-indigo-200 text-indigo-700   (indigo variant)
bg-gray-200 text-gray-400       (muted / coming-soon)
```
Icon inside is `w-4 h-4`.

---

## Motion & Animation

All animation uses the `motion` library (`motion/react`).

### Page Entrance

Every page and major section enters with:
```js
initial={{ opacity: 0, y: 20 }}   // or y: 24 for hero
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}    // hero: 0.6–0.7
```

Staggered children (hero badge → headline → search → stats) use `delay`:
- Badge / eyebrow: `delay: 0`
- Headline: `delay: 0`
- Search panel: `delay: 0.18`
- Auth nudge / stats: `delay: 0.35–0.5`

### Scroll-triggered Sections

For below-the-fold content:
```js
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: '-60px' }}
transition={{ duration: 0.5 }}
```

For feature cards (staggered grid):
```js
transition={{ duration: 0.4 }}   // no delay; cards fire as they enter viewport
```

For pipeline boxes (subtle stagger):
```js
transition={{ duration: 0.3, delay: i * 0.07 }}
```

For example situation chips:
```js
transition={{ duration: 0.3, delay: i * 0.05 }}
```

### Feedback / Expand Panels

```js
initial={{ opacity: 0, height: 0 }}
animate={{ opacity: 1, height: 'auto' }}
exit={{ opacity: 0, height: 0 }}
transition={{ duration: 0.3 }}
```

### Loading Text Transitions

Progressive messages (`LoadingState`) fade in with:
```js
key={index}   // key change triggers re-animation
initial={{ opacity: 0, y: 5 }}
animate={{ opacity: 1, y: 0 }}
```

---

## Section Archetypes

### Light Hero (orange gradient)
- Background: `bg-linear-to-br from-orange-50 via-amber-50 to-orange-100 border-b border-orange-200`
- 2–3 decorative blobs
- Max-width `max-w-3xl`, `py-16 md:py-28`, `text-center`
- Headline `font-light` + italic `font-semibold` accent word

### White Content Section (features, how-it-works, trust)
- Background: `bg-white border-y border-orange-100`
- `py-20 md:py-24`
- Section title: `text-3xl font-light text-orange-950` centred, with optional `text-sm text-orange-700` sub-label

### Transparent Content Section (on body gradient)
- No explicit background — inherits the `body` orange-50 → orange-100 gradient
- Used for: example situations, how-it-works (first version), final CTA

### Dark Quote Section
- Background: `bg-linear-to-br from-indigo-950 via-purple-950 to-indigo-900`
- `py-24`, `text-center`, `max-w-2xl`
- Only place in the app where text is white

### Footer
- `border-t border-orange-200 bg-orange-50/50`
- `py-8`, flex row on desktop / column on mobile
- `text-xs text-orange-600`

---

## Dos and Don'ts

**Do**
- Keep orange for all interactive UI (buttons, links, borders, focus rings)
- Keep indigo exclusively for AI-generated content and philosophical depth
- Use `font-light` for display headlines — it reads as contemplative, not weak
- Use `rounded-2xl` for cards, `rounded-full` for buttons and pills consistently
- Let sections breathe — `py-20` minimum, never cram content
- Use `whileInView` with `once: true` for all scroll-triggered animations so they don't re-fire
- Use `backdrop-blur-sm` on the header and any overlapping UI to reinforce depth

**Don't**
- Don't use blue for anything except the Sarvam AI badge
- Don't use red except for hard network errors
- Don't use `font-bold` in headings — `font-semibold` is the ceiling for display text
- Don't use `font-serif` (Noto Serif Devanagari) for English copy — it's reserved for Sanskrit only
- Don't add drop shadows heavier than `shadow-xl` — the design reads light and airy
- Don't put technical copy (model names, pipeline terms, metric names) in user-facing surfaces
- Don't introduce new accent colours without a clear semantic reason
- Don't animate things that don't need it — motion is used for entrance and feedback, not decoration

---

## Assets

| File | Usage |
|------|-------|
| `/public/sarvam-wordmark.png` | Sarvam AI attribution badge in coming-soon feature cards |
| `/public/sarvam-icon.jpeg` | Sarvam mandala icon — available for future use (loading states, partner section) |

Both assets are dark on white and work on light backgrounds. For dark backgrounds, CSS `filter: invert(1) brightness(2)` would be needed.
