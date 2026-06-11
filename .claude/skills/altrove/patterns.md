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
- **OpenType features must actually exist in the font — verify, don't trust the docs.** Read the font's real GSUB/GPOS feature tags before building a demo (e.g. fontTools). Geist Variable ships `frac, tnum/pnum, numr/dnom, liga, kern, locl` — and crucially does **not** ship stylistic sets (`cv*`/`ss*`) or small caps; setting them is a silent no-op. Prefer the standardized `font-variant-*` properties (`diagonal-fractions`, `tabular-nums`) over raw `font-feature-settings` tags. Never lean on browser-synthesized small-caps/bold — the forgery shows. *"Non promettere quello che il materiale sottostante non può dare — e verificare il materiale."*
- **Weight is a function of size, not an absolute.** With a variable axis (`font-variation-settings: 'wght'`): larger text wants **lighter** weight, smaller text wants **heavier**, to keep the "typographic colour" even (e.g. title 380 / body 460 / caption 540, not a flat 500). Transition uses motion tokens → reduced-motion switches cleanly.
- **The measure (line length) lives in `ch`, not px.** `1ch` = width of the font's "0", so `max-inline-size: 64ch` ≈ 64 chars at any size. **Comfortable zone ≈ 45–75 characters.** Tie leading to measure (longer line → more line-height). Out-of-range is a **sober grey advice, not an alarm red** — the right measure is a range, not a law.
- **Honest hyphenation & justification.** Justify only *with* `hyphens: auto`, else the browser stretches spaces into white "rivers" on narrow columns. The web's most common typographic bug: **`hyphens: auto` does nothing without a correct `lang` attribute** (no dictionary, silent no-op). Default to **ragged right** — clean spaces beat forced justification.

## Toggles — *two positions, not two states*

> *"Un bottone si preme e torna. Uno switch si impegna in una posizione e ci resta."*

- **Switch = `<button role="switch" aria-checked>`, not a restyled checkbox.** A switch takes effect **immediately** (wifi on *now*); a checkbox is a **deferred** choice applied on submit. The tag tells the truth about which gesture it is — the screen reader says *"switch, on"* vs *"checkbox, checked"*.
- A switch has two **positions**, not two states: the thumb travels a real distance. **Colour is the second signal** — position + a status word is the first (colour never alone).
- **Segmented control ≠ on/off.** It's a single choice among a few equals — use native `<input type=radio>` in a `<fieldset>` (free arrow-keys, single-selection guarantee, form value); add only a sliding pill via a custom prop (`--idx`). A two-segment control where a switch belongs disorients; the form must say *how many roads* there are.
- **Custom checkbox: `appearance: none` on the *clothing*, never the semantics.** Keep the real `<input>` (made invisible, not removed) → keyboard, focus, form, and indeterminate for free. The check **draws in** (`stroke-dashoffset`). `indeterminate` is a DOM property (not an HTML attribute); the parent's state is *derived* from its children, not set by hand.
- **Visual haptics:** the thumb arrives with a tiny squash against the rail-end (an "expressive" feel) — it sells the physical *detent*. Keep the overshoot minuscule and earned (the 0.97-not-0.95 threshold again); under reduced motion it's gone — the thumb is simply already in position.
- **Guarded toggle = friction on purpose** — the only place we add it. Hold-to-confirm (~**700ms**, a closing ring) for consequential switches. Friction goes **only where the consequence is real**, and **only in the dangerous direction** (maintenance ON needs the hold; OFF is immediate). The progress ring is *functional* → it survives reduced motion. Friction "just to be safe" everywhere is a dark pattern.

## Toasts — *inform without interrupting*

- Coexisting toasts signal **priority through icon + sign + label + lifetime**, never colour alone; `aria-live="polite"` reads them without snatching focus.
- **Undo over "are you sure".** Act now and offer an honest countdown to undo (a real shrinking bar, ~5s) instead of a blocking prompt — friction *behind* the action, not in front.
- **Duration is a question, not a number:** *persist* (`role="alert"`, manual close) what blocks; *auto-dismiss* (`role="status"`) what merely reassures.
- **Position is information:** a confirmation near the action that caused it, global/system status in a stable shared spot; never cover active content; consistency removes the hunt.
- `role="status"`/polite **explains**; `role="alert"`/assertive **interrupts** — *"la differenza fra urlare e spiegare"*; raise the voice only when it's worth the interruption.

## Menus — *offer a choice without hiding the context*

