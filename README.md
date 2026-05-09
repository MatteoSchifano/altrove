# Altrove

> *Tutto quello che succede senza che l'utente se ne accorga è la vera potenza della UX.
> Nel frattempo, lui è altrove — con la mente.*

Un laboratorio personale a capitoli su **UX, motion design e tipografia**. Ogni capitolo è un esperimento finito: un pattern, una famiglia di componenti, una domanda con la sua risposta articolata. Il tutto annotato — perché *questa* curva, perché *questo* timing, quando un pattern è onesto e quando mente all'utente.

> *A personal playground, in chapters, about UX, motion, and typography. Each chapter is a finished study — a pattern, a family of components, a question with its articulated answer. Everything annotated: why this curve, why this timing, when a pattern is honest and when it lies.*

---

## I capitoli

| # | Titolo · Title | Tema |
|---|----------------|------|
| 01 | [Anatomia di un bottone](src/content/chapters/it/01-anatomia-di-un-bottone.mdx) · [Anatomy of a button](src/content/chapters/en/01-anatomy-of-a-button.mdx) | Il gesto più elementare dell'UI |
| 02 | [L'arte dell'attesa](src/content/chapters/it/02-l-arte-dell-attesa.mdx) · [The art of waiting](src/content/chapters/en/02-the-art-of-waiting.mdx) | Skeleton, optimistic UI, retry silenziosi |
| 03–26 | *(la mappa lunga)* | vedi [`CAPITOLI.md`](./CAPITOLI.md) |

I capitoli crescono lentamente. Un capitolo finito al 100% vale più di tre capitoli a metà.

---

## Lo stack

| Tecnologia | Perché |
|------------|--------|
| [**Astro 6**](https://astro.build) | Content Collections per i capitoli, View Transitions native, Islands per le interazioni complesse |
| **CSS nativo** | `@layer`, OKLCH, `light-dark()`, `clamp()`, container queries — la palestra che cerco. Niente Tailwind, per scelta didattica |
| [**Motion**](https://motion.dev) | Spring physics, gesture, vanilla JS — niente overhead di framework |
| **Geist Variable** | Sans + Mono variabili, leggibili, calde quanto basta |
| **MDX** | I capitoli sono documenti con componenti dentro |

---

## In locale

Servono Node ≥ 22.12.

```bash
git clone https://github.com/MatteoSchifano/altrove.git
cd altrove
npm install
npm run dev
```

Il sito gira su `http://localhost:4321`. La home (l'*Atelier*) elenca i capitoli pubblicati; il toggle in alto a destra cambia lingua (IT ↔ EN) e tema (chiaro ↔ scuro ↔ sistema).

```bash
npm run build     # build di produzione in ./dist
npm run preview   # serve la build come la servirebbe il deploy
```

---

## Struttura

```
src/
├── content/
│   ├── chapters/
│   │   ├── it/   # capitoli in italiano (.mdx)
│   │   └── en/   # capitoli in inglese (.mdx)
│   └── content.config.ts
├── components/
│   ├── ChapterCard.astro      # la card "magnetic" della home
│   ├── Demo.astro              # wrapper editoriale per le esplorazioni
│   ├── buttons/                # demo del Cap. 01
│   └── waiting/                # demo del Cap. 02
├── layouts/
│   ├── Base.astro              # html shell, fonts, view transitions
│   ├── Chapter.astro           # layout editoriale del capitolo
│   └── HomePage.astro          # l'Atelier
├── lib/
│   ├── i18n.ts                 # dizionario UI bilingue
│   ├── motion.ts               # spring preset + helper riusabili
│   └── readingTime.ts          # calcolo automatico minuti di lettura
├── pages/
│   ├── index.astro             # home IT
│   ├── rss.xml.ts              # feed IT
│   ├── chapters/[slug].astro   # render dinamico capitoli IT
│   └── en/                     # mirror inglese
└── styles/
    ├── tokens.css              # il DNA del design system
    ├── reset.css               # reset moderno
    ├── typography.css          # scala fluida, font-features
    └── global.css              # @layer base / components / utilities
```

---

## Bilingue

Il progetto è in **italiano** (lingua madre del pensiero) e in **inglese** (lingua del web). Ogni capitolo esiste in entrambe le lingue, con la stessa struttura e lo stesso numero di demo. Il toggle `IT / EN` è sempre visibile, sempre funzionante.

L'italiano è il default sulla root; l'inglese vive sotto `/en/`. I feed RSS seguono la stessa convenzione: `/rss.xml` e `/en/rss.xml`.

---

## Filosofia

Le interfacce migliori sono invisibili. Non si celebrano, non chiedono attenzione. Lavorano in silenzio mentre l'utente pensa ad altro — uno skeleton screen che compare istantaneamente, un bottone che risponde prima della rete, un'immagine che ha già forma prima di esistere. Atti di rispetto verso il tempo e l'attenzione di chi guarda.

Il manifesto completo del progetto è in [`MISSION.md`](./MISSION.md). I principi di lavoro che guidano ogni capitolo:

- **Un capitolo alla volta, finito al 100% prima del prossimo.**
- **Scrivi prima la motivazione, poi il codice.**
- **`prefers-reduced-motion` non è opzionale.**
- **Resisti alle librerie.** La palestra è scrivere CSS con `@layer`, `clamp()`, custom properties, container queries.
- **Il motion si misura in millisecondi, non a sentimento.** Quattro preset (subtle / gentle / snappy / expressive), usati con coerenza.

---

## Roadmap

I prossimi 24 capitoli sono mappati in [`CAPITOLI.md`](./CAPITOLI.md), divisi in tre fasi:

- **Fase B · Componenti primari** — toggle, toast, menu, tab, scheda, divider.
- **Fase C · Pattern editoriali** — pagina lunga, griglia, citazione, nota a margine, indice, immagini in editoria.
- **Fase D · Pattern complessi** — drag & drop, ricerca, calendario, timeline, gesto, commiato.

L'ordine non è un contratto. È una mappa che riflette l'autore di oggi, non quello di un anno fa.

---

## Cosa **non** è

- Non è un design system da distribuire
- Non è un framework, una libreria, uno starter kit
- Non è una raccolta di "best practices" universali
- Non è fatto per impressionare — è fatto per capire

---

## Contributi

Altrove è un viaggio personale. Issue per **segnalare bug d'accessibilità** o **errori di traduzione** sono benvenute; pull request feature non lo sono — il progetto vive nella scelta consapevole di chi scrive, non nella crescita per accumulazione.

---

## Licenza

Codice rilasciato sotto licenza **MIT**.
Testi dei capitoli (file `.mdx` in `src/content/`): **CC BY-NC 4.0** — condivisi liberamente, non per uso commerciale.

---

*Altrove è un viaggio lento. La destinazione non è importante quanto il fatto di essere in movimento.*
