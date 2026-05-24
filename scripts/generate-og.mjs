/* ─────────────────────────────────────────────────────────────
   scripts/generate-og.mjs

   Genera public/og-default.png — 1200×630 — per Open Graph e
   Twitter Card. Eseguibile via `npm run og`.

   Stack: satori (HTML/JSX-like → SVG) + resvg (SVG → PNG).
   Font: Geist Variable WOFF2 (già installato come dependency).
   ───────────────────────────────────────────────────────────── */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

/* satori non supporta WOFF2 (zlib+brotli) ma supporta WOFF (zlib).
   Usiamo @fontsource/geist (non-variable) che fornisce file .woff. */
const FONT_PATH = resolve(
  ROOT,
  'node_modules/@fontsource/geist/files/geist-latin-500-normal.woff',
);

const fontData = await readFile(FONT_PATH);

const markup = {
  type: 'div',
  props: {
    style: {
      width: '1200px',
      height: '630px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '80px',
      background: 'linear-gradient(135deg, #fafaf9 0%, #f0ede8 100%)',
      fontFamily: 'Geist',
      color: '#1a1916',
    },
    children: [
      {
        type: 'div',
        props: {
          style: { display: 'flex', alignItems: 'center', gap: '20px' },
          children: [
            {
              type: 'div',
              props: {
                style: {
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: '#c0734d',
                  boxShadow: '0 0 0 8px rgba(192, 115, 77, 0.18)',
                },
              },
            },
            {
              type: 'div',
              props: {
                style: {
                  fontSize: '32px',
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                  color: '#1a1916',
                },
                children: 'Altrove',
              },
            },
          ],
        },
      },
      {
        type: 'div',
        props: {
          style: { display: 'flex', flexDirection: 'column', gap: '32px' },
          children: [
            {
              type: 'div',
              props: {
                style: {
                  fontSize: '88px',
                  fontWeight: 500,
                  lineHeight: 1.05,
                  letterSpacing: '-0.04em',
                  color: '#1a1916',
                  maxWidth: '900px',
                },
                children: 'Un playground a capitoli su UX, motion e tipografia.',
              },
            },
            {
              type: 'div',
              props: {
                style: {
                  fontSize: '28px',
                  lineHeight: 1.4,
                  color: '#6b6760',
                  fontStyle: 'italic',
                  maxWidth: '800px',
                },
                children:
                  '“La UX migliore lascia l’utente essere altrove — perché lei lavora per lui.”',
              },
            },
          ],
        },
      },
      {
        type: 'div',
        props: {
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '22px',
            color: '#6b6760',
            letterSpacing: '0.02em',
          },
          children: [
            { type: 'div', props: { children: 'altrove.dev' } },
            { type: 'div', props: { children: 'Capitolo dopo capitolo.' } },
          ],
        },
      },
    ],
  },
};

const svg = await satori(markup, {
  width: 1200,
  height: 630,
  fonts: [{ name: 'Geist', data: fontData, weight: 400, style: 'normal' }],
});

const pngBuffer = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } })
  .render()
  .asPng();

const outDir = resolve(ROOT, 'public');
await mkdir(outDir, { recursive: true });
const outPath = resolve(outDir, 'og-default.png');
await writeFile(outPath, pngBuffer);

console.log(`✓ Generated ${outPath} (${(pngBuffer.length / 1024).toFixed(1)} KB)`);
