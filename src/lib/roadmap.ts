/* ─────────────────────────────────────────────────────────────
   Altrove · roadmap.ts

   Mappa completa dei 26 capitoli del libro — quelli pubblicati e
   quelli in programma. È la sorgente di verità per il *piano*:
   titolo, fase, domanda guida, stato. I capitoli pubblicati hanno
   anche un MDX reale in `src/content/chapters/<lang>/`; il merge
   con la Content Collection avviene a render-time tramite
   `mergeWithCollection`.

   Sorgente editoriale: CAPITOLI.md alla radice del repo. Cambiando
   uno status qui, ricordarsi di allineare CAPITOLI.md (e viceversa).

   Convenzioni
   - `number` è una stringa padded ("01"…"26"), coerente con gli MDX.
   - `translationKey` è la stessa chiave usata negli MDX frontmatter
     (es. "chapter-01"), così il join con `getCollection('chapters')`
     è O(1).
   - `effort` (1–4) è la stima in weekend da CAPITOLI.md. Esposta
     come puntini opachi accanto al numero, non come tempo assoluto:
     è una densità relativa, non un appuntamento.
   ───────────────────────────────────────────────────────────── */

import type { CollectionEntry } from 'astro:content';
import { localizedPath, type Locale } from './i18n';

export type Phase = 'A' | 'B' | 'C' | 'D';
export type Status = 'published' | 'next' | 'planned';

export interface RoadmapEntry {
  /** "01"…"26", padded come negli MDX. */
  number: string;
  /** Chiave di traduzione condivisa con gli MDX (es. "chapter-01"). */
  translationKey: string;
  phase: Phase;
  status: Status;
  title: Record<Locale, string>;
  /** Domanda guida del capitolo — la stessa che apre ogni MDX. */
  question: Record<Locale, string>;
  /** Weekend stimati (1–4). Reso come N puntini accanto al numero. */
  effort?: 1 | 2 | 3 | 4;
}

export const PHASE_LABEL: Record<Phase, Record<Locale, string>> = {
  A: { it: 'Fase A · Primi 8 capitoli',     en: 'Phase A · First 8 chapters' },
  B: { it: 'Fase B · Componenti primari',   en: 'Phase B · Primary components' },
  C: { it: 'Fase C · Pattern editoriali',   en: 'Phase C · Editorial patterns' },
  D: { it: 'Fase D · Pattern complessi',    en: 'Phase D · Complex patterns' },
};

