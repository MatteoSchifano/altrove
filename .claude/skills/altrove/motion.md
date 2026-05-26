# Altrove · Motion system

Motion lives in `src/lib/motion.ts`, a minimal wrapper over `motion` (motion.dev). **Absolute rule: never build an inline spring.** Import a preset. If you need a new feel, add a preset to `motion.ts` with a rationale — don't invent it in the component.

## The 4 spring presets

```ts
import { spring } from '../lib/motion';

spring.subtle      // stiffness 220, damping 28, mass 0.8 — micro-feedback (hover, press), almost no overshoot
spring.gentle      // stiffness 170, damping 22, mass 0.9 — DEFAULT, natural and calm
spring.snappy      // stiffness 380, damping 28, mass 0.7 — UI controls that "snap" then settle
spring.expressive  // stiffness 260, damping 18, mass 0.8 — micro-celebration, slight overshoot
```

Type: `SpringName = 'subtle' | 'gentle' | 'snappy' | 'expressive'`.

## Reduced-motion guard (mandatory)

Every JS effect must bail out immediately if the user prefers reduced motion. `motion.ts` exposes the guard internally; the `magnetic`/`lift` helpers already respect it (they return a no-op cleanup). When you write a new effect, replicate the same pattern:

```ts
const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;

export function myEffect(el: HTMLElement): () => void {
  if (prefersReducedMotion()) return () => {};   // dignified static fallback
  // …animate(el, …, spring.gentle)…
  return () => { /* cleanup listeners */ };
}
```

Every helper **returns a cleanup function** — needed for teardown on View Transitions / unmount. Always honor it.

## Reusable helpers

### `magnetic(el, opts)`
The element moves toward the cursor when it enters the area, returns to zero on leave.
- `strength` (0–1): fraction of displacement toward the cursor. **Default `0.25`.** Components tune it: the home card uses `0.18`, the `MagneticButton` uses `0.4` (small element, must be felt immediately).
- `radius`: radius beyond which the effect cancels (default: bounding box).
- `preset`: spring (default `gentle`).
- Works well **only on isolated elements**. In a grid of magnetic elements the effect becomes noise.

### `lift(el, opts)`
Lifts the element on hover/focus.
- `distance`: Y translation in px (default `-4`).
- `scale`: scale on hover (default `1.012`).
- `preset`: spring (default `subtle`).
- Also binds `focus`/`blur`, not just pointer — keyboard accessibility for free.

## Auto-binding via `data-motion`

The idiomatic way to apply an effect from markup, without writing JS in the component:

```html
<button data-motion="magnetic" data-strength="0.4" data-preset="snappy">…</button>
<a data-motion="lift" data-distance="-6" data-scale="1.02">…</a>
```

`bindMotionAttributes(root?)` scans `[data-motion="magnetic"]` and `[data-motion="lift"]`, reads the `data-*` and wires up the helpers. Call it on load **and after every `astro:page-load`** (View Transitions recreate the DOM):

```ts
import { bindMotionAttributes } from '../lib/motion';

let cleanup = bindMotionAttributes();
document.addEventListener('astro:page-load', () => {
  cleanup?.();
  cleanup = bindMotionAttributes();
});
```

## When CSS, when JS

- **Simple states** (hover, press, focus, enter/leave on 1–2 properties) → CSS transition with `--ease-*` and `--dur-*`. Lighter, no JS.
- **Physics, gestures, values tied to cursor/scroll, sequences** → `motion` via the `motion.ts` helpers.
- In both cases: reduced-motion fallback is not optional.