- **Anchor the menu to its trigger** (Popover API + CSS Anchor Positioning) so opening never moves the eye off context; `@supports` fallback where unsupported.
- A **context menu** born at the click must clamp/flip to stay fully in the viewport; the keyboard `contextmenu` (menu key / Shift+F10) is the path most people forget.
- **Listbox:** `aria-activedescendant` lets the highlight differ from DOM focus; **typeahead** is the gesture people actually use in long lists; selection signals via check + weight, not colour.
- **Split button:** the most likely action immediate, variants behind the arrow; `aria-haspopup`/`aria-expanded` belong to the **arrow only**, never the primary action.
- **Command palette (⌘K):** a native `<dialog>` hands you the focus trap for free; it's an *accelerator* that must mirror a visible menu, and stays honest even when zero commands match.

## Tabs — *change context without disorienting*

- A tab switches content **panels** — distinct from a segmented control that picks a *value*. Full ARIA tabs: `role=tablist/tab/tabpanel`, arrows + Home/End, **roving tabindex**.
- The indicator **flows** (FLIP via measured custom props): one underline sliding, not four flickering — and the panel content **never re-animates**.
- Inline counts need `tabular-nums` so the row doesn't jump; zero is **muted, not a fake badge**; carry the count in `aria-label`.
- **Overflow must be declared:** scroll-snap + edge fades that appear *only* when there's genuinely more; keep the active tab in view (`scrollIntoView`, hard-jump under reduced motion).
- View Transitions cross-fade panels as progressive enhancement; the state swap reaches the same end state without the API and under reduced motion.

## Cards — *a card is a hierarchy, not a box*

- Image as a **CSS-gradient placeholder with fixed `aspect-ratio`** so the real photo never shifts layout; hover is a *derived* whole-card state via `:has(.link:hover)`, not glued to one part.
- **Stat card reports, doesn't celebrate:** count-up once ~900ms ease-out, `tabular-nums`; a decline shows `▼` (sign before colour); reduced motion shows the final value immediately.
- **Full-card click** via stretched-link (`::after` overlay) that keeps text selectable; sub-actions raised on `z-index` to stay clickable and keyboard-reachable.
- **Expandable card grows in place** (no modal): `<button aria-expanded>` + honest height via `grid-template-rows: 0fr→1fr`; reduced motion opens without animating.
- **Card stack:** depth via an OKLCH `color-mix` shadow; fans out on hover/`:focus-within` so the focused card is never buried; every card a real link in reading order.

## Dividers — *silence: drawn, or simply allowed to happen*

