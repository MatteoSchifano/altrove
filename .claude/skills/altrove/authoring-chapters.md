# Altrove · Authoring chapters & components

A chapter is the unit of work. It is a finished study: a central question, a sequence of real interactive Demos, and UX notes explaining the *why*. This file is the recipe for adding one.

## Chapter file layout

```
src/content/chapters/it/<slug-it>.mdx     # canonical (Italian)
src/content/chapters/en/<slug-en>.mdx     # mirror (English)
src/components/<theme>/<Component>.astro   # the chapter's Demo components
```

The slug can be localized (e.g. `01-anatomia-di-un-bottone` vs `01-anatomy-of-a-button`). The two language versions are tied **not** by filename but by a shared `translationKey`.

## Frontmatter schema (`content.config.ts`)

```yaml
---
lang: "it"                    # 'it' | 'en' — MUST match the subdir
translationKey: "chapter-01"  # stable id shared across translations
number: "01"                  # string, zero-padded
title: "Anatomia di un bottone"
excerpt: "One or two sentences that frame the central question."
date: "maggio 2026"           # optional, human-readable
readMinutes: 7                # optional int > 0 (usually computed via lib/readingTime.ts)
tags: ["interazione", "motion", "fondamenta"]   # optional, defaults to []
draft: false                  # optional, defaults to false — draft chapters are NOT listed in production
---
```

Rules:
- `lang` must equal the subdirectory it sits in.
- Both language versions share the **same** `translationKey` and the **same** `number`.
- Keep the **same number of Demos** across both languages — the structure is mirrored, only the prose differs.

## Chapter body — the editorial rhythm

```
title + central question
  ↓
a series of interactive <Demo>s
  ↓
UX notes: the rationale behind each choice (inside slot="note")
  ↓
notes on the hard decisions
```

MDX skeleton:

```mdx
---
lang: "it"
translationKey: "chapter-NN"
number: "NN"
title: "…"
excerpt: "…"
tags: ["…"]
---

import Demo from '../../../components/Demo.astro';
import MyDemo from '../../../components/<theme>/MyDemo.astro';

Opening: pose the central question. Write the rationale before you write the code —
if you can't explain why, you haven't understood it yet.

## A section heading that is itself a question or claim

<Demo title="Short descriptive title" tag="NN.a">
  <MyDemo label="…" />
  <div slot="note">
    <p>Why this curve, this timing, this dosage. Name the exact tokens/presets used
    (e.g. <code>--ease-out-snappy</code> at 180&nbsp;ms, <code>spring.snappy</code>).</p>
    <p>What the alternative would feel like and why it's wrong (e.g. scale 0.97 feels
    "pressed", 0.95 feels "broken").</p>
  </div>
</Demo>
```

`Demo` props: `title` (required), `tag` (optional short corner label like `NN.a`). The default slot is the live "stage"; `slot="note"` is the UX rationale. Both are part of the product.

## Demo component pattern (Astro island)

Components live under `src/components/<theme>/`. Conventions:
- **Scoped `<style>`**, tokens only — no magic values (see `design-tokens.md`).
- Real, accessible markup: `<button type="button">`, ARIA where needed, keyboard support.
- Motion: prefer CSS transitions (`--ease-*` / `--dur-*`) for simple states; use `data-motion` attributes or import from `lib/motion.ts` for physics — never an inline spring or bezier (see `motion.md`).
- A leading comment block stating the **UX rationale** for the component.
- Reduced-motion: CSS durations already collapse to 1ms; JS effects must guard with `prefersReducedMotion()`.

Minimal skeleton:

```astro
---
/* MyDemo — one-line description.
   UX rationale: why this interaction exists and what it teaches. */
interface Props {
  label?: string;
}
const { label = 'Default' } = Astro.props;
---

<button type="button" class="my-demo" data-motion="lift" data-preset="subtle">
  {label}
</button>

<style>
  .my-demo {
    padding: var(--space-2xs) var(--space-md);
    border-radius: var(--radius-md);
    background-color: var(--surface-raised);
    color: var(--ink-strong);
    border: 1px solid var(--border-strong);
    box-shadow: var(--shadow-sm);
    transition: box-shadow var(--dur-fast) var(--ease-out-soft);
  }
  .my-demo:hover { box-shadow: var(--shadow-md); }
</style>
```

If the component needs JS beyond `data-motion`, add a `<script>` and re-init on `astro:page-load` (View Transitions recreate the DOM).

## Bilingual & i18n

- Italian is canonical (`DEFAULT_LOCALE = 'it'`); English is a faithful mirror.
- **Content** lives in the MDX files. **UI strings** (header, footer, card labels, roadmap) live in `src/lib/i18n.ts` with dotted, typed keys — adding a key forces you to add it to every locale.
- `localizedPath()` / `getLocaleFromPath()` / `getOtherLocales()` handle routing; IT at root, EN under `/en/`.

## Step-by-step: add a chapter

1. Pick the question and the theme. Confirm the next number against `CAPITOLI.md` (the long menu / roadmap) and `MISSION.md` (the manifesto).
2. **Write the rationale first** — sketch why each interaction matters before coding.
3. Build the Demo components under `src/components/<theme>/`, tokens-only, accessible, reduced-motion safe.
4. Write `src/content/chapters/it/<slug>.mdx` (canonical), then mirror it as `en/<slug>.mdx` with the same `translationKey`, `number`, and Demo count.
5. `npm run dev` (→ `http://localhost:4321`) and verify both languages, light/dark themes, and `prefers-reduced-motion` (DevTools → Rendering → Emulate CSS prefers-reduced-motion).
6. `npm run build` to confirm the Content Collection and RSS still build clean.
7. Update `CAPITOLI.md` status to ✅ published when the chapter is finished 100%. One chapter at a time — never start the next before this one is complete.