export const ROADMAP: readonly RoadmapEntry[] = [
  /* ── Fase A · Primi 8 capitoli ──────────────────────────── */
  {
    number: '01',
    translationKey: 'chapter-01',
    phase: 'A',
    status: 'published',
    title: { it: 'Anatomia di un bottone', en: 'The anatomy of a button' },
    question: {
      it: 'Cosa rende affidabile il gesto più elementare dell’interfaccia?',
      en: 'What makes the most elementary gesture of the interface trustworthy?',
    },
  },
  {
    number: '02',
    translationKey: 'chapter-02',
    phase: 'A',
    status: 'published',
    title: { it: 'L’arte dell’attesa', en: 'The art of waiting' },
    question: {
      it: 'Come si rende l’attesa un atto di rispetto?',
      en: 'How do you turn waiting into an act of respect?',
    },
  },
  {
    number: '03',
    translationKey: 'chapter-03',
    phase: 'A',
    status: 'published',
    title: { it: 'La voce del vuoto', en: 'The voice of emptiness' },
    question: {
      it: 'Come parla un’interfaccia quando non ha nulla da mostrare?',
      en: 'How does an interface speak when it has nothing to show?',
    },
  },
  {
    number: '04',
    translationKey: 'chapter-04',
    phase: 'A',
    status: 'published',
    title: { it: 'Il dialogo silenzioso', en: 'The silent dialogue' },
    question: {
      it: 'Come si interrompe l’utente senza fare rumore?',
      en: 'How do you interrupt the user without making noise?',
    },
  },
  {
    number: '05',
    translationKey: 'chapter-05',
    phase: 'A',
    status: 'published',
    title: { it: 'Lo scroll che racconta', en: 'The scroll that tells a story' },
    question: {
      it: 'Cosa può dire un’interfaccia con il solo gesto dello scroll?',
      en: 'What can an interface say with the gesture of scrolling alone?',
    },
  },
  {
    number: '06',
    translationKey: 'chapter-06',
    phase: 'A',
    status: 'published',
    title: { it: 'Numeri che hanno peso', en: 'Numbers that weigh' },
    question: {
      it: 'Quando una cifra è informazione e quando è rumore?',
      en: 'When is a digit information, and when is it noise?',
    },
  },
  {
    number: '07',
    translationKey: 'chapter-07',
    phase: 'A',
    status: 'published',
    title: { it: 'Anatomia di un input', en: 'The anatomy of an input' },
    question: {
      it: 'Come ascolta un campo, mentre l’utente scrive?',
      en: 'How does a field listen, while the user writes?',
    },
  },
  {
    number: '08',
    translationKey: 'chapter-08',
    phase: 'A',
    status: 'next',
    title: { it: 'La micro-tipografia', en: 'Micro-typography' },
    question: {
      it: 'Dove finisce la lettera e dove comincia il ritmo?',
      en: 'Where does the letter end and the rhythm begin?',
    },
    effort: 2,
  },

  /* ── Fase B · Componenti primari (09–14) ────────────────── */
  {
    number: '09',
    translationKey: 'chapter-09',
    phase: 'B',
    status: 'planned',
    title: { it: 'Anatomia di un toggle', en: 'The anatomy of a toggle' },
    question: {
      it: 'La differenza tra un bottone e uno switch è solo grafica?',
      en: 'Is the difference between a button and a switch only visual?',
    },
    effort: 2,
  },
  {
    number: '10',
    translationKey: 'chapter-10',
    phase: 'B',
    status: 'planned',
    title: { it: 'Anatomia di un toast', en: 'The anatomy of a toast' },
    question: {
      it: 'Come si dà un’informazione senza interrompere?',
      en: 'How do you deliver information without interrupting?',
    },
    effort: 2,
  },
  {
    number: '11',
    translationKey: 'chapter-11',
    phase: 'B',
    status: 'planned',
    title: { it: 'Anatomia di un menu', en: 'The anatomy of a menu' },
    question: {
      it: 'Come si offre una scelta senza nascondere il contesto?',
      en: 'How do you offer a choice without hiding the context?',
    },
    effort: 3,
  },
  {
    number: '12',
    translationKey: 'chapter-12',
    phase: 'B',
    status: 'planned',
    title: { it: 'Anatomia di una tab', en: 'The anatomy of a tab' },
    question: {
      it: 'Come si cambia contesto senza disorientare?',
      en: 'How do you change context without disorientating?',
    },
    effort: 2,
  },
  {
    number: '13',
    translationKey: 'chapter-13',
    phase: 'B',
    status: 'planned',
    title: { it: 'Anatomia di una scheda', en: 'The anatomy of a card' },
    question: {
      it: 'La card è solo un rettangolo con bordo?',
      en: 'Is a card really just a rectangle with a border?',
    },
    effort: 2,
  },
  {
    number: '14',
    translationKey: 'chapter-14',
    phase: 'B',
    status: 'planned',
    title: { it: 'Anatomia di un divider', en: 'The anatomy of a divider' },
    question: {
      it: 'Il silenzio nella pagina si disegna o si lascia accadere?',
      en: 'Is silence in the page drawn, or simply allowed to happen?',
    },
    effort: 1,
  },

  /* ── Fase C · Pattern editoriali (15–20) ────────────────── */
  {
    number: '15',
    translationKey: 'chapter-15',
    phase: 'C',
    status: 'planned',
    title: { it: 'La pagina lunga', en: 'The long page' },
    question: {
      it: 'Come si tiene compagnia a chi legge per dieci minuti?',
      en: 'How do you keep company with someone reading for ten minutes?',
    },
    effort: 3,
  },
  {
    number: '16',
    translationKey: 'chapter-16',
    phase: 'C',
    status: 'planned',
    title: { it: 'La griglia editoriale', en: 'The editorial grid' },
    question: {
      it: 'Cosa rende una pagina elegante prima ancora di essere bella?',
      en: 'What makes a page elegant before it’s even beautiful?',
    },
    effort: 3,
  },
  {
    number: '17',
    translationKey: 'chapter-17',
    phase: 'C',
    status: 'planned',
    title: { it: 'La citazione', en: 'The quotation' },
    question: {
      it: 'Quando si dà la parola a qualcun altro, come la si presenta?',
      en: 'When giving the floor to someone else, how do you introduce them?',
    },
    effort: 1,
  },
  {
    number: '18',
    translationKey: 'chapter-18',
    phase: 'C',
    status: 'planned',
    title: { it: 'La nota a margine', en: 'The side note' },
    question: {
      it: 'Come si dialoga col proprio lettore senza interrompere il filo?',
      en: 'How do you talk to your reader without breaking the thread?',
    },
    effort: 2,
  },
  {
    number: '19',
    translationKey: 'chapter-19',
    phase: 'C',
    status: 'planned',
    title: { it: 'L’indice del libro', en: 'The book’s index' },
    question: {
      it: 'Un sito che parla di sé, come si orienta al suo interno?',
      en: 'A site that talks about itself — how do you find your way inside it?',
    },
    effort: 2,
  },
  {
    number: '20',
    translationKey: 'chapter-20',
    phase: 'C',
    status: 'planned',
    title: { it: 'Le immagini in editoria', en: 'Images in editorial design' },
    question: {
      it: 'Quando un’immagine è informazione e quando è respiro?',
      en: 'When is an image information, and when is it breath?',
    },
    effort: 3,
  },

  /* ── Fase D · Pattern complessi (21–26) ─────────────────── */
  {
    number: '21',
    translationKey: 'chapter-21',
    phase: 'D',
    status: 'planned',
    title: { it: 'Il drag e il drop', en: 'Drag and drop' },
    question: {
      it: 'Come si tiene un oggetto in volo?',
      en: 'How do you hold an object in flight?',
    },
    effort: 4,
  },
  {
    number: '22',
    translationKey: 'chapter-22',
    phase: 'D',
    status: 'planned',
    title: { it: 'La ricerca tipo-as-you-go', en: 'Type-as-you-go search' },
    question: {
      it: 'Cosa succede tra ogni tasto premuto?',
      en: 'What happens between each keystroke?',
    },
    effort: 3,
  },
  {
    number: '23',
    translationKey: 'chapter-23',
    phase: 'D',
    status: 'planned',
    title: { it: 'Il calendario', en: 'The calendar' },
    question: {
      it: 'Come si chiede una data senza odiare il browser?',
      en: 'How do you ask for a date without hating the browser?',
    },
    effort: 3,
  },
  {
    number: '24',
    translationKey: 'chapter-24',
    phase: 'D',
    status: 'planned',
    title: { it: 'La timeline', en: 'The timeline' },
    question: {
      it: 'Il tempo come oggetto visuale, non come tabella.',
      en: 'Time as a visual object, not a table.',
    },
    effort: 2,
  },
  {
    number: '25',
    translationKey: 'chapter-25',
    phase: 'D',
    status: 'planned',
    title: { it: 'Il gesto', en: 'The gesture' },
    question: {
      it: 'Cosa cambia quando l’interfaccia si tocca, invece di cliccarla?',
      en: 'What changes when the interface is touched, not clicked?',
    },
    effort: 3,
  },
  {
    number: '26',
    translationKey: 'chapter-26',
    phase: 'D',
    status: 'planned',
    title: { it: 'Il commiato', en: 'The farewell' },
    question: {
      it: 'Come si lascia andare un utente?',
      en: 'How do you let a user go?',
    },
    effort: 2,
  },
] as const;

