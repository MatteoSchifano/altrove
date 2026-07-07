/* ─────────────────────────────────────────────────────────────
   Altrove · chapters.ts — la porta di rilascio.

   Un capitolo alla settimana, ogni venerdì alle 09:00 (Europe/Rome).
   Il sito è statico (Astro → Vercel): non c'è un "now" a runtime nel
   render, c'è il momento del build. Ma per non dipendere da un deploy
   schedulato ogni venerdì, il *cancello* vive ora sul frontend:

     • il BUILD genera e lista TUTTI i capitoli non-bozza, e per
       ciascuno emette il suo istante di rilascio come epoch ms
       (`releaseEpoch`), calcolato per le 09:00 Europe/Rome;
     • lo stato iniziale server usa il momento del build; un piccolo
       script client sblocca in avanti ciò che è maturato. Il tempo va
       solo avanti, quindi si passa solo da "bloccato" a "sbloccato":
       niente flash, e i capitoli compaiono da soli al loro venerdì
       senza ri-buildare.

   In DEV si vede sempre tutto (l'autore deve poter rileggere il futuro).

   `isReleased`/`getReleasedChapters` restano il cancello a build-time:
   servono agli RSS, che sono file statici e non possono filtrare a
   runtime (includervi capitoli futuri sarebbe disonesto).
   ───────────────────────────────────────────────────────────── */

import { getCollection, type CollectionEntry } from 'astro:content';

type ChapterData = CollectionEntry<'chapters'>['data'];

/** Mezzanotte UTC del giorno di build — confronto stabile per data. */
function buildDay(): number {
  const now = new Date();
  return Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
}

/** Istante del build in epoch ms — stato iniziale del cancello frontend. */
export function buildNow(): number {
  return Date.now();
}

/**
 * Epoch ms dell'orario di parete `hh:00` nel fuso `tz` per la data data.
 * Tecnica standard offset-diff via Intl: si formatta un istante UTC di
 * riferimento nel fuso, si rilegge come se fosse UTC e la differenza dà
 * l'offset del fuso (gestisce correttamente anche l'ora legale). Gira al
 * build su Node, dove l'ICU è completo.
 */
export function zonedTimeToEpoch(
  y: number,
  m: number,
  d: number,
  hh: number,
  tz: string,
): number {
  const utcGuess = Date.UTC(y, m - 1, d, hh, 0, 0);
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    hourCycle: 'h23',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
  const parts = dtf.formatToParts(new Date(utcGuess)).reduce<Record<string, number>>(
    (acc, p) => {
      if (p.type !== 'literal') acc[p.type] = Number(p.value);
      return acc;
    },
    {},
  );
  const asIfUTC = Date.UTC(
    parts.year!,
    parts.month! - 1,
    parts.day!,
    parts.hour!,
    parts.minute!,
    parts.second!,
  );
  const offset = asIfUTC - utcGuess; // ms di cui il fuso è avanti su UTC
  return utcGuess - offset;
}

/**
 * Istante di rilascio (epoch ms) di un capitolo: le 09:00 Europe/Rome
 * della sua `releaseDate`. `null` se il capitolo non ha releaseDate —
 * è sempre disponibile.
 */
export function releaseEpoch(releaseDate?: string): number | null {
  if (!releaseDate) return null;
  const [y, m, d] = releaseDate.split('-').map(Number);
  return zonedTimeToEpoch(y!, m!, d!, 9, 'Europe/Rome');
}

/**
 * Un capitolo è "rilasciato al build" (per gli RSS) se non è bozza e:
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
 * Come getCollection('chapters') ma applica il cancello a build-time.
 * Usata SOLO dagli RSS (feed statici). Un filtro opzionale aggiuntivo
 * (es. per locale) si compone in AND.
 */
export async function getReleasedChapters(
  extra?: (data: ChapterData) => boolean,
): Promise<CollectionEntry<'chapters'>[]> {
  return getCollection(
    'chapters',
    ({ data }) => isReleased(data) && (extra ? extra(data) : true),
  );
}

/**
 * Tutti i capitoli non-bozza, SENZA filtro di data: il cancello di
 * rilascio è applicato dal frontend (vedi `releaseEpoch`). Alimenta le
 * rotte capitolo (getStaticPaths) e le liste della home/roadmap, così
 * ogni capitolo esiste come pagina e compare da solo al suo venerdì.
 * Un filtro opzionale aggiuntivo (es. per locale) si compone in AND.
 */
export async function getChapters(
  extra?: (data: ChapterData) => boolean,
): Promise<CollectionEntry<'chapters'>[]> {
  return getCollection(
    'chapters',
    ({ data }) => !data.draft && (extra ? extra(data) : true),
  );
}
