/* ─────────────────────────────────────────────────────────────
   Content collections — i "capitoli" del playground.

   Struttura:
     src/content/chapters/<lang>/<slug>.mdx

   Ogni capitolo dichiara la sua `lang` e una `translationKey`
   condivisa con la sua versione in altre lingue. Questo
   permette a un capitolo di trovare le sue traduzioni senza
   dipendere dal nome del file (lo slug può essere localizzato).
   ───────────────────────────────────────────────────────────── */

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const chapters = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/chapters' }),
  schema: z.object({
    /** Codice lingua, es. "it", "en". Deve coincidere con la subdir. */
    lang: z.enum(['it', 'en']),
    /** Identificatore stabile attraverso le traduzioni, es. "chapter-01". */
    translationKey: z.string(),
    number: z.string(),
    title: z.string(),
    excerpt: z.string(),
    date: z.string().optional(),
    readMinutes: z.number().int().positive().optional(),
    tags: z.array(z.string()).default([]),
    /** Marca un capitolo come bozza — non viene listato in produzione */
    draft: z.boolean().default(false),
  }),
});

export const collections = { chapters };
