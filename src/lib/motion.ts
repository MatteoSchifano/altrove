/* ─────────────────────────────────────────────────────────────
   Altrove · motion.ts

   Wrapper minimale sopra `motion` (motion.dev) per esporre
   spring preset coerenti con il design system, e helper
   riusabili (magnetic, lift) per i micro-pattern.

   Regola d'uso: NON costruire mai uno spring inline. Importa
   un preset. Se hai bisogno di una sensazione nuova, aggiungi
   un preset qui motivandolo.
   ───────────────────────────────────────────────────────────── */

import { animate } from 'motion';
import type { AnimationOptions } from 'motion';

/* ═══════════ Spring presets ═══════════ */

export const spring = {
  /** Per micro-feedback (hover, press) — quasi senza overshoot. */
  subtle: { type: 'spring', stiffness: 220, damping: 28, mass: 0.8 } as const,
  /** Default per la maggior parte delle transizioni — naturale, calmo. */
  gentle: { type: 'spring', stiffness: 170, damping: 22, mass: 0.9 } as const,
  /** Per elementi che devono "scattare" e poi assestarsi — UI controls. */
  snappy: { type: 'spring', stiffness: 380, damping: 28, mass: 0.7 } as const,
  /** Espressivo, leggero overshoot — per micro-celebrations. */
  expressive: { type: 'spring', stiffness: 260, damping: 18, mass: 0.8 } as const,
} as const;

export type SpringName = keyof typeof spring;

/* ═══════════ Reduced motion guard ═══════════ */

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;

/* ═══════════ Magnetic — il cursore attrae l'elemento ═══════════ */

interface MagneticOptions {
  /** Quanto l'elemento si sposta in proporzione al cursore (0–1). Default: 0.25 */
  strength?: number;
  /** Raggio in px oltre cui l'effetto si annulla. Default: usa il bounding box. */
  radius?: number;
  /** Spring preset da usare. Default: gentle. */
  preset?: SpringName;
}

/**
 * Attacca un effetto "magnetic" a un elemento.
 * L'elemento si sposta verso il cursore quando entra nell'area, torna
 * alla posizione originale all'uscita.
 *
 * Restituisce una funzione di cleanup (utile per teardown su View
 * Transitions / unmount).
 */
export function magnetic(el: HTMLElement, opts: MagneticOptions = {}): () => void {
  if (prefersReducedMotion()) return () => {};

  const strength = opts.strength ?? 0.25;
  const preset = spring[opts.preset ?? 'gentle'] as AnimationOptions;

  let active = false;

  const onEnter = () => { active = true; };

  const onMove = (e: PointerEvent) => {
    if (!active) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    animate(el, { x: dx, y: dy }, preset);
  };

  const onLeave = () => {
    active = false;
    animate(el, { x: 0, y: 0 }, preset);
  };

  el.addEventListener('pointerenter', onEnter);
  el.addEventListener('pointermove', onMove);
  el.addEventListener('pointerleave', onLeave);

  return () => {
    el.removeEventListener('pointerenter', onEnter);
    el.removeEventListener('pointermove', onMove);
    el.removeEventListener('pointerleave', onLeave);
    animate(el, { x: 0, y: 0 }, { duration: 0 });
  };
}

/* ═══════════ Lift — solleva l'elemento al passaggio ═══════════ */

interface LiftOptions {
  /** Translazione Y al hover, in px. Default: -4 */
  distance?: number;
  /** Scala al hover. Default: 1.012 */
  scale?: number;
  /** Spring preset. Default: subtle. */
  preset?: SpringName;
}

export function lift(el: HTMLElement, opts: LiftOptions = {}): () => void {
  if (prefersReducedMotion()) return () => {};

  const distance = opts.distance ?? -4;
  const scale = opts.scale ?? 1.012;
  const preset = spring[opts.preset ?? 'subtle'] as AnimationOptions;

  const onEnter = () => animate(el, { y: distance, scale }, preset);
  const onLeave = () => animate(el, { y: 0, scale: 1 }, preset);

  el.addEventListener('pointerenter', onEnter);
  el.addEventListener('pointerleave', onLeave);
  el.addEventListener('focus', onEnter);
  el.addEventListener('blur', onLeave);

  return () => {
    el.removeEventListener('pointerenter', onEnter);
    el.removeEventListener('pointerleave', onLeave);
    el.removeEventListener('focus', onEnter);
    el.removeEventListener('blur', onLeave);
  };
}

/* ═══════════ Reveal — apparizione allo scroll, una volta sola ═══════════ */

