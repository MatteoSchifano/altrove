/* ─────────────────────────────────────────────────────────────
   readingTime.ts — calcolo automatico dei minuti di lettura
   dal corpo MDX di un capitolo.

   Filosofia: il frontmatter dovrebbe descrivere *intenzione*,
   non *misure derivabili*. Mantenere `readMinutes` a mano è una
   piccola tassa che, weekend dopo weekend, diventa attrito.

   Formula: 200 parole/minuto (media web/prosa tecnica).
   Lo schema della collection mantiene `readMinutes` come campo
   opzionale: se l'autore lo specifica, vince — utile quando un
   capitolo è quasi solo demo e il conteggio automatico
   sottostima l'esperienza reale.
   ───────────────────────────────────────────────────────────── */

const WORDS_PER_MINUTE = 200;

/**
 * Stima i minuti di lettura dal raw body MDX.
 * Esclude code fence, import statements, tag JSX, inline code
 * e immagini — conta solo prosa effettiva.
 */
export function computeReadingTime(rawBody: string | undefined): number {
  if (!rawBody) return 1;

  const stripped = rawBody
    // Code fence blocks ```...``` (multi-linea)
    .replace(/```[\s\S]*?```/g, ' ')
    // import statements MDX (riga intera)
    .replace(/^\s*import\s[\s\S]+?;?\s*$/gm, ' ')
    // Tag JSX e HTML (apertura, chiusura, self-closing)
    .replace(/<\/?[A-Za-z][^>]*>/g, ' ')
    // Inline code `...`
    .replace(/`[^`]*`/g, ' ')
    // Immagini ![alt](src)
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    // Link [testo](url) — mantieni il testo
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    // Punteggiatura markdown comune
    .replace(/[#*_~>{}|]+/g, ' ')
    // Dash di vario tipo
    .replace(/[-—–]+/g, ' ');

  const words = stripped
    .split(/\s+/)
    .filter((w) => w.length > 0 && /[\p{L}\p{N}]/u.test(w));

  return Math.max(1, Math.ceil(words.length / WORDS_PER_MINUTE));
}

/**
 * Restituisce i minuti di lettura per un capitolo: usa il valore
 * esplicito dal frontmatter se presente, altrimenti calcola.
 */
export function resolveReadingTime(
  body: string | undefined,
  explicit: number | undefined,
): number {
  return explicit ?? computeReadingTime(body);
}
