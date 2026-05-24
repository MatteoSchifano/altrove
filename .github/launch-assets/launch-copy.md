# Launch copy · Altrove

Questo file vive solo in locale (e in repo come riferimento). Contiene la copy
in tre lunghezze e i template per il lancio Tier 1 — Bluesky, X, newsletter,
showcase. Adattalo prima di postare/inviare, non copiare meccanicamente.

---

## Tre lunghezze, una voce

### 80 caratteri (slot stretti)
```
Un playground a capitoli su UX, motion design e tipografia.
```
(58 char — margine sicuro)

### 160 caratteri (twitter bio, newsletter brief)
```
Un playground a capitoli su UX, motion design e tipografia. Ogni capitolo è un esperimento finito, annotato. Astro + CSS nativo, no Tailwind.
```
(142 char)

### Paragrafo lungo (Sidebar, Godly, Hover States, pitch newsletter)
```
Altrove è un playground a capitoli su UX, motion design e tipografia.
Ogni capitolo è un esperimento finito — un pattern, una famiglia di
componenti, una domanda con la sua risposta articolata. Il tutto annotato:
perché questa curva, perché questo timing, quando un pattern è onesto e
quando mente all'utente.

Costruito con Astro 6, CSS nativo (no Tailwind), Motion e View Transitions.
La filosofia è semplice: la UX migliore lascia l'utente essere altrove con
la mente — perché l'interfaccia lavora per lui.
```

---

## Bluesky · thread di lancio (6 post)

> Tono: filosofico, asciutto. Niente emoji corporate, niente "🚀 launching".
> Hashtag solo se rilevanti, mai più di due.

**Post 1 / hook**
```
"La UX migliore lascia l'utente essere altrove con la mente —
perché l'interfaccia lavora per lui."

Ho aperto un playground a capitoli su UX, motion e tipografia.
Si chiama Altrove.

→ altrove.dev
```
*(allega: screenshot home)*

**Post 2 / cos'è**
```
Non è un portfolio.
Non è un design system.
È una serie di esperimenti finiti — un pattern, una micro-interazione,
una domanda con la sua risposta annotata.

Un capitolo alla volta. Finito al 100% prima del prossimo.
```

**Post 3 / perché**
```
Stack scelto per imparare, non per spedire veloce:
Astro 6, CSS nativo (no Tailwind), Motion, View Transitions API.

Niente UI kit, niente starter. La palestra è scrivere @layer,
clamp(), container queries, custom properties.
```

**Post 4 / capitolo 01**
```
Capitolo 01 — Anatomia di un bottone.
Il gesto più elementare dell'UI, smontato pezzo per pezzo:
timing, feedback, stati, view-transition.

→ altrove.dev/chapters/01-anatomia-di-un-bottone
```
*(allega: GIF della micro-animation principale del bottone)*

**Post 5 / capitolo 02**
```
Capitolo 02 — L'arte dell'attesa.
Skeleton, optimistic UI, retry silenziosi. Come si abita
il tempo morto della rete senza far sentire l'utente in attesa.

→ altrove.dev/chapters/02-l-arte-dell-attesa
```
*(allega: GIF dello skeleton → contenuto)*

**Post 6 / CTA aperta**
```
La mappa lunga è 24 capitoli ma l'ordine non è un contratto.
Quale di questi vorresti vedere prossimo?
— toggle, toast, menu, drag&drop, calendario, gesto

Rispondimi, mi aiuta a decidere.
```

---

## X / Twitter · adattamento

Cambia struttura: su X il primo post deve essere **media + 1 frase**, non un
thread che si srotola subito. Crea curiosità, poi thread in risposta a te
stesso.

**Post 1 (con GIF allegata)**
```
Ho aperto un playground a capitoli su UX, motion e tipografia.
La UX migliore lavora in silenzio.

altrove.dev
```

**Post 2 (replica al post 1, inizia il thread)**
```
Cos'è e perché ↓
```
*(poi riprendi i post 2-6 di Bluesky, condensati)*

---

## Newsletter · template di submission

Adatta per ogni newsletter — non mandare lo stesso testo a tutte.

