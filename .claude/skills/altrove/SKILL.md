---
name: altrove
description: Use when working in the altrove repo (MatteoSchifano/altrove) — adding or editing chapters under src/content/chapters/, building Demo/Astro island components, or touching its native-CSS design tokens, Motion spring presets, or bilingual IT/EN content. Altrove is a personal Astro 6 + MDX laboratory on UX, motion design and typography, deliberately library-free.
---

# Altrove

## What it is

**Altrove** is a personal, chapter-based laboratory on **UX, motion design and typography** (`github.com/MatteoSchifano/altrove`). Each chapter is a finished study — a pattern, a family of components, a question with an articulated answer — written in MDX with real interactive Demos inside, annotated with the *why* behind every choice.

**It is NOT** a design system to ship, a framework, a starter kit, or a collection of universal best practices. It is built **to understand**, not to impress. Keep this in mind: here, polish and craft beat speed and feature count.

**Founding principle:** the best UX is invisible. It works silently while the user's mind is *elsewhere* (*altrove*). Instant skeletons, buttons that respond before the network, images that already have shape — acts of respect for the user's time and attention.

## The 5 working principles (non-negotiable)

1. **One chapter at a time, finished 100% before the next.** Never leave half-done implementations.
2. **Write the rationale before the code.** For each interaction, articulate *why* before implementing. The `slot="note"` notes inside each Demo are part of the product, not a comment.
3. **`prefers-reduced-motion` is not optional.** Every animation has a dignified static fallback. It is part of the design, not a layer added afterward.
4. **Resist libraries.** No Tailwind, shadcn, Radix. The gym is native CSS: `@layer`, `clamp()`, custom properties, container queries, OKLCH, `light-dark()`. The only runtime dependency for motion is `motion` (motion.dev), used in vanilla JS.
5. **Motion is measured in milliseconds, not by feel.** Four spring presets and five named easing curves. **Never** invent an inline `cubic-bezier` or an inline spring.

## Stack

| Technology | Role |
|---|---|
| **Astro 6** | Content Collections for chapters, native View Transitions, Islands for interactions |
| **Native CSS** | `@layer base/components/utilities`, OKLCH, `light-dark()`, `clamp()`, container queries — no CSS framework |
| **Motion** (motion.dev) | Spring physics and gestures in vanilla JS, via the `src/lib/motion.ts` wrapper |
| **MDX** | Chapters are editorial documents with components inside |
| **Geist Variable** | Variable Sans + Mono |

Node ≥ 22.12 · dev on `http://localhost:4321` · `npm run dev` / `build` / `preview`.

## Project map

```
src/
├── content/chapters/{it,en}/<slug>.mdx   # the chapters, mirrored per language
├── content.config.ts                     # Zod schema for a chapter
├── components/
│   ├── Demo.astro                        # editorial wrapper (stage + note)
│   ├── ChapterCard.astro                 # the "magnetic" card on the home
│   └── <theme>/                          # demos per chapter (buttons/, waiting/, dialog/, …)
├── layouts/{Base,Chapter,HomePage}.astro
├── lib/{motion,i18n,readingTime,roadmap}.ts
├── pages/                                # index.astro (IT) + en/ mirror + rss
└── styles/{tokens,reset,typography,global}.css
```

## Quick reference

**Spring presets** (never inline — import from `lib/motion.ts`): `subtle` (micro-feedback), `gentle` (default), `snappy` (UI controls), `expressive` (micro-celebration).

**CSS easing curves** (tokens, never a custom bezier): `--ease-out-soft` (default), `--ease-out-snug`, `--ease-out-snappy`, `--ease-in-out`, `--ease-in`.

**Durations:** `--dur-instant` 100ms · `--dur-fast` 180ms · `--dur-normal` 280ms · `--dur-slow` 480ms · `--dur-slower` 720ms (all collapse to 1ms under `prefers-reduced-motion`).

For the full token catalog (OKLCH colors, type scale, spacing, radii, shadows, layout) → read `design-tokens.md`.
For the motion system (presets, magnetic/lift helpers, `data-motion`, reduced-motion) → read `motion.md`.
For adding a chapter or a Demo component (schema, bilingual, template) → read `authoring-chapters.md`.

## Bilingual (IT default, EN mirror)

- Italian is the **canonical language** (`DEFAULT_LOCALE = 'it'`), served at the root; English lives under `/en/`.
- Every chapter exists in **both** languages with the same structure and the same number of Demos, tied by the same `translationKey`.
- UI strings live in `lib/i18n.ts` (dotted keys, typed — adding one forces you to add it to every locale). *Content* translations live in the MDX files, not in `i18n.ts`.
- RSS: `/rss.xml` and `/en/rss.xml`.

## Common mistakes to avoid

| Mistake | Correct |
|---|---|
| Magic values (`#hex`, `0.5rem`, `cubic-bezier(...)`) | Use tokens: `var(--accent)`, `var(--space-2xs)`, `var(--ease-out-soft)` |
| Inline spring in JS | Import a preset from `lib/motion.ts`; if you need a new feel, add a preset there with a rationale |
| Animation without a reduced-motion fallback | `prefersReducedMotion()` guard in JS / duration token that collapses to 1ms in CSS |
| Adding Tailwind or a UI lib | Forbidden. Write native CSS inside `@layer` |
| Chapter only in IT (or only EN) | Always mirror in the other language, same `translationKey` |
| Spinner inside the button as the default for async | Prefer the morph (the button *becomes* the action) — see chapter 01 |
| Accent color everywhere | The accent is "the brand's voice"; use it sparingly |
