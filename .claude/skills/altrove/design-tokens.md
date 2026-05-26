# Altrove · Design tokens

The DNA of the design system lives in `src/styles/tokens.css`, exposed as custom properties on `:root`. **Golden rule: no magic values in component CSS.** Always use a token. If one is missing, add it to `tokens.css` with a rationale — don't hardcode in the component.

Base conventions:
- Colors in **OKLCH** (perceptually uniform); everything gravitates around a **warm hue** (`--hue-warm: 40`); the accent is a coral-orange (`--hue-accent: 22`).
- Theming via `light-dark()`; manual override with `:root[data-theme='light'|'dark']`.
- `color-scheme: light dark` on `:root`.

## Color

```
/* Surfaces */
--bg              page background
--surface         standard surface
--surface-raised  raised surface (card, popover)
--surface-sunken  sunken surface (the Demo stage)
--surface-overlay semi-transparent overlay (88% alpha)

/* Ink (text), strongest to faintest */
--ink-strong  --ink  --ink-muted  --ink-subtle

/* Borders */
--border  --border-strong

/* Accent — the brand's voice, use sparingly */
--accent      full accent color
--accent-ink  accent-tinted text on light background
--accent-soft faint accent background
--accent-on   text/icon on top of a solid accent surface
```

For one-off blends use `color-mix(in oklab, var(--accent) 22%, transparent)` (see component halos) instead of defining a new color.

## Typography

Fonts: `--font-sans` (Geist Variable), `--font-mono` (Geist Mono Variable), `--font-display` (= sans).

Fluid scale `clamp(min, ideal, max)`, 16px base, ~1.2 ratio:
```
--text-2xs  --text-xs  --text-sm  --text-base  --text-md
--text-lg   --text-xl  --text-2xl --text-3xl   --text-display
```

Line-height: `--leading-tight` 1.08 · `--leading-snug` 1.22 · `--leading-normal` 1.5 · `--leading-relaxed` 1.65 · `--leading-loose` 1.85.

Tracking: `--tracking-tighter` · `--tracking-tight` · `--tracking-snug` · `--tracking-normal` · `--tracking-wide` · `--tracking-wider`.

Weights (Geist 100–900): `--weight-light` 300 · `--weight-regular` 400 · `--weight-medium` 500 · `--weight-semibold` 600 · `--weight-bold` 700.

## Spacing & rhythm

4px base scale: `--space-3xs` (0.25rem) → `--space-2xs --space-xs --space-sm --space-md --space-lg --space-xl --space-2xl --space-3xl` → `--space-4xl` (10rem).

Fluid vertical rhythm (the breathing of the page): `--rhythm-tight` · `--rhythm` · `--rhythm-loose`.

Line length (measure): `--measure-tight` 32ch · `--measure` 62ch · `--measure-loose` 78ch.

## Radii

`--radius-xs` 0.25rem · `--radius-sm` 0.5rem · `--radius-md` 0.75rem · `--radius-lg` 1.125rem · `--radius-xl` 1.5rem · `--radius-2xl` 2rem · `--radius-pill` 999px.

## Shadows (soft & tactile)

`--shadow-xs --shadow-sm --shadow-md --shadow-lg --shadow-xl` (darker but less opaque in dark mode), plus:
- `--shadow-pressed` — inset, for the pressed state.
- `--halo-accent` — accent ring for hover.
- `--halo-focus` — ring for visible focus.

## Motion (CSS side)

Named curves — **use only these, never an inline bezier**:
```
--ease-out-soft    cubic-bezier(0.22, 1, 0.36, 1)     default for every transition
--ease-out-snug    cubic-bezier(0.34, 1.06, 0.64, 1)  slight overshoot
--ease-out-snappy  cubic-bezier(0.16, 1.3, 0.4, 1)    decisive overshoot
--ease-in-out      cubic-bezier(0.65, 0, 0.35, 1)     symmetric
--ease-in          cubic-bezier(0.55, 0, 1, 0.45)     exit
```

Durations: `--dur-instant` 100ms · `--dur-fast` 180ms · `--dur-normal` 280ms · `--dur-slow` 480ms · `--dur-slower` 720ms.
Under `@media (prefers-reduced-motion: reduce)` **all** durations collapse to 1ms (already handled in `tokens.css`).

The springs for the Motion library (JS) are also exposed as a string in `--spring-*` for documentation, but in practice you import them from `lib/motion.ts` (see `motion.md`).

## Layout

`--max-content` 68rem · `--max-prose` 36rem · `--max-narrow` 28rem · `--gutter` clamp(1.25rem, 4vw, 2.5rem).

z-index: `--z-base` 0 · `--z-raised` 10 · `--z-overlay` 100 · `--z-modal` 1000 · `--z-toast` 2000.

## global.css — the layers

`global.css` organizes rules into `@layer base / components / utilities`. Add rules in the right layer; don't write CSS outside the layers, to avoid specificity wars.
