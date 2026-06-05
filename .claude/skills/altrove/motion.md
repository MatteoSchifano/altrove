# Altrove · Motion as a craft

Motion is measured in **milliseconds with a rationale**, never "by feel". A handful of named curves and durations, used consistently, beat curves invented in the moment.

## The laws

1. **Things leave faster than they enter.** Entrance ≈ **220ms**, exit ≈ **160ms**. This is physical coherence — an object settling vs. an object getting out of the way. Follow it everywhere.
2. **Animate once; never re-animate.** Animate an element when it first appears, then leave it alone. *"Le pagine che ri-animano sembrano nervose; quelle che animano una volta sembrano abitate."* Use `IntersectionObserver` + `unobserve`, not a re-firing trigger.
3. **Out, never in-out, for arrivals.** Entrances and count-ups start fast and arrive calm (`ease-out`). In-out reads as mechanical for something that should feel like it's settling.
4. **Stagger is meaning.** ~40–90ms between items reads as "these arrived together"; longer reads as a **celebration**. Pick the length on purpose.
5. **Reveal the new, not the seen.** When data updates, stagger only the *new* items — re-animating already-seen content is nervousness.

## The four "feels" (a reusable taxonomy)

Name your motion by intent, not by raw spring numbers. One stable feel per intent:

| Feel | Use for | Character |
|---|---|---|
| **subtle** | micro-feedback (hover, press) | almost no overshoot |
| **gentle** | the default for most transitions | natural, calm |
| **snappy** | UI controls that act | snaps, then settles |
| **expressive** | micro-celebrations | slight, earned overshoot |

Concrete spring values that embody these (tune to taste, but keep them named and few — don't build a spring inline per component):
`subtle` stiffness 220 / damping 28 · `gentle` 170 / 22 · `snappy` 380 / 28 · `expressive` 260 / 18.

## Easing & duration vocabulary

Name your curves; never scatter `cubic-bezier(...)` literals across components.

```
out-soft    cubic-bezier(0.22, 1, 0.36, 1)     default for every transition
out-snug    cubic-bezier(0.34, 1.06, 0.64, 1)  slight overshoot
out-snappy  cubic-bezier(0.16, 1.3, 0.4, 1)    decisive overshoot
in-out      cubic-bezier(0.65, 0, 0.35, 1)     symmetric
in          cubic-bezier(0.55, 0, 1, 0.45)     exit / off-screen
```

Durations: instant 100ms · fast 180ms · normal 280ms · slow 480ms · slower 720ms.

## `prefers-reduced-motion` is binary

Not a "softer" or "slower" version — **off**. The discipline:

- Deliver **the same final state without the journey**. Reducing motion never hides state or removes the end result; it removes the *path* to it.
- In practice, collapse animation durations to **1ms** (where a non-zero value is structurally required) or skip the tween entirely. *"Non si rallenta un'animazione, la si toglie."*
- Overlays, dialogs, reveals must all still work and reach their resolved state.
- For JS-driven effects, guard at the top and bail to the static fallback:

```js
const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;
if (reduce) return; // static, dignified fallback — same end state, no motion
```

## CSS vs JS

- **Simple states** (hover, press, focus, enter/leave on 1–2 properties) → CSS transition with a named curve + duration. Lighter, no JS.
- **Physics, gestures, cursor/scroll-linked values, sequences** → a real animation engine (spring physics). Prefer `animation-timeline: scroll()` for scroll-linked work — it runs on the compositor with zero JS.
- Either way, the reduced-motion fallback is mandatory, and every effect cleans up its listeners on teardown (View Transitions and SPAs recreate the DOM).

## A few more, learned across the later chapters

- **An indicator slides, it does not acrobat.** A position indicator (tab underline, segmented pill, range thumb) moves to its new place and **stops** — no bounce, no overshoot. It's reporting a position, not celebrating. Re-wrapping text and re-laying-out content don't animate at all — a layout that tweens between two arrangements reads as a *jerk*, not a transition.
- **FLIP for reflow.** When items reorder (drag list, kanban, a flowing tab underline): measure **F**irst, apply the **L**ast layout, **I**nvert with a transform, then **P**lay it to zero. It runs on `transform` (compositor) and is the honest way to animate a layout change. Guard it with `matchMedia('(prefers-reduced-motion: reduce)')` — under reduced motion the item just appears in its new place.
- **Visual haptics = squash, tiny and earned.** A switch arriving in its detent can squash for an instant (the *expressive* feel) to sell the physical "clack". Keep it minuscule — the 0.97-not-0.95 rule. It is pure decoration, so under reduced motion it's **gone**, and the element is simply in its final position.
- **The one reduced-motion exception: functional progress.** Reduced motion removes *decorative* motion, never *state*. A hold-to-confirm ring, an undo countdown bar, a session-expiry timer — these are **information about how much is left**, so they keep running under `prefers-reduced-motion`. The test: if the moving thing answers "how far along am I?", it stays; if it answers "look at me", it goes.
- **Gestures follow the finger 1:1, then settle with a named curve.** During a swipe/drag the element tracks the pointer exactly (no easing — easing on a direct-manipulation gesture feels broken); only the *release* (snap-back or commit) uses a curve, ~220ms in / ~160ms out.
