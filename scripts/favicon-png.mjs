/* Rasterizza public/favicon.svg → PNG a più dimensioni.
   Il favicon usa oklch(0.64 0.17 22) che resvg non parsa: lo
   convertiamo in sRGB esatto qui e iniettiamo l'hex nello SVG. */
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { Resvg } from '@resvg/resvg-js';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/* oklch → sRGB hex (D65). */
function oklchToHex(L, C, hDeg) {
  const h = (hDeg * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  let r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  let g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  let bl = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;
  const enc = (x) => {
    const v = x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055;
    return Math.max(0, Math.min(255, Math.round(v * 255)));
  };
  const hex = (n) => n.toString(16).padStart(2, '0');
  return `#${hex(enc(r))}${hex(enc(g))}${hex(enc(bl))}`;
}

const fill = oklchToHex(0.64, 0.17, 22);
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="6" fill="${fill}"/></svg>`;

for (const size of [512, 180, 32]) {
  const png = new Resvg(svg, {
    fitTo: { mode: 'width', value: size },
    background: 'rgba(0,0,0,0)',
  })
    .render()
    .asPng();
  const out = resolve(ROOT, `public/favicon-${size}.png`);
  await writeFile(out, png);
  console.log(`✓ favicon-${size}.png  (${fill})`);
}