- **Dress the native `<hr>`, never replace it with a mute `<div>`** — the ugly default is cosmetic, the semantics are not.
- A **labeled divider** ("or") is a real `role="separator"`; the side lines are `aria-hidden` decoration — the word carries the meaning.
- A **vertical separator** is `role="separator"` + `aria-orientation="vertical"`; the *inset* (a thread that doesn't touch the edges) is what makes it separate rather than cut.
- The divider is a **quantity of silence, not a line**: full-bleed vs prose-width are two gestures of the same `<hr>`, and white space alone often separates best — drawn silence is optional.

## Long-form — *keep company with a ten-minute reader*

- The active ToC entry is the section you're **actually reading** (IntersectionObserver, a reading line at ~35%), not the topmost one; `aria-current="location"`; on a narrow screen the space goes to the text, not the index.
- Reading progress on the compositor via `animation-timeline: scroll()` (`@supports` + JS fallback); position-mapping is **state, not a journey** → reduced motion removes nothing.
- **Footnote popover:** read the aside without leaving the paragraph (Popover API + anchor); Esc/light-dismiss; focus restored to the reference that opened it.
- **Back-to-top earns its place:** hidden (and out of the tab order) until a ~35% threshold; enters ~220ms, leaves faster.
- **Reading bookmark = position, not progress:** save *where* you stopped (`localStorage`), **offer** to resume (don't hijack scroll), and admit plainly when the browser denies storage — never fake a completion %.

## Editorial grid — *elegant before it's beautiful*

- **Name your grid lines** instead of counting them; the grid overlay is scaffolding for the designer (`aria-hidden`), never content for the reader.
- `subgrid` aligns a note to its paragraph's row for free; keep the `<aside>` **after** its paragraph in DOM order (screen-reader reads it in place); collapse it *under* on narrow widths.
- A break reads as intention only when it occupies a **precise grid line**; a pull quote that merely echoes body text is `aria-hidden` decoration, not a second reading.
- **Full-bleed is "out and then back in":** prose must return to its reading measure; a gradient placeholder reserves the figure's shape so nothing reflows.
- Components should answer to their **container's** width (`@container`), not the window's; report a range control in words via `aria-valuetext`, not just a number.

## Quotation — *giving the floor to someone else*

- **A pull quote isn't a real quotation** — it's the page quoting itself: no attribution, no `<blockquote>`; the opening mark **hangs** to keep the text edge optically straight.
- `<blockquote>` wraps only the spoken words; attribution lives outside in `<figcaption>`; `<cite>` is for the **work's title**, never the speaker's name.
- Inline quotes are `<q>` — it **auto-nests** the correct marks per the CSS `quotes` property and declared `lang` (Italian «… ‘…’ …», English "… '…' …"); typing the marks by hand is the silent bug.
- **Drop cap is progressive enhancement:** `initial-letter` where supported, a `::first-letter` float as universal fallback; keep the enlarged letter inside the text so screen readers read the whole word.
- **Original + translation** needs the correct `lang` on each block (pronunciation, hyphenation, language-aware marks); a toggle swaps only visual hierarchy (scale + opacity), never the content.

## Marginalia — *talk to your reader without breaking the thread*

- Where a note lives depends on the **container's** width (`@container`), not the window's: wide → margin, narrow → inline popover (`<button aria-expanded>`); never hidden behind a gesture.
- Aside tone must be legible **without colour**: icon + text label + border sign (colour is the third, redundant channel); semantics match the tone (`role="note"`, `<blockquote>`, `<pre>`).
- **Highlight-to-note** (Selection API) is a shortcut, never the only path: an always-present keyboard button does the same; `aria-live` announces; anchor the note to the *element*, not a fragile text range.
- **Footnote vs sidenote is a content decision** (note length + available space), not taste; a footnote is a real anchor link with a back-link.
- `<details>/<summary>` gives announced state, free keyboard, and find-in-page for free; JS only **reflects** the native `toggle` event, never reinvents the state.

## Indexing & navigation — *a site that finds its way inside itself*

- The index highlights the section you're **actually reading** (scroll-spy + `aria-current`); *expanding* is the user's choice, *highlighting* is a consequence of scroll — two separate responsibilities.
- A long breadcrumb keeps the **root and the leaf** and collapses the middle behind an expandable `…`; never amputate depth (hidden levels stay in the DOM); the current page is `aria-current="page"`, not a link.
- **The honest preview of a text is the text itself in miniature** (typography that stays true and themed), not a screenshot that fakes content and ages.
- A filter must filter **truthfully**: excluded items go `hidden` (out of tab order / SR), an "N of M" line reports instead of silently emptying, counts in `tabular-nums`.
- "You are here" never lives in **motion alone**: text + position + colour + `aria-current`.

## Editorial images — *information, or breath*

- Moving a caption (below / beside / overlay) is a **layout** decision, never a markup one: the `<figure>`/`<figcaption>` stays constant; overlay text needs a **designed scrim**, not hoped-for contrast.
- **Focus means dimming the rest, not deleting it:** the active item is marked by size + border + word + `aria-current`; neighbours dim (`opacity`/`filter`) but stay keyboard-reachable via a roving tabindex.
- **Lightbox grows the image you touched** (View Transitions morph), degrades to a measured fade where unsupported / reduced-motion, and always restores focus to the trigger.
- **"Hidden from the eyes" must never mean "hidden from accessibility":** a hover caption stays in the DOM and reappears on `:focus-within` + an explicit `aria-expanded` button (the only path that works on touch).
- Annotations belong on real `<button>` hot-spots (labelled, Tab/Enter/Space, touch-safe), **not** hover tooltips on a `<div>`; one popover open at a time, Esc returns focus to its point.

## Drag & drop — *how do you hold an object in flight?* (accessibility is the theme)

- **DnD is inaccessible by *choice*, not nature:** every drag has a full keyboard path **and** `aria-live` announcements (pick-up / move / drop). Prove it can be 100% keyboard.
- A **drop *indicator*** (a line *between* items) tells a truth a highlight can't: you're slotting *between* two positions, not landing *on* one.
- A **ghost element** (scale + opacity under the pointer) plus a faded **placeholder** makes the object read as *carried*, not teleported.
- Keyboard reorder: an explicit **Space-to-grab** mode disambiguates the arrows; Esc cancels; narrate over non-colour channels.
- Reflow with **FLIP, guarded by `matchMedia`** (no transition under reduced motion); `touch-action: none` on the **handle only**; use Pointer Events with capture, not the HTML5 drag image.

## Search — *what happens between each keystroke?*

- **Debounce (~250ms)** so you don't query per letter; a **monotonic token** (a poor man's `AbortController`) drops out-of-order **stale** responses — the only rule that guarantees the screen ends on *the last thing you typed*, not the last thing the network returned.
- Don't show a loader under the **~400ms threshold of decency**.
- Highlight **why** a result matched with semantic `<mark>` (not colour), built from **DOM text nodes** — never string-concatenated HTML, so the query can never become markup.
- **Group results by type** with a fixed order, dropping empty groups; headings are `aria-hidden` signs inside `role="group"`, never fake options.
- **No-results is a door, not a wall:** a real "did you mean…?" button **only** when something is genuinely close (1–2 edits); honest silence — never an invented suggestion — when nothing is.
- Full **ARIA combobox**: `aria-activedescendant` keeps DOM focus in the input while the highlight travels; ↑/↓/Home/End/Enter/Esc; the first relevant result is pre-highlighted; results count via `aria-live`.

## Calendar & dates — *ask for a date without hating the browser*

- A calendar is a **grid**: honour the keyboard people already know (arrows / PageUp-Down / Home-End), roving tabindex, `role=grid/gridcell`, `aria-current="date"`; let **`Intl`** supply every localized month and weekday.
- A **range is two gestures**, not one: always tell the user which one they're in; mark endpoints on two channels (fill **and** shape), never colour alone.
- "in 3 days" is the friendly shortcut, but it **lies by omission** — keep the absolute date permanently reachable (`title`, `datetime`, printed text). `Intl.RelativeTimeFormat`.
- **A time without its zone is a lie:** show the zone explicitly (`Intl.DateTimeFormat` with `timeZone` + `timeZoneName`).
- A smart input ("tomorrow" / "next Friday" / "+3 days") matters less than **admitting when it doesn't understand** — a silent wrong guess is a trap.
- **Never `new Date()`/`Date.now()` at build/SSR** for dynamic values (it goes stale) — do date math in the client script.

## Timeline — *time as a visual object, not a table*

- A vertical spine + `<ol>` makes **sequence** a thing the eye reads before the dates; relative labels computed client-side so they can't silently go stale and lie.
- A step is a **place, not a percentage**: the current step is ring + check glyph + bold label + `aria-current="step"` — state that survives without colour and without sight.
- **CSS Grid *is* a temporal grid** (`grid-column: start / end`): bar length literally equals duration, zero libraries; a visually-hidden span speaks each span for screen readers.
- A slow ~2.4s **"breath"** on only the freshest items says "still warm"; under reduced motion the pulse is **removed entirely** while a static `•` + "recent" carries the state — information never rides on motion alone.
- A real `<input type="range">` makes time **scrubbable** with free keyboard/touch; `aria-valuetext` is the moment's *meaning* ("Sep 16, build green"), not the mute "3 of 5".

## Gestures — *touched, not clicked* — a gesture is an accelerator, not a gate

- **Every gesture has a visible button / keyboard equivalent**, and gestures + key handlers are **scoped to the component** (no global `window` scroll or key hijack).
- **Swipe-to-dismiss** follows the finger with resistance and returns if insufficient; the button does the identical thing and **moves focus** (e.g. to "Restore") so nobody is orphaned.
- **Pull-to-refresh:** `overscroll-behavior: contain` + arm the JS pull **only at `scrollTop === 0`**; never seize the page scroll.
- **Vim keys** (j/k/h/l) ride on top of standard roving-tabindex arrows, bound to the **list** (not `window`), with a focus-triggered hint — a hidden shortcut isn't a shortcut.
- `?` opens the shortcut sheet from the component's **own** keydown (suppressed inside text fields), not `document`; native `<dialog>.showModal()` gives the trap + Esc for free.
- **`inert` is correctness, not decoration:** one attribute removes focus, pointer events, and ARIA visibility together from a covered backdrop.

## Endings & farewell — *how do you let a user go?*

- **A guard, not a cage:** confirm leaving **only** when there's unsaved work to lose; an empty "are you sure?" just trains people to click through. (Never attach a real `beforeunload` for a demo — simulate inside the contained surface.)
- At a three-way exit fork, put **default focus on the safe action** (Save) and set the destructive one aside; Esc cancels, never destroys.
- A **session timeout should reassure, not threaten:** a gentle `aria-live` countdown and a "Stay signed in" that extends without penalty — a calm off-ramp, not a dead end.
- **Leaving is legitimate:** logout is a warm send-off (a wave, a thanks, the door left open), not an error screen.
- **No pre-emptive "are you sure?":** act instantly and keep an honest ~**10s** undo window with a bar that genuinely empties — friction *behind* the action, not in front of it.
