# Altrove

> *Tutto quello che succede senza che l'utente se ne accorga è la vera potenza della UX.  
> Nel frattempo, lui è altrove — con la mente.*

---

## Cos'è

**Altrove** è un laboratorio personale a capitoli. Non è un'app da spedire, non è un portfolio da mostrare ai recruiter: è uno spazio dove esplorare cosa rende un'interfaccia veramente buona — nel dettaglio, nel ritmo, nel silenzio tra un'azione e l'altra.

Ogni capitolo è un esperimento finito: un pattern UX, una famiglia di componenti, una domanda senza risposta scontata. Il tutto annotato con le motivazioni — perché *questa* curva di easing? perché *questo* timing? quando questo pattern è onesto e quando mente all'utente?

---

## La filosofia

La UX migliore è invisibile. Non si celebra da sola, non attira l'attenzione. Lavora — in silenzio, per conto dell'utente — mentre lui pensa ad altro.

Uno skeleton screen che compare istantaneamente. Un bottone che risponde prima della rete. Un'immagine che ha già forma prima di esistere. Sono tutti atti di rispetto verso il tempo e l'attenzione di chi usa l'interfaccia.

*Altrove* esplora questi atti, uno per volta.

---

## Il formato

Ogni capitolo segue lo stesso ritmo editoriale:

```
titolo + domanda centrale
↓
una serie di Demo interattive
↓
note UX: la motivazione dietro ogni scelta
↓
appunti sulle decisioni difficili
```

Le Demo sono componenti reali, costruiti con cura. Non screenshot, non mockup: cose che si toccano, che reagiscono, che si rompono in modo degno se qualcosa va storto.

---

## I capitoli

| # | Titolo | Tema |
|---|--------|------|
| 01 | Anatomia di un bottone | Il gesto più elementare dell'UI |
| 02 | L'arte dell'attesa | Loading, skeleton, optimistic UI |
| 03–26 | *(la mappa lunga)* | vedi [`CAPITOLI.md`](./CAPITOLI.md) |

I capitoli crescono lentamente. Un capitolo completo vale più di tre capitoli a metà.

---

## I principi di lavoro

**Un capitolo alla volta, finito al 100% prima del prossimo.**  
Il playground si valuta dalla rifinitura, non dal numero di capitoli.

**Scrivi prima la motivazione, poi il codice.**  
Per ogni interazione, articolare a parole *perché* prima di implementare. Se non riesci a spiegarlo, forse non l'hai capito ancora.

**`prefers-reduced-motion` non è opzionale.**  
Ogni animazione ha un fallback statico dignitoso. L'accessibilità non è un layer aggiunto dopo — è parte del design.

**Resisti alle librerie.**  
Tailwind, shadcn, Radix — tutte cose utili altrove. Qui la palestra è scrivere CSS con `@layer`, `clamp()`, custom properties, container queries. La comprensione non si bypassa.

**Il motion si misura in millisecondi, non a sentimento.**  
Quattro preset (subtle / gentle / snappy / expressive), usati con coerenza. Niente curve inventate all'ultimo momento.

---

## Lo stack

| Tecnologia | Perché |
|------------|--------|
| **Astro 6** | Content Collections mappano i capitoli, View Transitions API per le animazioni di navigazione, Islands per le interazioni complesse |
| **CSS nativo** | `@layer`, OKLCH, `light-dark()`, `clamp()`, container queries — la palestra che cerco |
| **Motion** (motion.dev) | Spring physics, gesture, vanilla JS — niente overhead di framework |
| **Geist Variable** | Sans + Mono, variable font, clean senza essere freddo |
| **MDX** | I capitoli sono documenti con componenti dentro — il formato giusto per contenuto editoriale con demo interattive |

---

## Bilingue

Il progetto è in italiano (lingua madre del pensiero) e in inglese (lingua del web).  
Ogni capitolo esiste in entrambe le lingue. Il toggle `IT / EN` è sempre visibile, sempre funzionante.

L'italiano è il default — la voce autentica. L'inglese è la traduzione fedele.

---

## Cosa non è

- Non è un design system da distribuire
- Non è un framework, una libreria, o uno starter kit
- Non è una raccolta di "best practices" universali
- Non è fatto per impressionare — è fatto per capire

---

*Altrove è un viaggio lento. La destinazione non è importante quanto il fatto di essere in movimento.*
