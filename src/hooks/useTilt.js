import { useEffect, useRef } from "react";
import { subscribe, ORDER } from "@/lib/raf";
import { pointer } from "@/lib/pointer";
import { clamp, damp } from "@/lib/math";
import { hasFinePointer, prefersReducedMotion } from "@/lib/env";

/**
 * Pointer-driven 3D tilt with a cursor-following sheen.
 *
 * Follows the same contract as everything else that moves: no React state, no
 * getBoundingClientRect inside the loop (the rect is cached on enter and
 * invalidated on scroll/resize), and the rAF subscription only exists while the
 * card is actually being hovered or settling back to rest.
 */
export function useTilt({
  max = 7, // degrees
  lift = 6, // px of translateZ-ish lift
  perspective = 1000,
  glare = true,
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!hasFinePointer() || prefersReducedMotion()) return;

    let rect = null;
    let hovered = false;
    let unsub = null;

    // current / target
    let rx = 0;
    let ry = 0;
    let lz = 0;
    let tx = 0;
    let ty = 0;
    let tz = 0;
    let gx = 50;
    let gy = 50;
    let ga = 0;

    el.style.transformStyle = "preserve-3d";
    el.style.willChange = "transform";

    const measure = () => {
      rect = el.getBoundingClientRect();
    };

    const frame = (dt) => {
      if (hovered && rect) {
        const px = clamp((pointer.x - rect.left) / rect.width, 0, 1);
        const py = clamp((pointer.y - rect.top) / rect.height, 0, 1);
        ty = (px - 0.5) * 2 * max; // rotateY from horizontal position
        tx = -(py - 0.5) * 2 * max; // rotateX from vertical position
        tz = lift;
        gx = px * 100;
        gy = py * 100;
        ga = 1;
      } else {
        tx = 0;
        ty = 0;
        tz = 0;
        ga = 0;
      }

      rx = damp(rx, tx, 9, dt);
      ry = damp(ry, ty, 9, dt);
      lz = damp(lz, tz, 9, dt);

      el.style.transform =
        `perspective(${perspective}px) rotateX(${rx.toFixed(3)}deg) ` +
        `rotateY(${ry.toFixed(3)}deg) translate3d(0,${(-lz).toFixed(2)}px,0)`;

      if (glare) {
        el.style.setProperty("--gx", `${gx.toFixed(1)}%`);
        el.style.setProperty("--gy", `${gy.toFixed(1)}%`);
        const cur = Number(el.style.getPropertyValue("--ga") || 0);
        el.style.setProperty("--ga", damp(cur, ga, 9, dt).toFixed(3));
      }

      // Settled back to rest — stop burning frames.
      if (!hovered && Math.abs(rx) < 0.02 && Math.abs(ry) < 0.02 && lz < 0.05) {
        el.style.transform = "";
        unsub?.();
        unsub = null;
      }
    };

    const onEnter = () => {
      measure();
      hovered = true;
      if (!unsub) unsub = subscribe(frame, ORDER.MAGNETIC);
    };
    const onLeave = () => {
      hovered = false;
    };

    let pending = false;
    const onScrollResize = () => {
      if (!hovered || pending) return;
      pending = true;
      requestAnimationFrame(() => {
        pending = false;
        measure();
      });
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onScrollResize, { passive: true });
    window.addEventListener("resize", onScrollResize, { passive: true });

    return () => {
      unsub?.();
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScrollResize);
      window.removeEventListener("resize", onScrollResize);
    };
  }, [max, lift, perspective, glare]);

  return ref;
}
