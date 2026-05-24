# Lancio · Capitolo 01 "Anatomia di un bottone"

Bozza **finalizzata** del post di lancio. Dettagli concreti presi dal capitolo,
non template generici. Adatta ulteriormente prima di postare — la voce
deve restare la tua.

URL canonica:
- IT → https://altrove.dev/chapters/01-anatomia-di-un-bottone
- EN → https://altrove.dev/en/chapters/01-anatomy-of-a-button

---

## ✦ Bluesky · thread italiano (consigliato come primo lancio)

Pubblica martedì o mercoledì mattina (10–11 italiano). Lunedì e venerdì
hanno engagement più basso nella community frontend EU.

### Post 1 — l'hook
**Media:** GIF del **SoftPressButton** in azione (3-4 click consecutivi, mostra l'effetto della scale 0.97). Loop pulito, ≤3 MB.

```
Un bottone fatto bene fa la stessa cosa di quel piatto in Ratatouille:
non lo noti, ma quando lo premi ti torna in mente che le cose vere
hanno un peso.

Ho appena pubblicato il primo capitolo di Altrove —
"Anatomia di un bottone".

→ altrove.dev/chapters/01-anatomia-di-un-bottone
```

### Post 2 — il dettaglio che fa la differenza
**Media:** screenshot ravvicinato del bottone in stato "pressed" + nota tecnica.

```
La pressione scende a scale 0.97. Non 0.95.

Pochi millesimi di differenza:
— 0.97 sembra "premuto"
— 0.95 sembra "rotto"

Quasi tutto il resto del capitolo è così: micro-decisioni
da millisecondi che fanno o disfano la sensazione di tatto.
```

### Post 3 — il secondo pattern (varietà visiva)
**Media:** GIF del **MorphLoadingButton** (idle → loading → done con check tracciato).

```
Il pattern più stanco del web è il bottone con uno spinner dentro.
Più onesto: far diventare il bottone *stesso* lo spinner.

Collassa in cerchio, gira, si trasforma in check.
Il check è tracciato con stroke-dasharray — non appare, viene
disegnato. Dettaglio gratuito, cambia tutto il tono.
```

### Post 4 — il "che si nota solo se lo sai"
*(opzionale — solo se il thread va bene)*

```
Aptica simulata, perché il browser non vibra:

— scale 1 → 1.45 → 0.9 → 1 (320 ms)
— halo radiale che si espande dietro
— navigator.vibrate(8) su mobile quando c'è

Tre segnali ridondanti che il cervello integra in UNA sensazione
di tatto. Un ottavo di secondo di vibrazione: percepibile,
mai fastidiosa.
```

### Post 5 — la filosofia (chiude il thread)
```
Un bottone non è un rettangolo cliccabile.
È un piccolo contratto fisico tra dito e schermo.

Onorarlo è l'inizio di tutto il resto — di Altrove,
del playground, dei capitoli che verranno.

Costruito con Astro 6, CSS nativo, Motion. No Tailwind.
```

### Post 6 — la CTA aperta
```
Curiosità: qual è il bottone più stanco che vedi ancora
in giro nei prodotti che usi?

Vorrei sapere cosa frustri ancora — è la materia prima
del prossimo capitolo.
```

---

## ✦ X / Twitter · adattamento

Su X cambia struttura: il primo post deve essere **media + 1 frase**.
Niente "thread 🧵 ↓", niente CTA al primo post.

### Post 1 (hero — la GIF del MorphLoadingButton qui)
```
Un bottone che invece di mostrare uno spinner
diventa lui stesso lo spinner.

Primo capitolo di Altrove, online.
altrove.dev
```

### Post 2 (risposta a te stesso, inizia il thread)
```
Cos'è e cosa c'è dentro ↓
```
*(poi versione condensata dei post 2-5 di Bluesky)*

---

## ✦ Single-shot (LinkedIn, Slack designer community, DM)

Un post lungo unico per dove i thread non funzionano. Tono leggermente
più "professionale" senza perdere voce.

```
Ho appena pubblicato online il primo capitolo di Altrove,
un playground personale sui pattern di UX, motion e tipografia.

Il capitolo 01 si chiama "Anatomia di un bottone" — sei pattern
finiti, ognuno con la sua nota sul perché di ogni timing:

→ soft press (la scale 0.97 vs 0.95 — "premuto" vs "rotto")
→ morph loading (il bottone DIVENTA lo spinner)
→ magnetic con strength 0.4 + halo
→ conferma in-place con auto-cancel a 4s (senza modal)
→ tooltip che cresce dal bottone (transform-origin)
→ feedback aptico visivo + navigator.vibrate(8) su mobile

Niente Tailwind, niente UI kit. Astro 6 + CSS nativo (@layer,
custom properties, container queries) + Motion + View Transitions.

Il sito è bilingue IT/EN.

altrove.dev/chapters/01-anatomia-di-un-bottone
```

---

## ✦ Asset richiesti per questo lancio (priorità)

Senza almeno i primi due, non lanciare.

- [ ] **GIF #1** (priorità 1) — SoftPressButton: 3-4 click consecutivi.
      Dura 4-5 secondi loop. ≤3 MB. Per post 1 Bluesky.
- [ ] **GIF #2** (priorità 1) — MorphLoadingButton: idle → loading → done.
      Dura 4-5 secondi. ≤3 MB. Per post 1 X + post 3 Bluesky.
- [ ] **Screenshot** stato "pressed" del SoftPressButton, ravvicinato,
      eventualmente con sovrapposizione testo "scale: 0.97 ≠ 0.95"
      per post 2 Bluesky (opzionale — il post regge anche senza).
- [ ] **GIF #3** (nice to have) — FavoriteButton con bounce + halo +
      vibrate. Per post 4 Bluesky.

Tool consigliati: ScreenToGif (Windows), poi ottimizzazione con
[gifski](https://gif.ski) o ffmpeg per ridurre sotto i 3 MB.

Setting: viewport 1280×720, registra a 30fps, esporta a 24fps
per dimensioni minori.

---

## ✦ Submissions abbinate (settimana 1)

Subito dopo il post Bluesky (giorno 1 o 2):

- **[Sidebar.io](https://sidebar.io/submit)** — usa URL del capitolo 01,
  non la home. Description: 1 frase = "An anatomy of the button —
  six patterns with annotated timings. The first chapter of Altrove."
- **[Hover States](https://hoverstat.es/submit)** — fit perfetto per
  questa estetica. Stessa description.
- **[Godly](https://godly.website/submit)** — usa la home. Description:
  "A slow playground in chapters on UX, motion and typography.
  Built with Astro and CSS native."

---

## ✦ Cosa NON dire (ripasso anti-pattern)

- ❌ "Excited to share!"
- ❌ "🧵 thread alert"
- ❌ "Like and RT for reach"
- ❌ "1/" all'inizio del primo post (su Bluesky non serve, su X solo se thread lungo)
- ❌ Emoji corporate (🚀 💡 ✨) sui post tecnici
- ❌ Hashtag più di uno per post
- ❌ Nominare strumenti che non sai usare per "sembrare informato"
