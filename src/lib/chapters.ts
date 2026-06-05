/* ─────────────────────────────────────────────────────────────
   Altrove · chapters.ts — la porta di rilascio.

   Un capitolo alla settimana, ogni venerdì. Ma il sito è statico
   (Astro → Vercel): non c'è un "now" a runtime, c'è il momento del
   build. Quindi la regola è semplice e onesta:

     • in DEV (dev server) si vedono TUTTI i capitoli non-bozza —
       l'autore deve poter rileggere e testare ciò che non è ancora
       uscito;
     • in PRODUZIONE compare un capitolo solo se la sua releaseDate
       è già passata al momento del build. Un capitolo senza
       releaseDate è considerato già uscito (vale per i primi che
       non hanno un calendario).

   Perché compaia il capitolo del venerdì, il sito va ri-buildato
   quel giorno (un deploy schedulato/cron su Vercel). La porta qui
   garantisce solo che, dato un build, esca esattamente ciò che deve.
   ───────────────────────────────────────────────────────────── */

import { getCollection, type CollectionEntry } from 'astro:content';

type ChapterData = CollectionEntry<'chapters'>['data'];

/** Mezzanotte UTC del giorno di build — confronto stabile per data. */
function buildDay(): number {
  const now = new Date();
  return Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
}

/**
 * Un capitolo è "rilasciato" (visibile al lettore) se non è bozza e:
 *   - siamo in dev (si vede tutto), oppure
 *   - non ha releaseDate, oppure
 *   - la sua releaseDate è ≤ al giorno di build.
 */
export function isReleased(data: ChapterData): boolean {
  if (data.draft) return false;
  if (import.meta.env.DEV) return true;
  // Escape hatch per build di anteprima: ALTROVE_SHOW_ALL=1 mostra tutti i
  // capitoli non-bozza anche in produzione (utile per rivedere il futuro
  // prima del venerdì, o per validare il build dell'intero libro).
  if (process.env.ALTROVE_SHOW_ALL === '1') return true;
  if (!data.releaseDate) return true;
  const [y, m, d] = data.releaseDate.split('-').map(Number);
  return Date.UTC(y, m - 1, d) <= buildDay();
}

/**
 * Come getCollection('chapters') ma applica già la porta di rilascio.
 * Un filtro opzionale aggiuntivo (es. per locale) si compone in AND.
 */
export async function getReleasedChapters(
  extra?: (data: ChapterData) => boolean,
): Promise<CollectionEntry<'chapters'>[]> {
  return getCollection(
    'chapters',
    ({ data }) => isReleased(data) && (extra ? extra(data) : true),
  );
}
