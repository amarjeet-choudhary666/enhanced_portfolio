/**
 * Capability gates.
 *
 * The cursor well is the entire premise of the particle field, and on touch
 * there is no cursor — so phones would pay ~115 KB gz of three.js for a
 * drifting starfield they cannot interact with, on the exact devices where
 * Core Web Vitals are measured hardest. They get a CSS backdrop instead.
 */

const mq = (q) => typeof window !== "undefined" && window.matchMedia(q).matches;

export const prefersReducedMotion = () => mq("(prefers-reduced-motion: reduce)");

export const hasFinePointer = () => mq("(hover: hover) and (pointer: fine)");

export const isForcedColors = () => mq("(forced-colors: active)");

function saveDataOrSlowLink() {
  const c = typeof navigator !== "undefined" ? navigator.connection : null;
  if (!c) return false;
  return Boolean(c.saveData) || /(^|-)(2g|slow-2g)$/.test(c.effectiveType || "");
}

/** Should we load and run the WebGL particle field at all? */
export function shouldRunHeavyFX() {
  if (typeof window === "undefined") return false;
  return (
    hasFinePointer() &&
    !prefersReducedMotion() &&
    window.innerWidth >= 900 &&
    !saveDataOrSlowLink()
  );
}

/** Should the custom cursor render? Same gate, plus forced-colors and keyboard use. */
export function shouldRunCustomCursor() {
  return hasFinePointer() && !prefersReducedMotion() && !isForcedColors();
}

/**
 * Particle budget multiplier. DPR is a bigger lever than count for additive
 * blending (fill cost scales with DPR squared), but low-core devices still
 * benefit from fewer vertices.
 */
export function perfTier() {
  if (typeof navigator === "undefined") return 1;
  const cores = navigator.hardwareConcurrency ?? 8;
  const mem = navigator.deviceMemory ?? 8;
  if (cores <= 4 && mem <= 4) return 0.35;
  if (cores <= 4 || mem <= 4) return 0.6;
  return 1;
}

export const dprCap = () => Math.min(window.devicePixelRatio || 1, 1.75);
