/* ─────────────────────────────────────────────────────────────
   Altrove · author.ts

   Identità dell'autore — usata nei meta tag, nei JSON-LD Person
   e in qualsiasi altro punto del sito che debba referenziare
   "chi scrive". Tenuta in un unico file per evitare drift.
   ───────────────────────────────────────────────────────────── */

export interface Author {
  name: string;
  url: string;
  jobTitle: string;
  /** Aree di competenza — popolano knowsAbout in Schema.org Person. */
  knowsAbout: readonly string[];
  /** Profili pubblici — popolano sameAs in Schema.org Person.
      Riempi mano a mano che gli account vengono creati. */
  sameAs: readonly string[];
}

export const AUTHOR: Author = {
  name: 'Matteo Schifano',
  url: 'https://altrove.dev',
  jobTitle: 'Frontend developer',
  knowsAbout: [
    'UX design',
    'Motion design',
    'Typography',
    'CSS',
    'Astro',
    'Design systems',
    'View Transitions',
  ],
  sameAs: [
    'https://github.com/MatteoSchifano',
    // Aggiungere qui Bluesky, X, LinkedIn quando gli account
    // sono attivi — ognuno conta come segnale E-E-A-T.
  ],
};

export const SITE = {
  name: 'Altrove',
  url: 'https://altrove.dev',
  tagline: {
    it: 'Un playground a capitoli su UX, motion design e tipografia.',
    en: 'A playground in chapters on UX, motion design and typography.',
  },
} as const;
