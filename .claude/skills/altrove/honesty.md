# Altrove · Honest vs deceptive

The throughline of the whole study: **an interface should tell the truth, even when a lie would look better.** Every pattern can be honest or deceptive — the same component, built two ways. When the two conflict, honesty wins. This is the reverse of a dark pattern: a UI that *earns* trust instead of extracting a click.

## The test

Before shipping an interaction, ask: *does this communicate what is actually true, or what is convenient for me?* If a number, a state, or an animation says something the system can't back up, it's a lie — no matter how good it looks.

> *"Anche le animazioni d'esempio dicono la verità: se è 84%, è 84%, non 99 per fare scena."*
> Even sample animations tell the truth: if it's 84%, it's 84% — not 99 to look impressive.

## Catalogue: honest vs deceptive

| Situation | Deceptive | Honest |
|---|---|---|
| **Async action** | Spinner inside the button — *"aspetta, sto facendo"* | The button **becomes** the action (morph → traced check): it shows the outcome, not just busyness |
| **Short wait** | A spinner flashed for 200ms — *"cattiveria gratuita"* | Show nothing under the 400ms threshold of decency; if it does appear, *"è onesto: la rete ha tardato"* |
| **Optimistic action** | Pretend success forever, swallow the failure | Commit instantly **and** roll back visibly (~500ms) when the network really says no |
| **A number / stat** | Round up "to look good", color-only deltas | Exact value; sign + arrow + color; a dashboard that *"non celebra, riferisce"* |
| **Compact notation** | Hide precision where it matters (balances, IDs) | A *translation* of large numbers in display only — never on values the user must read exactly |
| **404 / error** | Sterile, blaming, or a fake-looking URL | Transparent and human; *"si sente la differenza nel petto, non solo negli occhi"* |
| **Empty list** | A dead end | *"Nessun segnalibro, per ora"* — *"per ora"* promises a future without imposing it |
| **No search results** | Blame the user's query | *"Un fallimento dell'interfaccia, non dell'utente"* — propose a correction |
| **Permission prompt** | Fire the native dialog cold, guilt-trip on decline | **Pre-prompt: the *why* before the ask** — *"non perché manipola, ma perché si dimostra collaborativa"*; a *"Non ora"* with no shaming tone |
| **Destructive confirm** | A reflexive modal on every action (*"un atto di violenza"*); backdrop-click confirms | The machine works to say *no for you*: focus on Cancel, Esc/Enter cancel, backdrop can't confirm; or an inline confirm with auto-cancel |
| **Parallax / scroll FX** | Spectacle that fights the gesture and turns stomachs | *"Atmosfera, non spettacolo"* — small amplitudes the eye enjoys but the stomach doesn't notice |
| **Form validation** | Impatient errors while the user is still typing | Patient `:user-invalid` — *"non è permissiva: è solo a tempo debito"* |
| **Live data** | Constant motion you can't escape | A steady, calm cadence with a **pause** button — *"chi vuole guardare un valore fermo ne ha diritto"* |
| **Toggle semantics** | A switch (immediate effect) dressed as a deferred checkbox, or vice-versa | The tag matches the gesture: `role="switch"` acts now, a checkbox commits on submit |
| **Consequential switch** | Manufactured friction "to be safe" everywhere, or in the *safe* direction | Hold-to-confirm **only** where the consequence is real and **only** in the dangerous direction |
| **Search as-you-type** | Render whatever response returns last (out-of-order) | A monotonic token drops stale responses — the screen ends on *the last thing you typed* |
| **Relative time** | Only "in 3 days" — precision hidden | The absolute date stays reachable (`title`/`datetime`/printed); a time without its **zone** is a lie |
| **Smart date input** | A silent wrong guess for unparsed text | Admit it: *"non ho capito"* beats a confident mistake |
| **Hover-only caption / tooltip** | Content that exists only on hover (lost to touch & keyboard) | Stays in the DOM; reappears on `:focus-within` + an `aria-expanded` button |
| **Reading bookmark / progress** | A faked completion percentage | Saves *where* you stopped, offers to resume, and admits when storage is denied |
| **Gesture** | A swipe/pull as the **only** way to act (a gate) | An accelerator with a visible button/keyboard twin; scoped, never hijacking the page |
| **Leaving the page** | `beforeunload` that blocks every exit | Confirm **only** when there's unsaved work; logout is a warm send-off, not an error |
| **Card image / count-up** | A photo that reflows on load; a stat rounded up to look good | Fixed `aspect-ratio` placeholder; count rises once to the *true* value, `▼` sign before colour |

## The principle behind the catalogue

Deception in UI is usually **optimization for the maker's metric** (a click, a perceived speed, a vanity number) at the cost of the user's accurate model of reality. Honesty is the discipline of keeping the user's mental model true — even when a small lie would convert better. The payoff is the only kind of trust that compounds: the user stops checking whether the interface is fooling them, and is free to be *elsewhere*.
