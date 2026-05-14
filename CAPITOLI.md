# Altrove · roadmap dei capitoli

> Un capitolo alla volta, finito al 100% prima del prossimo.
> Questo documento è il **menu lungo**, non un ordine di marcia.
> Si guarda quando il capitolo corrente è chiuso e ci si chiede:
> «cosa mi attira ora?»

---

## Stato

| # | Titolo | Stato |
|---|--------|-------|
| 01 | Anatomia di un bottone | ✅ pubblicato |
| 02 | L'arte dell'attesa | ✅ pubblicato |
| 03 | La voce del vuoto | ✅ pubblicato |
| 04 | Il dialogo silenzioso | ✅ pubblicato |
| 05 | Lo scroll che racconta | ✅ pubblicato |
| 06 | Numeri che hanno peso | ✅ pubblicato |
| 07 | Anatomia di un input | ✅ pubblicato |
| 08 | La micro-tipografia | 📋 in roadmap (prossimo naturale) |
| 09–26 | *(vedi sotto)* | 💭 ipotizzati |

I primi 8 sono dettagliati nel piano `playground-a-capitoli-validated-liskov.md`. Da 09 in poi: questo file è la fonte.

---

## Fase B · Componenti primari (09–14)

Dopo i primi 8 capitoli, l'asse "anatomia di un X" continua su altri primitivi UI. Ognuno è un weekend o due, scope chiuso.

### Cap. 09 — *Anatomia di un toggle*
**Domanda:** *La differenza tra un bottone e uno switch è solo grafica?*
Lo switch è l'unico controllo binario che si manifesta come oggetto fisico — ha *due posizioni*, non due stati. Demo: switch "soft" con thumb che scivola con spring, toggle group segmentato (stile iOS), checkbox custom con `appearance: none` ma keyboard-accessible, switch con effetto "haptic" visivo, toggle che pre-conferma azioni distruttive ("trascinami per confermare").
**Skill:** `[role="switch"]`, ARIA states, OS-level switch idioms, `appearance: none`, focus-visible patterns.
**Sforzo:** 2 weekend.

### Cap. 10 — *Anatomia di un toast*
**Domanda:** *Come si dà un'informazione senza interrompere?*
Il toast è il messaggio che arriva, vive il tempo che serve, e se ne va. Demo: toast con priorità (info/success/warning/error) che convivono in stack, toast "undo" con countdown visivo, toast persistenti vs auto-dismiss, posizionamento intelligente (top-right per success, bottom-center per offline), `role="status"` vs `role="alert"`, animazione di ingresso da bordo schermo con fisica dell'oggetto.
**Skill:** `aria-live`, focus management durante toast, queue/stack management, position systems.
**Sforzo:** 2 weekend.

### Cap. 11 — *Anatomia di un menu*
**Domanda:** *Come si offre una scelta senza nascondere il contesto?*
Menu contestuali, dropdown, listbox. Demo: dropdown con anchor positioning native (`anchor-name`/`position-anchor`), menu contestuale al right-click che resta in viewport, listbox accessibile con tastiera (Home/End/PageUp/PageDown), menu split (azione principale + frecciapertura), menu cascading (submenus) senza incastrarsi, "command-K" alla command bar.
**Skill:** CSS Anchor Positioning, ARIA listbox/menu, keyboard navigation, focus trapping/restoring.
**Sforzo:** 3 weekend.

### Cap. 12 — *Anatomia di una tab*
**Domanda:** *Come si cambia contesto senza disorientare?*
Tab pattern senza dimenticare l'utente. Demo: tab "underline" con indicatore che fluisce tra le posizioni (FLIP), tab in scroll-snap orizzontale con indicatore di overflow, tab a "pillole" dense, tab con conteggio inline (`Inbox 24`), tab con animazione di view-transition tra i pannelli, tab keyboard-navigation (Arrow keys, Home, End).
**Skill:** ARIA tabs pattern, FLIP animation, scroll-snap, view-transition tra siblings.
**Sforzo:** 2 weekend.

