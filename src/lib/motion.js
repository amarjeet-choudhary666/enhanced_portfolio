/**
 * Shared framer-motion variants, defined once at module scope.
 *
 * Declaring variants inside a render body creates a new object identity every
 * render, which defeats framer's memoisation and re-runs the animation
 * resolver. Every variant in the app lives here.
 *
 * Rule enforced repo-wide: `repeat: Infinity` never appears in JSX. Anything
 * perpetual is either a shader uniform or one of the three CSS keyframes
 * declared in tailwind.config.js.
 */

export const EASE = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: EASE } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE } },
};

/** Parent that staggers its children's `visible` state. */
export const stagger = (gap = 0.08, delay = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: gap, delayChildren: delay } },
});

export const VIEWPORT = { once: true, amount: 0.2, margin: "0px 0px -80px 0px" };