/**
 * Rivela gli elementi marcati [data-reveal] quando entrano in viewport.
 *
 * Regole (cap. 05 — lo scroll che racconta):
 * - Anima una volta sola: dopo il reveal l'elemento non si tocca più.
 * - Gli elementi già visibili al bind NON vengono mai nascosti — niente
 *   blink al primo paint, e con JS spento la pagina resta intera.
 * - Lo stagger è per batch di intersezione (--reveal-i), 60ms a passo:
 *   dentro la finestra 40–90ms, oltre la quale diventa "celebrazione".
 * - Con prefers-reduced-motion non si nasconde nulla: stesso stato
 *   finale, senza il viaggio.
 *
 * Lo stato vive in data-reveal-state; il CSS corrispondente è in
 * global.css (layer utilities).
 */
export function bindReveal(root: ParentNode = document): () => void {
  const els = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
  if (els.length === 0 || prefersReducedMotion()) return () => {};

  const vh = window.innerHeight || document.documentElement.clientHeight;
  const pending = els.filter((el) => {
    if (el.dataset.revealState === 'shown') return false;
    // Nascondi solo ciò che sta sotto la fold: ciò che è già in vista resta.
    return el.getBoundingClientRect().top > vh * 0.92;
  });
  if (pending.length === 0) return () => {};

  pending.forEach((el) => { el.dataset.revealState = 'hidden'; });

  const obs = new IntersectionObserver(
    (records) => {
      const batch = records
        .filter((r) => r.isIntersecting && r.target instanceof HTMLElement)
        .map((r) => r.target as HTMLElement)
        .sort((a, b) =>
          a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1,
        );
      batch.forEach((el, i) => {
        el.style.setProperty('--reveal-i', String(i));
        el.dataset.revealState = 'shown';
        obs.unobserve(el);
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -4% 0px' },
  );

  pending.forEach((el) => obs.observe(el));
  return () => obs.disconnect();
}

/* ═══════════ Text reveal — il testo si compone, unità per unità ═══════════

   Il titolo non appare: si scrive. Ogni lettera (o parola) sale da
   sotto mentre una sfocatura si scioglie, con uno spring che assesta
   appena oltre la riga. Un'unità marcata data-tr-whole resta intera
   (il punto accent del wordmark "scoppia" invece di sciogliersi).

   Onestà:
   - prefers-reduced-motion → il testo resta intero, niente split.
   - Senza JS il testo è già lì: lo split avviene solo a runtime.
   - Nessun blink: le unità vengono nascoste in modo sincrono prima
     del primo frame dell'animazione; il genitore torna visibile
     subito (così un'eventuale opacity:0 di "preludio" si scioglie). */

interface TextRevealOptions {
  /** Granularità dello split. Default: 'char'. */
  unit?: 'char' | 'word';
  /** Spring preset per le unità "normali". Default: 'expressive'. */
  preset?: SpringName;
  /** Millisecondi fra un'unità e la successiva. Default: 42. */
  stagger?: number;
  /** Traslazione iniziale dal basso, in px. Default: 28. */
  rise?: number;
}

/** Spezza il testo di `root` in unità inline-block, preservando i
    wrapper inline (es. <em>) e le unità "intere" (data-tr-whole).
    Ritorna le unità in ordine di documento. */
function splitTextUnits(root: HTMLElement, unit: 'char' | 'word'): HTMLElement[] {
  const units: HTMLElement[] = [];

  const makeUnit = (content: string): HTMLElement => {
    const s = document.createElement('span');
    s.textContent = content;
    /* Stili inline, non scoped: gli stili scoped di Astro non
       raggiungono i nodi creati in JS (vedi storia del repo). */
    s.style.display = 'inline-block';
    s.style.willChange = 'transform, opacity, filter';
    units.push(s);
    return s;
  };

  const wrap = (text: string): DocumentFragment => {
    const frag = document.createDocumentFragment();
    if (unit === 'char') {
      for (const ch of [...text]) {
        if (ch === ' ') { frag.appendChild(document.createTextNode(' ')); continue; }
        frag.appendChild(makeUnit(ch));
      }
    } else {
      // Parole, conservando gli spazi come nodi di testo (il wrap regge).
      for (const part of text.split(/(\s+)/)) {
        if (part === '') continue;
        if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); continue; }
        frag.appendChild(makeUnit(part));
      }
    }
    return frag;
  };

  const walk = (node: Node): void => {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        if ((child.textContent ?? '') === '') return;
        node.replaceChild(wrap(child.textContent ?? ''), child);
      } else if (child instanceof HTMLElement) {
        if (child.dataset.trWhole === 'true') {
          child.style.display = 'inline-block';
          child.style.willChange = 'transform, opacity, filter';
          units.push(child);
        } else {
          walk(child); // preserva il wrapper (es. <em>), spezza il suo testo
        }
      }
    });
  };

  walk(root);
  return units;
}

