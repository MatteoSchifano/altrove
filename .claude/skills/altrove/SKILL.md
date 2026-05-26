---
name: altrove
description: Use when designing, building, or reviewing UI interactions and micro-interactions — buttons, loading/skeleton/optimistic states, empty/error/zero states, dialogs and confirmations, forms and inputs, scroll-driven effects, or displaying numbers — and you want an opinionated, honesty-first take — motion timed in named milliseconds, accessible by default, prefers-reduced-motion respected, dark patterns named and avoided, sample data that tells the truth. Distilled, restrained UX and motion-design principles.
---

# Altrove · UX principles

A distilled, opinionated body of UX and motion-design principles. Apply them when designing or critiquing any interface — the framework, language or repo is irrelevant. They come from a chapter-by-chapter study of what makes an interface *quietly* good.

## The founding principle: invisible UX

> *"Tutto quello che succede senza che l'utente se ne accorga è la vera potenza della UX."*
> Everything that happens without the user noticing is the real power of UX.

The best interface works in silence while the user's mind is **elsewhere** (*altrove*). Craft is felt only in the negative — *"si nota l'assenza dell'attrito"* (you notice the absence of friction). An instant skeleton, a button that answers before the network, an image that already has shape — acts of respect for the user's time and attention. The interface *"lavora in silenzio, e disturba solo quando vale"* (works silently, and interrupts only when it's worth it).

## The 9 meta-principles

1. **Honesty over effect.** When forced to choose, tell the truth rather than impress. *"Se è 84%, è 84%, non 99 per fare scena"* — even sample animations must not lie. A dashboard *"non celebra, riferisce"* (doesn't celebrate, reports). → `honesty.md`
2. **`prefers-reduced-motion` is binary, not a "soft" version.** Don't slow the animation — remove it. Deliver **the same final state without the journey**. Reducing motion never hides state. → `motion.md`
3. **Animate once; never re-animate.** Reveal new items, leave seen ones alone. *"Le pagine che ri-animano sembrano nervose; quelle che animano una volta sembrano abitate."*
4. **Things leave faster than they enter.** Entrance ≈ 220ms, exit ≈ 160ms — physical coherence. Motion is measured in **precise milliseconds with a rationale**, never "by feel". → `motion.md`
5. **Digits must not flinch.** Use `tabular-nums` wherever a number changes or is compared in a column — *"così quando passa da 9 a 10 non sussulta"*. A jumping column is noise. → `patterns.md`
6. **Native platform beats libraries.** `<dialog>`, Popover API, CSS Anchor Positioning, `:user-invalid`, `:autofill`, `field-sizing: content`, `animation-timeline: scroll()`, `Intl.NumberFormat`, `autocomplete` tokens. Known well, native HTML does almost everything.
7. **Rationale before code.** Articulate *why* an interaction exists before building it. If you can't explain it, you haven't understood it yet.
8. **Accessibility is not negotiable.** Color is never the only channel (sign + arrow + color, in that order). Keep the constant ARIA pairing: `assertive`/`role=alert` for the headline, `polite`/`role=status` for details — *"la differenza fra urlare e spiegare"*. Every gesture stays reachable by keyboard and screen reader.
9. **Restraint with attention.** Attention is dosed, never an orchestra. The accent color is the brand's voice — use it sparingly. The real button emerges *"ma non grida"* (without shouting).

## Quick reference (the recurring numbers)

| Rule | Value | Why |
|---|---|---|
| Button press scale | **0.97** (not 0.95) | 0.97 feels "pressed", 0.95 feels "broken" |
| Don't show a loader below | **400ms** ("soglia di pudore") | A spinner for 200ms is *"cattiveria gratuita"* |
| Optimistic rollback | **~500ms** | <200ms = unreadable, >1s = looks broken |
| Dialog enter / exit | **220ms / 160ms** | Things leave faster than they enter |
| Confirm / inline-confirm auto-cancel | **4s / 5s** | A window of intent, not a modal menu |
| Reveal stagger | **40–90ms** | Longer reads as "celebration" |
| Count-up | **900ms, ease-out** | Out, never in-out: start fast, arrive calm |
| Reduced-motion durations | **→ 1ms** | Same final state, no journey |

## Where to look

- **`patterns.md`** — concrete, per-interaction heuristics: buttons, waiting/loading, empty & error states, dialogs & confirmations, scroll, numbers, inputs.
- **`motion.md`** — motion as a craft: the timing laws, the four "feels", easing, and reduced-motion done right.
- **`honesty.md`** — the honest-vs-deceptive throughline: a catalogue of patterns that respect the user vs dark patterns that lie.
