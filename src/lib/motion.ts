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

  return () => cleanups.forEach((fn) => fn());
}
