---
name: altrove
description: Use when designing, building, or reviewing UI interactions and micro-interactions — buttons, loading/skeleton/optimistic states, empty/error/zero states, dialogs and confirmations, forms and inputs, scroll-driven effects, displaying numbers, or micro-typography (smart punctuation, text-wrap balance, OpenType features, line measure, hyphenation) — and you want an opinionated, honesty-first take — motion timed in named milliseconds, accessible by default, prefers-reduced-motion respected, dark patterns named and avoided, sample data that tells the truth. Distilled, restrained UX and motion-design principles.
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
| Hold-to-confirm (guarded toggle) | **~700ms** | Deliberate physical intent for a consequential switch |
| Search debounce | **~250ms** | Wait for the fingers to pause, not per keystroke |
| Persistent undo window | **~10s** | Reversible action — friction *behind* it, not in front |
| Comfortable measure (line length) | **45–75ch** | Reading-comfort range, in `ch` not px |
| Back-to-top / reveal threshold | **~35% scroll** | A shortcut earns its place after enough scroll |
| Reduced-motion durations | **→ 1ms** | Same final state, no journey — *but functional progress/countdown bars stay* |

## Where to look

- **`patterns.md`** — concrete, per-interaction heuristics across the whole book: buttons, waiting/loading, empty & error states, dialogs & confirmations, scroll, numbers, inputs, micro-typography, **toggles, toasts, menus, tabs, cards, dividers, long-form reading, editorial grids, quotations, marginalia, indexing & navigation, editorial images, drag & drop, search, calendar & dates, timelines, gestures, and endings**.
- **`motion.md`** — motion as a craft: the timing laws, the four "feels", easing, FLIP for reflow, visual haptics, and reduced-motion done right (including the one exception — functional progress/countdown bars stay).
- **`honesty.md`** — the honest-vs-deceptive throughline: a catalogue of patterns that respect the user vs dark patterns that lie.

## The recurring cross-cutting laws

Across all 26 chapters, the same handful of disciplines reappear — when in doubt, fall back to these:

1. **Native platform first.** `<dialog>`, Popover API, CSS Anchor Positioning, `<input type=radio/checkbox>`, `role="switch"`, `subgrid`, `@container`, `animation-timeline: scroll()`, View Transitions, `Intl.*`, `inert`, `<details>`, `<time>`. Known well, the platform does almost everything — and gives you keyboard, focus, and ARIA for free.
2. **`appearance: none` on the clothing, never the semantics.** Restyle the native control; never rebuild it from a `<div>` and lose keyboard/focus/form/indeterminate.
3. **Colour is never the only channel.** Pair it with sign, icon, position, weight, or text — in that order.
4. **Every gesture/drag has a keyboard twin.** A gesture is an accelerator, not a gate; announce state changes via `aria-live`.
5. **`tabular-nums` wherever a number changes or is compared.** Digits must not flinch.
6. **A control answers to its *container's* width, not the window's** (`@container`) — a component may sit in a narrow column on a huge screen.
7. **Friction only where the consequence is real, and only in the dangerous direction.** Manufactured friction "to be safe" is a dark pattern.
8. **Don't fake freshness or completion.** No build-time `new Date()` for dynamic labels; no faked progress %; relative time keeps the absolute reachable; a time without its zone is a lie.
