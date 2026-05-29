# Altrove · Interaction patterns

Concrete, per-interaction heuristics. Numbers are deliberate — they carry a rationale, not a guess. Quoted Italian lines are the original, faithful formulations.

## Buttons — *a small physical contract between finger and screen*

A button feels tactile through three things, in order: a **credible surface** (a shadow that suggests lift — never flat, never floating), a **reaction to touch** (*"non un altro colore, ma meno spazio"* — not another color, but less space; it compresses), and an **honest return** (not instant = fake, not slow = broken).

- Press = **scale 0.97, not 0.95**. *"Il primo sembra premuto, il secondo rotto."* Animate `transform`/`box-shadow`, ~180ms.
- Async: prefer the button **becoming** the action over a spinner inside it. `idle → loading → done`; morph `inline-size` ~280ms; *trace* the check via `stroke-dasharray` rather than popping it in. (See `honesty.md`.)
- Magnetic pull (to draw attention to an isolated CTA): displacement ≈ **0.4** of cursor distance — more is sticky, less is imperceptible. The real trick is the **halo**, not the movement. Works only on isolated elements; a grid of magnetic buttons is noise.
- Tooltip that *grows* from the trigger (`transform-origin` at the edge, scale 0.6→1): hover with ~280ms delay, focus shows immediately; the real label lives in `aria-label`.

## Waiting — *treat waiting as a shape, not a void*

> *"Le interfacce migliori trattano l'attesa come una forma, non come un vuoto."*

- **Skeletons** mirror the shape of the content to come (round avatar, last line at ~60% width), shimmer via `background-position`. Below **400ms don't show one at all**; under ~100ms it's just a flash — worse than nothing.
- **Optimistic UI** trusts the network (it almost always says yes). Commit instantly; on failure roll back in **~500ms** with a desaturated shake, no alert. <200ms rollback is unreadable; >1s looks like a broken machine.
- **Spinner shame**: a spinner shown for 200ms is *"cattiveria gratuita"* (gratuitous cruelty). Use a **400ms threshold of decency** — `setTimeout` reveals it, the resolving promise cancels it if it returns first.
- **Blur-up images (LQIP)**: fix the aspect-ratio to prevent layout shift, render a tiny (e.g. 16×10px) asset with `filter: blur(18px)` and `scale(1.06)` to hide edges → **zero CLS**.
- **Silent retry**: retry small failures in secret; bother the user only when all attempts are exhausted. *"La macchina si occupa dei piccoli inciampi; l'utente decide solo quando è il caso."*

## Empty & error states — *the empty is not an absence, it's a moment of speech*

> *"Il vuoto non è un'assenza. È un momento di parola."*

- An empty state's quality is its **voice** (tone, rhythm, the next gesture it offers), not its illustration.
- Microcopy carries the weight: *"Nessun segnalibro, **per ora**."* — *"'Per ora' è la parolina che cambia tutto: promette un futuro, non lo impone."* ("For now" promises a future without imposing it.)
- A search with no results is *"un fallimento dell'interfaccia, non dell'utente"* — propose a correction (a tiny Levenshtein is enough; the value is in the *expectation* of help).
- Put errors **inside the card, not above the user**: headline in `role="alert"`/`aria-live="assertive"`, details `polite`.

## Dialogs & confirmations — *an interruption should behave like a guest*

> *"C'è una cattiveria silenziosa nei dialog mal fatti."*

- Use native `<dialog>.showModal()` — focus trap, Escape, top-layer, backdrop dismiss for free.
- Enter **220ms** / exit **160ms**; reduced-motion → 1ms but the overlay stays available.
- **Destructive confirm**: the machine works to say *no for you*. `autofocus` on Cancel; Enter/Esc both cancel; **blindfold the backdrop** (clicking it must NOT confirm); deleting requires a deliberate act. A modal "are you sure?" thrown at every action is *"un atto di violenza"* — prefer **inline / in-place confirm** with a 4–5s auto-cancel (red only on the verb *"Sì, elimina"*).
- **Bottom sheet** on narrow screens: slide-up ~320ms, swipe-down dismiss threshold ~60px; centered dialog ≥640px.
- **Nested dialogs**: stack them, mark the ones behind `inert`, restore focus via an explicit stack. *"Fatta male, è il modo più rapido di perdere fiducia."*
- **Non-modal popover**: Popover API + CSS Anchor Positioning; soft focus trap (Tab exits after the last element); keep `aria-expanded` always in sync.

## Scroll — *go with the user's gesture, don't chase the thumb*

- Reading progress bar via `animation-timeline: scroll(self)` — **zero JS**, runs on the compositor; use `tabular-nums` on the percentage so it doesn't jump 9→10.
- **Animate once**: `IntersectionObserver` (threshold ~18%) then `unobserve`; stagger ~40ms. *"Le pagine che ri-animano sembrano nervose; quelle che animano una volta sembrano abitate."*
- **Parallax** = *"atmosfera, non spettacolo"*: small amplitudes (e.g. −18/−8/−3px, farther = slower, real physics). *"L'occhio l'apprezza, lo stomaco no."*
- **Scrollytelling in discrete steps**, not continuous scrub: scrub is invisible to keyboard / screen-reader / zoom users — *"non c'è metà strada semantica fra seme e albero"*. Cross-fade between steps, don't morph.
- A floating ToC that gives way: on a narrow screen it disappears — *"non si trasforma in hamburger — cede lo spazio al testo"*.