/* ═══════════ Helpers ═══════════ */

export interface MergedRoadmapEntry extends RoadmapEntry {
  /** Path canonico del capitolo se pubblicato, altrimenti null. */
  href: string | null;
  /** Slug del capitolo (per eventuale view-transition-name lato chiamante). */
  slug: string | null;
  /** Minuti di lettura, se forniti dal frontmatter MDX. */
  readMinutes?: number;
}

/**
 * Combina la roadmap statica con la Content Collection. Per i capitoli
 * `published` cerca l'MDX corrispondente alla locale richiesta e ne
 * estrae `href` + `slug` + `readMinutes`. Per gli altri stati ritorna
 * `href: null`.
 *
 * Non muta la roadmap; produce un nuovo array, ordinato per `number`.
 */
export function mergeWithCollection(
  chapters: ReadonlyArray<CollectionEntry<'chapters'>>,
  locale: Locale,
): MergedRoadmapEntry[] {
  const byKey = new Map<string, CollectionEntry<'chapters'>>();
  for (const c of chapters) {
    if (c.data.lang !== locale) continue;
    byKey.set(c.data.translationKey, c);
  }

  return ROADMAP.map((entry) => {
    if (entry.status !== 'published') {
      return { ...entry, href: null, slug: null };
    }
    const found = byKey.get(entry.translationKey);
    if (!found) {
      // Pubblicato secondo la roadmap ma manca l'MDX nella locale:
      // degrada a "planned" per coerenza con quel che l'utente vede.
      // Capita in due casi: (a) traduzione assente in una locale,
      // (b) il branch corrente è ancora dietro al merge del capitolo.
      return { ...entry, status: 'planned' as const, href: null, slug: null };
    }
    const slug = found.id.startsWith(`${locale}/`)
      ? found.id.slice(locale.length + 1)
      : found.id;
    return {
      ...entry,
      href: localizedPath(`/chapters/${slug}`, locale),
      slug,
      readMinutes: found.data.readMinutes,
    };
  }).sort((a, b) => Number(a.number) - Number(b.number));
}