### Cap. 13 — *Anatomia di una scheda*
**Domanda:** *La card è solo un rettangolo con bordo?*
Tassonomia delle card. Demo: card editoriale (immagine + meta + lede), card statistica con counter animato, card prodotto con badge, card "azione rapida" full-clickable, card "expandable" che cresce in place senza modal, card stack (3 schede sovrapposte con depth shadow), card con drag-handle (preview del cap. 21).
**Skill:** card composition, container queries (`@container`), `:has()` per stato derivato, drop shadows in OKLCH.
**Sforzo:** 2 weekend.

### Cap. 14 — *Anatomia di un divider*
**Domanda:** *Il silenzio nella pagina si disegna o si lascia accadere?*
Capitolo "minimo" e quasi zen — sui modi di separare senza separare troppo. Demo: regola orizzontale onesta (`hr` curato), divider con etichetta inline ("oppure" tra due pulsanti login), divider verticale tra micro-azioni, divider con icona centrale come "respiro", spazio vuoto come divider (whitespace ratio), divider che cambia ritmo (full-bleed vs prose-width).
**Skill:** `<hr>` styling, vertical rhythm, semantic separation, hanging punctuation con `text-indent`.
**Sforzo:** 1 weekend (capitolo "spalla" — riposante, denso).

---

## Fase C · Pattern editoriali (15–20)

Dopo i componenti primari, ci si sposta dal *micro* al *macro*: la pagina come oggetto editoriale, non solo come contenitore di componenti. Tema unificante: la voce del progetto.

### Cap. 15 — *La pagina lunga*
**Domanda:** *Come si tiene compagnia a chi legge per dieci minuti?*
Long-form reading. Demo: ToC sticky che evidenzia la sezione corrente (Intersection Observer + scroll-timeline), progress bar di lettura nativa, footnote con popover ancorato, "back to top" che appare solo dopo certe percentuali di scroll, rilettura — segnaposto che l'utente lascia (localStorage), reduce eye-fatigue mode (riga corrente highlight su tasto).
**Skill:** Intersection Observer, scroll-driven animations, `<aside>` semantica, popover API + anchor.
**Sforzo:** 3 weekend.

### Cap. 16 — *La griglia editoriale*
**Domanda:** *Cosa rende una pagina "elegante" prima ancora di essere bella?*
CSS Grid + container queries per layout editoriali veri. Demo: griglia a 12 colonne fluide con baseline sub-grid, sidenote pattern (testo principale + note in colonna sussidiaria), pull quote che spezza la griglia, foto a tutta pagina (`grid-column: full-bleed`), griglia che si ricompone con container queries, layout swiss "asimmetrico ma calmo".
**Skill:** CSS Grid avanzato, `subgrid`, container queries, named lines, `grid-template-areas`.
**Sforzo:** 3 weekend.

### Cap. 17 — *La citazione*
**Domanda:** *Quando si dà la parola a qualcun altro, come la si presenta?*
Forme della citazione. Demo: pull quote tipografico (large, off-grid), `<blockquote>` con attribuzione e fonte, citazione inline (curly quotes corretti, quotes annidate), citazione "celebrativa" con drop cap iniziale, citazione tradotta (originale + traduzione side-by-side), citazione con highlight retrospettivo dopo selezione testo.
**Skill:** OpenType `cv` features, `quotes` CSS property, `<cite>` semantica, `::selection`.
**Sforzo:** 1 weekend.

