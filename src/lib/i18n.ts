/* ─────────────────────────────────────────────────────────────
   Altrove · i18n.ts

   Tabella semplice di stringhe UI per ogni locale, più i helper
   `t()`, `localizedPath()` e `getOtherLocales()`.

   Convenzioni
   - L'italiano è la lingua canonica del progetto (default).
   - Le chiavi sono nominate con punti, es. "header.indexLink".
   - Aggiungere una chiave qui significa aggiungerla in TUTTE le
     locale: la firma di `t` è tipata per garantirlo.
   - Per i contenuti dei capitoli, le traduzioni vivono nei file
     MDX di `src/content/chapters/<lang>/`, non qui.
   ───────────────────────────────────────────────────────────── */

export const LOCALES = ['it', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'it';

const dictionary = {
  it: {
    'site.title': 'Altrove · un playground a capitoli',
    'site.description':
      "Un viaggio personale di UX, motion design e tipografia. La UX migliore lascia l'utente essere altrove con la mente — perché lei lavora per lui.",
    'header.homeLabel': 'Altrove · home',
    'header.indexLink': 'Indice',
    'header.themeAria': 'Cambia tema',
    'header.themeSystem': 'Tema sistema',
    'header.themeLight': 'Tema chiaro',
    'header.themeDark': 'Tema scuro',
    'header.langAria': 'Cambia lingua',
    'home.eyebrow': 'Un playground a capitoli',
    'home.title': 'Altrove.',
    'home.lede': 'Un viaggio personale di UX, motion design e tipografia.',
    'home.manifestoBefore': "La UX migliore lascia l'utente essere altrove con la mente — ",
    'home.manifestoEm': 'perché lei lavora per lui',
    'home.manifestoAfter':
      ". Tutto quello che succede senza che l'utente se ne accorga è la vera potenza dell'interfaccia. Qui ne raccolgo i frammenti, un capitolo alla volta.",
    'home.ctaRead': 'Leggi i capitoli',
    'home.ctaSource': 'Il codice su GitHub',
    'home.specLabel': 'Specimen · motion',
    'home.specButton': 'Premi qui',
    'home.specCaption': 'Si solleva, poi si schiaccia. Misurato, non a sentimento.',
    'home.specMetaA': 'spring · snappy',
    'home.specMetaB': '180ms · ease-out',
    'home.statementLead': 'Le interfacce migliori sono invisibili. Lavorano in silenzio mentre la tua mente è ',
    'home.statementEm': 'altrove',
    'home.statementTail': '.',
    'home.principlesEyebrow': 'Come lavoro',
    'home.principlesTitle': 'Pochi vincoli, tenuti con disciplina.',
    'home.principle1Title': 'Un capitolo alla volta',
    'home.principle1Body':
      'Finito al 100% prima del prossimo. Un capitolo intero vale più di tre lasciati a metà.',
    'home.principle2Title': 'Prima la motivazione',
    'home.principle2Body':
      'Si scrive il perché prima del codice. Perché questa curva, perché questo timing.',
    'home.principle3Title': 'Il motion in millisecondi',
    'home.principle3Body':
      'Quattro preset di spring, durate con un nome. Si misura, non si va a sentimento.',
    'home.principle4Title': 'Reduced-motion non è opzionale',
    'home.principle4Body':
      'Ogni animazione collassa con grazia. Niente librerie: solo CSS, clamp e container query.',
    'home.colophonTitle': 'Cosa non è',
    'home.notA1': 'Un design system da distribuire',
    'home.notA2': 'Un framework, una libreria, uno starter',
    'home.notA3': 'Una raccolta di best practice universali',
    'home.notA4': 'Fatto per impressionare. È fatto per capire.',
    'home.stackNote': 'Astro, CSS nativo, Motion. Epilogue e Inconsolata. Niente Tailwind, niente UI kit.',
    'home.chaptersTitle': 'Capitoli',
    'home.chaptersHintOne': 'esplorazione finita',
    'home.chaptersHintMany': 'esplorazioni finite',
    'home.roadmapTitle': 'Roadmap',
    'home.roadmapLede': 'Dove sta andando il libro.',
    'roadmap.phase.A': 'Fase A · Primi 8 capitoli',
    'roadmap.phase.B': 'Fase B · Componenti primari',
    'roadmap.phase.C': 'Fase C · Pattern editoriali',
    'roadmap.phase.D': 'Fase D · Pattern complessi',
    'roadmap.statusNext': 'Prossimo',
    'roadmap.statusPlanned': 'In programma',
    'roadmap.notYetPublished': 'Capitolo non ancora pubblicato',
    'card.chapter': 'Capitolo',
    'card.minutes': 'min',
    'chapter.chapter': 'Capitolo',
    'chapter.readingTime': 'min di lettura',
    'chapter.readingTimeJoiner': '·',
    'footer.signature': 'Costruito lentamente, con cura.',
    'footer.backHome': "← Torna all'indice",
    'footer.year': '2026 →',
  },
  en: {
    'site.title': 'Altrove · a playground in chapters',
    'site.description':
      'A personal journey through UX, motion design and typography. The best UX lets the user be elsewhere in their mind — because the interface is doing the work.',
    'header.homeLabel': 'Altrove · home',
    'header.indexLink': 'Index',
    'header.themeAria': 'Change theme',
    'header.themeSystem': 'System theme',
    'header.themeLight': 'Light theme',
    'header.themeDark': 'Dark theme',
    'header.langAria': 'Change language',
    'home.eyebrow': 'A playground in chapters',
    'home.title': 'Altrove.',
    'home.lede': 'A personal journey through UX, motion design and typography.',
    'home.manifestoBefore': 'The best UX lets the user be elsewhere in their mind — ',
    'home.manifestoEm': 'because the interface is doing the work',
    'home.manifestoAfter':
      ". Everything that happens without the user noticing is the real power of an interface. Here I collect its fragments, one chapter at a time.",
    'home.ctaRead': 'Read the chapters',
    'home.ctaSource': 'Source on GitHub',
    'home.specLabel': 'Specimen · motion',
    'home.specButton': 'Press me',
    'home.specCaption': 'It lifts, then it presses. Measured, not by feel.',
    'home.specMetaA': 'spring · snappy',
    'home.specMetaB': '180ms · ease-out',
    'home.statementLead': 'The best interfaces are invisible. They work in silence while your mind is ',
    'home.statementEm': 'elsewhere',
    'home.statementTail': '.',
    'home.principlesEyebrow': 'How the work is made',
    'home.principlesTitle': 'A few constraints, kept with discipline.',
    'home.principle1Title': 'One chapter at a time',
    'home.principle1Body':
      'Finished completely before the next one. One whole chapter beats three left half-done.',
    'home.principle2Title': 'Motivation first',
    'home.principle2Body':
      'The why gets written before the code. Why this curve, why this timing.',
    'home.principle3Title': 'Motion in milliseconds',
    'home.principle3Body':
      'Four spring presets, durations with a name. Measured, never left to feel.',
    'home.principle4Title': 'Reduced-motion is not optional',
    'home.principle4Body':
      'Every animation degrades with grace. No libraries: just CSS, clamp and container queries.',
    'home.colophonTitle': 'What it is not',
    'home.notA1': 'A design system to ship',
    'home.notA2': 'A framework, a library, a starter',
    'home.notA3': 'A collection of universal best practices',
    'home.notA4': 'Made to impress. It is made to understand.',
    'home.stackNote': 'Astro, native CSS, Motion. Epilogue and Inconsolata. No Tailwind, no UI kit.',
    'home.chaptersTitle': 'Chapters',
    'home.chaptersHintOne': 'finished exploration',
    'home.chaptersHintMany': 'finished explorations',
    'home.roadmapTitle': 'Roadmap',
    'home.roadmapLede': 'Where the book is going.',
    'roadmap.phase.A': 'Phase A · First 8 chapters',
    'roadmap.phase.B': 'Phase B · Primary components',
    'roadmap.phase.C': 'Phase C · Editorial patterns',
    'roadmap.phase.D': 'Phase D · Complex patterns',
    'roadmap.statusNext': 'Next',
    'roadmap.statusPlanned': 'In the roadmap',
    'roadmap.notYetPublished': 'Chapter not yet published',
    'card.chapter': 'Chapter',
    'card.minutes': 'min',
    'chapter.chapter': 'Chapter',
    'chapter.readingTime': 'min read',
    'chapter.readingTimeJoiner': '·',
    'footer.signature': 'Built slowly, with care.',
    'footer.backHome': '← Back to index',
    'footer.year': '2026 →',
  },
} as const;

export type TranslationKey = keyof (typeof dictionary)[typeof DEFAULT_LOCALE];

/** Restituisce la stringa nella locale richiesta, fallback al default. */
export function t(key: TranslationKey, locale: Locale = DEFAULT_LOCALE): string {
  return dictionary[locale]?.[key] ?? dictionary[DEFAULT_LOCALE][key];
}

/** Costruisce un path localizzato. La default locale è alla root. */
export function localizedPath(path: string, locale: Locale = DEFAULT_LOCALE): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return clean;
  return `/${locale}${clean === '/' ? '' : clean}`;
}

/** Ricava la locale dal pathname dell'URL. */
export function getLocaleFromPath(pathname: string): Locale {
  const seg = pathname.split('/').filter(Boolean)[0];
  return (LOCALES as readonly string[]).includes(seg ?? '')
    ? (seg as Locale)
    : DEFAULT_LOCALE;
}

/** Le altre locale rispetto a quella corrente. */
export function getOtherLocales(current: Locale): Locale[] {
  return LOCALES.filter((l) => l !== current);
}

/** Etichetta human per il selettore lingua. */
export const LOCALE_LABEL: Record<Locale, string> = {
  it: 'Italiano',
  en: 'English',
};

/** Etichetta breve per il toggle (2 lettere). */
export const LOCALE_SHORT: Record<Locale, string> = {
  it: 'IT',
  en: 'EN',
};
