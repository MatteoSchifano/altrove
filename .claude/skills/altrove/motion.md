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