### Cap. 18 — *La nota a margine*
**Domanda:** *Come si dialoga con il proprio lettore senza interrompere il filo?*
Marginalia digitale. Demo: side note che vive nella colonna laterale a desktop e scivola in popover su mobile, `<aside>` con varianti (info/warning/quote/code), evidenziatore — testo selezionato che genera una nota collegata, footnote vs sidenote (quando uno o l'altro), note in margine con linker bidirezionale.
**Skill:** `<aside>` semantica, container queries per spostare contenuto, popover API, `details/summary`.
**Sforzo:** 2 weekend.

### Cap. 19 — *L'indice del libro*
**Domanda:** *Un sito che parla di sé come orientarsi al suo interno?*
Navigazione gerarchica e ToC. Demo: ToC del sito intero (capitoli + sezioni dentro ogni capitolo), breadcrumb intelligente (omette livelli quando il path è lungo), miniatura del capitolo nell'indice (tipografia preview, no screenshot), indice analitico dei tag (tutti i tag → capitoli), pagina "tu sei qui" con highlight nel ToC.
**Skill:** Astro Content Collections + ricerca, sitemap navigabile, scroll-spy.
**Sforzo:** 2 weekend.

### Cap. 20 — *Le immagini in editoria*
**Domanda:** *Quando un'immagine è informazione e quando è respiro?*
Trattamento editoriale delle immagini. Demo: caption posizionato (sotto / di fianco / in overlay), gallery con focus-mode, lightbox onesto (animation di morph, focus restore), image figure con "trama" (didascalia dietro al hover), immagine con annotazioni hot-spot, dialog con preview hi-res.
**Skill:** `<figure>` + `<figcaption>` semantica, view-transition per gallery, `loading="lazy"`, anchor scroll restoration.
**Sforzo:** 3 weekend.

---

## Fase D · Pattern complessi (21–26)

Le interazioni "grosse": drag, ricerca, tempo, gesture. Massima curva di apprendimento, massima soddisfazione quando funzionano bene.

### Cap. 21 — *Il drag e il drop*
**Domanda:** *Come si tiene un oggetto in volo?*
Drag-and-drop nativo + Pointer Events. Demo: riordino di una lista con drop indicator (linea che appare tra gli item), drag tra colonne stile Trello con FLIP, drag-to-action con drop zones colorati, ghost element con scale e opacity, drag e tastiera (Move Up / Move Down con focus), pull-to-action mobile.
**Skill:** Pointer Events, HTML5 Drag API, FLIP, accessibility per DnD (DragDropTouch, ARIA grabbed).
**Sforzo:** 4 weekend (capitolo grosso).

### Cap. 22 — *La ricerca tipo-as-you-go*
**Domanda:** *Cosa succede tra ogni tasto premuto?*
Search-as-you-type onesto. Demo: input con debounce + cancel della richiesta precedente, highlight delle parti di match, suggerimenti raggruppati (capitoli, tag, persone), "no results" che propone alternative ("forse intendevi… ?"), keyboard navigation tra i risultati, risultato di default in evidenza.
**Skill:** debounce/throttle, AbortController, fuzzy matching (Fuse.js o vanilla), ARIA combobox.
**Sforzo:** 3 weekend.

### Cap. 23 — *Il calendario*
**Domanda:** *Come si chiede una data senza odiare il browser?*
Date picker che non offende. Demo: calendario tastiera-first (Arrow keys + PageUp/PageDown per mese), date range picker con focus su entry e exit, durata relativa (`Intl.RelativeTimeFormat`), fuso orario esplicito (sempre), input "intelligente" che capisce "domani" / "venerdì prossimo" / "+3 giorni", time picker con scroll vs select.
**Skill:** `Intl.DateTimeFormat`, `Temporal` API (se disponibile), keyboard date navigation, Astro hydration patterns.
**Sforzo:** 3 weekend.

### Cap. 24 — *La timeline*
**Domanda:** *Il tempo come oggetto visuale, non come tabella.*
Visualizzazioni temporali. Demo: timeline verticale di eventi (commit log style), progress timeline (step orizzontale completato/corrente/pendente), gantt minimalista (1 riga per task), timeline a "respiro" che fa pulsare gli eventi recenti, replay temporale di un'azione (slider per scrubbing), now-marker che insegue la riga del tempo.
**Skill:** SVG layout, scroll-driven animations, CSS Grid per timeline orizzontali, `<time datetime>`.
**Sforzo:** 2 weekend.

### Cap. 25 — *Il gesto*
**Domanda:** *Cosa cambia quando l'interfaccia si tocca, non si clicca?*
Touch e tastiera come dispositivi a sé. Demo: swipe-to-dismiss su card, pinch-to-zoom su immagine, pull-to-refresh nativo (CSS `overscroll-behavior: contain` + JS), navigation keyboard "Vim-style" (j/k/h/l) opzionale, hint visibile delle scorciatoie (premi `?`), `inert` su elementi non interagibili.
**Skill:** Pointer Events deep, `overscroll-behavior`, Web Animations API, keyboard maps, `inert` attribute.
**Sforzo:** 3 weekend.

### Cap. 26 — *Il commiato*
**Domanda:** *Come si lascia andare un utente?*
Il momento in cui qualcosa finisce: chiusura di un dialog, scadenza di una sessione, salvataggio prima di lasciare, log out, bookmark salvato. Demo: `beforeunload` con conferma onesta (non "are you sure"), dialog "vuoi salvare?" con default sicuro, session expire warning con countdown gentile, "ci rivediamo" page (logout celebrato), undo persistente per 10 secondi, leaving animation di pagina (view-transition di "addio").
**Skill:** `beforeunload`, focus restoration, View Transitions reverse, `pagehide`/`pageshow`, `<dialog>`.
**Sforzo:** 2 weekend (capitolo conclusivo, denso, riflessivo).

---

## Sforzo totale stimato

| Fase | Capitoli | Weekend totali |
|------|----------|-----------------|
| B · Componenti primari | 09–14 | 12 |
| C · Pattern editoriali | 15–20 | 14 |
| D · Pattern complessi | 21–26 | 17 |
| **Totale 09–26** | 18 capitoli | **43 weekend** |

A un ritmo di **~2 weekend per capitolo medio**, con qualche pausa naturale, sono ~10–12 mesi di lavoro a tempi sostenibili. Non è una scadenza. È un orizzonte.

---

## Piano di esecuzione

### Principi guida (i soliti, ribaditi)

1. **Un capitolo alla volta, finito al 100% prima del prossimo.** Bozze parziali = nessun capitolo.
2. **Scrivi prima la motivazione, poi il codice.** Per ogni demo, prima il *perché*, poi il *come*.
3. **Niente librerie nuove senza un capitolo che ne giustifichi l'introduzione.** Se la prima volta che serve è dentro il Cap. 22 (Fuse.js per fuzzy search), si introduce *lì* e si motiva nel commento.
4. **`prefers-reduced-motion` non è opzionale.** Mai.
5. **Lingua doppia, sempre.** IT (autentica) + EN (fedele) per ogni capitolo.

### Ordine consigliato — alternanza tematica

Per non stancarsi su un dominio, l'ordine alterna *componenti* (concentrati, micro), *editoriali* (riflessivi, di voce), *complessi* (immersivi, lunghi). Suggerimento di sequenza:

```
03 La voce del vuoto      ← editoriale
04 Il dialogo silenzioso  ← componente complesso
05 Lo scroll che racconta ← editoriale macro
06 Numeri che hanno peso  ← intermezzo tecnico
07 Anatomia di un input   ← componente
08 La micro-tipografia    ← editoriale puro
─── fine "primi 8" ───
09 Toggle                 ← componente
10 Toast                  ← componente
11 Menu                   ← complesso
12 Tab                    ← componente
13 Scheda                 ← componente
14 Divider                ← intermezzo zen
─── fine fase B ───
15 La pagina lunga        ← editoriale macro
16 La griglia editoriale  ← editoriale macro
17 La citazione           ← intermezzo
18 La nota a margine      ← editoriale
19 L'indice del libro     ← navigazione
20 Le immagini in editoria← editoriale
─── fine fase C ───
21 Drag & drop            ← complesso lungo
22 Ricerca                ← complesso
23 Calendario             ← complesso
24 Timeline               ← intermezzo macro
25 Il gesto               ← complesso
26 Il commiato            ← chiusura riflessiva
```

### Dipendenze trasversali

Alcuni capitoli **abilitano** altri. Quando arriva il momento del capitolo "alto" è bene aver chiuso la base.

```
Cap 04 (dialogo) ──→ Cap 11 (menu) ──→ Cap 22 (ricerca/combobox)
                                  └─→ Cap 23 (date picker UI)

Cap 05 (scroll)  ──→ Cap 15 (pagina lunga) ──→ Cap 24 (timeline)

Cap 02 (attesa)  ──→ Cap 10 (toast) ──→ Cap 22 (search results loading)
                                   └─→ Cap 26 (commiato — undo persistente)

Cap 07 (input)   ──→ Cap 22 (ricerca)
                ──→ Cap 23 (date picker input)

Cap 08 (typo)    ──→ Cap 17 (citazione)
                ──→ Cap 18 (nota a margine)
```

### Innesti dei "passi trasversali"

Tra capitoli si innestano i passi T1–T10 del piano principale (RSS già fatto, OG image, motion lab, type specimen, /colofone, ecc.). Suggerimenti:

| Quando | Innesto |
|--------|---------|
| Tra 02 → 03 | T10 (404 con voce) — diventa demo zero del Cap. 03 |
| Tra 03 → 04 | T9 (keyboard overlay) — preludio del Cap. 04 |
| Tra 06 → 07 | T6 (type-specimen) — banco di prova prima di entrare negli input |
| Tra 08 → 09 | T2 (OG image generate) — a 8 capitoli pubblicati ha senso |
| Tra 14 → 15 | T1 + T8 (colofone + sitemap) — il sito si "presenta" prima della Fase C |
| Tra 20 → 21 | T5 (motion lab) — documenta i preset prima dei capitoli motion-pesanti |

### Quality gate per ogni capitolo

Ogni capitolo si considera "pubblicabile" solo se passa:

- [ ] 4–6 demo finite, ciascuna con commento UX articolato
- [ ] MDX in IT **e** EN, identici per struttura e numero di demo
- [ ] Tutti i componenti hanno blocco `@media (prefers-reduced-motion: reduce)` esplicito
- [ ] Keyboard navigation completa (Tab, Enter/Space, Esc, Arrow se applicabile)
- [ ] `aria-*` corretti (verificato con DevTools accessibility tree)
- [ ] Zero CLS sulla pagina (Lighthouse o devtools Performance)
- [ ] Test manuale a 375px (mobile) e a 1280px (desktop)
- [ ] Reading time auto calcolato correttamente
- [ ] Voce dell'autore presente — ogni demo ha una motivazione articolata, non solo descrittiva

Non è una checklist burocratica: è il *minimo per essere onesti col lettore*.

### Quando interrompere

Il playground non è un'app a roadmap. Se a un certo punto la curiosità si sposta — un capitolo nuovo non in questa lista emerge spontaneamente — **si segue la curiosità**. Questa lista è una *mappa*, non un *contratto*.

Se tre capitoli di fila non danno energia, vuol dire che il dominio è esaurito (almeno per ora). Pausa. Forse il prossimo capitolo è un saggio scritto, un esperimento di cinque minuti, una pagina morta. Va bene.

---

*Quando aggiungi un capitolo nuovo non in questa lista, aggiornalo qui.
Quando uno di questi cambia natura (cresce, si fonde con un altro, si rompe in due), idem.
La roadmap migliore è quella che riflette l'autore di oggi, non quello di un anno fa.*