### Frontend Focus / CSS Weekly (form-based)
```
Link: https://altrove.dev/chapters/01-anatomia-di-un-bottone

Title: Anatomy of a button (Altrove)

Description (1-2 sentences):
A close reading of the most elemental UI gesture — timing, feedback,
states, view-transitions — written as the first chapter of an ongoing
playground on UX and motion. Built with Astro, CSS native, and Motion.
```

### The Slowdown / The Spindle (tono riflessivo)
```
Link: https://altrove.dev

Description:
Altrove is a slow playground on UX, motion design and typography —
each chapter a finished study, annotated. The first two chapters
explore the anatomy of a button and the choreography of waiting.
A small atelier built in public, one chapter at a time.
```

### Smashing / Web Curios (pitch via email, no form)
**Oggetto:** Altrove · a slow playground on UX & motion (chapter 01 live)
```
Ciao [nome],

Mi presento — sono Matteo, frontend dev. Ho appena aperto Altrove
(altrove.dev), un playground "a capitoli" su UX, motion e tipografia.
Ogni capitolo è un esperimento finito e annotato.

Il primo capitolo è uno smontaggio del bottone — timing, feedback,
view-transition — pensato come riferimento, non come tutorial.

Se lo trovate adatto a [Smashing / Web Curios], ne sarei felice.
Vi mando il link e basta: altrove.dev/chapters/01-anatomia-di-un-bottone

Grazie del tempo,
Matteo
```

---

## Showcase / Directory · campi standard

Quasi tutte queste richiedono URL + screenshot + descrizione + categoria.

**URL:** https://altrove.dev
**Screenshot:** usa quelli HD in questa cartella (2880×1800 retina)
**Tagline corta:** *Un playground a capitoli su UX, motion e tipografia.*
**Descrizione lunga:** vedi paragrafo lungo all'inizio di questo file
**Categorie:** Portfolio · Personal site · Editorial · Motion · Design system
**Tags:** Astro · CSS · Motion · Italian · Bilingual · View Transitions
**Author:** Matteo Schifano — github.com/MatteoSchifano

---

## Asset checklist (da preparare prima del lancio)

- [ ] Screenshot home (light + dark, retina 2880×1800)
- [ ] Screenshot capitolo 01 (frame "dopo" della micro-animation)
- [ ] Screenshot capitolo 02 (frame skeleton → contenuto)
- [ ] GIF View Transition home → capitolo (≤5MB, ≤8s) — il money shot
- [ ] GIF micro-animation bottone capitolo 01 (≤3MB, ≤5s)
- [ ] MP4 versione HD della stessa transition per X
- [ ] og:image dedicata al capitolo che lancerai (override del default)

---

## Calendario di lancio (riferimento — adattare al rilascio cap. 02)

**Settimana -1**
- Genera asset (sopra)
- Verifica tecnica: opengraph.xyz, schema validator, PageSpeed
- Bozza dei post salvati qui

**Settimana 1 — soft launch**
- Giorno 1 (martedì o mercoledì, mai lunedì né venerdì): thread Bluesky
- Giorno 2: thread X (NON simultaneo — vuoi il primo che converte)
- Giorno 3: submission Sidebar.io + Hover States
- Giorno 5: submission Godly
- Giorno 7: primo "making-of" post detail su Bluesky

**Settimana 2**
- Giorno 10: submission Frontend Focus
- Giorno 12: submission The Slowdown + The Spindle
- Cadenza Bluesky: 3 post a settimana

**Settimana 3**
- Giorno 17: submission CSS Weekly
- Giorno 20: devlog medio-lungo come contenuto evergreen

---

## Cosa NON fare

- ❌ No Product Hunt (pubblico sbagliato — cerca SaaS, non portfolio)
- ❌ No Show HN (brutale, off-target, brucia la bullet una sola volta)
- ❌ No LinkedIn post lunghi (pubblico sbagliato)
- ❌ No DM massivi
- ❌ No sollecitare RT/like
- ❌ No emoji-spam, no thread con "🧵👇"
- ❌ No "share if you agree" / "RT for reach"
- ❌ No scheduling automatico (Buffer/Hootsuite) — la community sgama