/**
 * Prepara un text reveal su `el`: spezza il testo e nasconde le unità,
 * lasciando il genitore visibile. Ritorna una funzione `play()` che
 * lancia l'animazione a stagger. Ritorna `null` se non c'è nulla da
 * animare (reduced motion, già fatto, testo vuoto) — in quel caso il
 * testo NON viene toccato e resta intero.
 *
 * Separare "prepara" da "play" permette di nascondere il testo finché
 * è ancora fuori schermo (niente blink) e farlo partire al passaggio.
 */
export function prepareTextReveal(
  el: HTMLElement,
  opts: TextRevealOptions = {},
): (() => void) | null {
  if (prefersReducedMotion()) return null;
  if (el.dataset.trDone === 'true') return null;
  el.dataset.trDone = 'true';

  const units = splitTextUnits(el, opts.unit ?? 'char');
  if (units.length === 0) return null;

  const preset = spring[opts.preset ?? 'expressive'] as AnimationOptions;
  const stagger = (opts.stagger ?? 42) / 1000;
  const rise = opts.rise ?? 28;

  // Nascondi le unità in modo sincrono (niente flash), genitore visibile.
  units.forEach((u) => { u.style.opacity = '0'; });
  el.style.opacity = '1';

  return () => {
    units.forEach((u, i) => {
      const whole = u.dataset.trWhole === 'true';
      /* Solo opacity + transform (valori numerici): lo spring li assesta
         in modo pulito. Niente filter/blur via spring — su valori-stringa
         lo spring non converge e l'animazione resta "viva" all'infinito. */
      const keyframes = whole
        ? { opacity: [0, 1], scale: [0.2, 1], y: [rise, 0] }
        : { opacity: [0, 1], y: [rise, 0] };
      const options = {
        ...(whole ? (spring.expressive as AnimationOptions) : preset),
        delay: i * stagger,
      };
      const controls = animate(u, keyframes, options);
      controls?.finished
        ?.then(() => { u.style.willChange = 'auto'; })
        .catch(() => {});
    });
  };
}

/* ═══════════ Auto-binding via data attributes ═══════════ */

/**
 * Inizializza tutti gli elementi marcati con data-motion="…" nella pagina.
 * Da chiamare a fine caricamento e dopo ogni `astro:page-load`.
 */
export function bindMotionAttributes(root: ParentNode = document): () => void {
  const cleanups: Array<() => void> = [];

  root.querySelectorAll<HTMLElement>('[data-motion="magnetic"]').forEach((el) => {
    const strength = parseFloat(el.dataset.strength ?? '');
    const preset = el.dataset.preset as SpringName | undefined;
    cleanups.push(magnetic(el, {
      strength: Number.isFinite(strength) ? strength : undefined,
      preset,
    }));
  });

  root.querySelectorAll<HTMLElement>('[data-motion="lift"]').forEach((el) => {
    const distance = parseFloat(el.dataset.distance ?? '');
    const scale = parseFloat(el.dataset.scale ?? '');
    const preset = el.dataset.preset as SpringName | undefined;
    cleanups.push(lift(el, {
      distance: Number.isFinite(distance) ? distance : undefined,
      scale: Number.isFinite(scale) ? scale : undefined,
      preset,
    }));
  });

  root.querySelectorAll<HTMLElement>('[data-motion="text"]').forEach((el) => {
    const unit = (el.dataset.textUnit === 'word' ? 'word' : 'char') as 'char' | 'word';
    const preset = el.dataset.textPreset as SpringName | undefined;
    const staggerN = parseFloat(el.dataset.textStagger ?? '');
    const riseN = parseFloat(el.dataset.textRise ?? '');
    const opts: TextRevealOptions = {
      unit,
      preset,
      stagger: Number.isFinite(staggerN) ? staggerN : undefined,
      rise: Number.isFinite(riseN) ? riseN : undefined,
    };

    /* Gate "entrance": l'hero anima solo alla PRIMA visita di sessione,
       segnalata da [data-entrance='play'] sull'antenato. Sulle visite
       successive il testo resta intero — niente split, niente nervosismo. */
    if (el.dataset.textGate === 'entrance') {
      const host = el.closest<HTMLElement>('[data-hero]');
      if (host?.dataset.entrance === 'play') prepareTextReveal(el, opts)?.();
      return;
    }

    /* Default: reveal allo scroll, una volta. Ciò che è già a schermo
       parte subito; ciò che è sotto la fold viene nascosto ORA (mentre
       è invisibile, niente blink) e parte quando entra. */
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (el.getBoundingClientRect().top <= vh * 0.92) {
      prepareTextReveal(el, opts)?.();
      return;
    }
    const play = prepareTextReveal(el, opts);
    if (!play) return;
    const io = new IntersectionObserver(
      (records) => {
        records.forEach((r) => {
          if (r.isIntersecting) { play(); io.unobserve(r.target); }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    cleanups.push(() => io.disconnect());
  });

  cleanups.push(bindReveal(root));

  return () => cleanups.forEach((fn) => fn());
}