## Numbers — *digits are read together, not as text*

- `tabular-nums` **anywhere a number changes or is compared in a column**; proportional figures only in running prose.
- **Count-up** on first reveal only: ~900ms, **ease-out** (out, never in-out — *"partire veloci, arrivare in calma"*), stagger ~80ms, formatted with `Intl.NumberFormat`.
- **Signed delta**: **sign, arrow, color — in that order**. Communicating change with color alone is *"pigrizia e falla di accessibilità"*. The positive gets a *"+"*; zero is *"±0,0%"*.
- **Localize** with `Intl.NumberFormat`/`DateTimeFormat` — *"non inventarsi formattazioni universali che universali non sono"* (yen has no decimals).
- **Compact notation** ("1,2M") is *"traduzione, non semplificazione povera"* — never for balances, codes or IDs; the designer chooses it, *"non l'utente"*.
- **Live ticker**: update on a steady period (e.g. 2s), flash the change ~280ms then go calm, a pulse dot on the same period, and a **pause** button — *"chi vuole guardare un valore fermo ne ha diritto"*.

## Inputs — *is the user a guest, or an interrogated suspect?*

- A real `<label>` (`for`/`id`), **above the field, not inside it**: *"un placeholder che fa da label scompare proprio quando l'utente scrive"*. The placeholder is an example. Focus = accent border **plus** a halo `box-shadow` (~3px at 40%) — one alone isn't enough.
- **Patient validation**: validating while typing is offensive. Use CSS-only `:user-invalid` (waits for blur/submit) — *"la validazione gentile non è permissiva: è solo a tempo debito"*. Error in `role=status` polite; on submit, focus the first invalid field.
- **Stepper**: support type, click, and arrow keys; `tabular-nums`; `inputmode=numeric` + `type=text` + `pattern` (`type=number` has too many quirks). **Clamp on blur, not while typing** — *"ti lascia finire la frase"*.
- **Password reveal** (`aria-pressed`) fixes *"il 90% di quegli errori"*; a readable strength heuristic, not zxcvbn; `autocomplete="new-password"`.
- **Respect autofill**: exact tokens (`given-name`, `street-address`, `address-level2`…); a faint `:autofill` accent tint = *"this was filled by the browser, check it if you like"*.
- **Textarea**: `field-sizing: content` (one CSS line replaces the `scrollHeight` JS dance), growing to a cap; an amber counter at 80%, red at the limit — the counter is *"feedback, non guardiano"*.

## Micro-typography — *almost everything in an interface is text; its flaws are invisible one by one, heavy all together*

- **Smart punctuation is language-aware.** Curl the marks the keyboard fakes: `...`→`…`, `--`→en dash `–`, `---`→em dash `—`, apostrophe between letters→`'`. Double quotes alternate open/close, and the glyph changes with the language — `«»` in Italian, `"​"` in English. *"Fingere che sia universale è il primo errore."* `hanging-punctuation: first last` keeps the left edge optically straight (Safari-only; degrades cleanly — a progressive enhancement, not a promise).
- **`text-wrap: balance` for titles, `text-wrap: pretty` for body.** Default wrapping is *greedy* — it dumps leftovers onto the last line, leaving an **orphan** (title) / **widow** (paragraph). `balance` evens short blocks (browser caps it at ~6 lines), `pretty` fixes the paragraph's last lines. **Don't animate re-wrapping** — it reads as a jerk. Replaces hand-placed `<br>` and `&nbsp;` that break on the next copy change.
- **OpenType features must be real, not synthesized.** Use documented font features via `font-feature-settings` (e.g. Geist `cv11` single-storey a, `ss03` slashed zero, `ss04` stylistic ligatures) + `font-variant-ligatures`. Never lean on browser-synthesized small-caps/bold — the forgery shows (strokes stay full-thickness). *"Non promettere quello che il materiale sottostante non può dare."*
- **Weight is a function of size, not an absolute.** With a variable axis (`font-variation-settings: 'wght'`): larger text wants **lighter** weight, smaller text wants **heavier**, to keep the "typographic colour" even (e.g. title 380 / body 460 / caption 540, not a flat 500). Transition uses motion tokens → reduced-motion switches cleanly.
- **The measure (line length) lives in `ch`, not px.** `1ch` = width of the font's "0", so `max-inline-size: 64ch` ≈ 64 chars at any size. **Comfortable zone ≈ 45–75 characters.** Tie leading to measure (longer line → more line-height). Out-of-range is a **sober grey advice, not an alarm red** — the right measure is a range, not a law.
- **Honest hyphenation & justification.** Justify only *with* `hyphens: auto`, else the browser stretches spaces into white "rivers" on narrow columns. The web's most common typographic bug: **`hyphens: auto` does nothing without a correct `lang` attribute** (no dictionary, silent no-op). Default to **ragged right** — clean spaces beat forced justification.
