# launch-assets/

Asset di lancio per Altrove — usati per le submission a newsletter, showcase
e per i post Bluesky/X. **Non vanno in `public/`** perché non sono serviti
dal sito, sono materiale interno di marketing.

## Cosa va qui

- `launch-copy.md` — copy in tre lunghezze + template post + checklist
- `screenshots/` — screenshot HD del sito (light + dark, retina)
- `gifs/` — GIF corte ≤5MB per embed Bluesky/X
- `videos/` — MP4 alta qualità per X (qualità migliore della GIF)

## Come catturare screenshot HD

1. Apri il sito su display retina (o emula via DevTools → Device → 2880×1800)
2. Per pagina pulita: `document.querySelectorAll('header, footer').forEach(e => e.style.visibility='hidden')`
3. Full page screenshot via DevTools (Ctrl+Shift+P → "Capture full size screenshot")
4. Ottimizza con [squoosh.app](https://squoosh.app) o [tinypng.com](https://tinypng.com)

## Come registrare le GIF

- **Windows:** [ScreenToGif](https://www.screentogif.com/)
- **macOS:** [Kap](https://getkap.co)
- **Ottimizzazione:** [gifski](https://gif.ski) o ffmpeg

Target: ≤5MB, ≤8 secondi, 24-30fps. Per dettagli più nitidi, fai un MP4
high-quality (per X) e una GIF compressa (per Bluesky).

## Convenzione nomi file

```
screenshots/
  home-light-2880.png
  home-dark-2880.png
  chapter-01-light-2880.png
  ...
gifs/
  view-transition-home-to-chapter.gif
  button-micro-animation.gif
  ...
videos/
  view-transition-home-to-chapter.mp4
```
