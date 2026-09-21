import { useEffect, useRef } from "react";
import { subscribe, ORDER } from "@/lib/raf";
import { pointer } from "@/lib/pointer";
import { damp } from "@/lib/math";
import { shouldRunCustomCursor } from "@/lib/env";

/**
 * Dot tracks the pointer 1:1; the ring lags behind on a spring and snaps to the
 * bounds of any [data-magnetic] element.
 *
 * Renders once and then never again — every frame is a transform write on two
 * DOM nodes. Hiding the native cursor overrides an OS accommodation, so this is
 * gated to fine pointers, disabled under reduced-motion and forced-colors, and
 * permanently stood down the first time the visitor presses Tab.
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (!shouldRunCustomCursor()) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add("has-custom-cursor");

    let w = 34;
    let h = 34;
    let radius = 999;
    let opacity = 0;
    let retired = false;

    const unsub = subscribe((dt) => {
      // Keyboard user detected — give the native cursor back for good.
      if (!retired && pointer.keyboard) {
        retired = true;
        document.documentElement.classList.remove("has-custom-cursor");
        dot.style.opacity = "0";
        ring.style.opacity = "0";
        return;
      }
      if (retired) return;

      const hot = pointer.hot;
      const wantOpacity = pointer.inside ? 1 : 0;
      opacity = damp(opacity, wantOpacity, 10, dt);

      // Snap the ring to the hovered target's box, otherwise fall back to a circle.
      const targetW = hot ? hot.w + 14 : pointer.down ? 26 : 34;
      const targetH = hot ? hot.h + 14 : pointer.down ? 26 : 34;
      const targetR = hot && hot.kind === "box" ? 16 : 999;

      w = damp(w, targetW, 14, dt);
      h = damp(h, targetH, 14, dt);
      radius = damp(radius, targetR, 14, dt);

      const rx = hot ? hot.cx : pointer.sx;
      const ry = hot ? hot.cy : pointer.sy;

      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      ring.style.width = `${w}px`;
      ring.style.height = `${h}px`;
      ring.style.borderRadius = `${radius}px`;
      ring.style.opacity = String(opacity * (hot ? 0.9 : 0.55));

      dot.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0) translate(-50%, -50%) scale(${
        pointer.down ? 0.6 : 1
      })`;
      dot.style.opacity = String(opacity);

      // The magnetic element itself leans toward the cursor.
      if (hot && hot.pull > 0) {
        const ox = (pointer.x - hot.cx) * hot.pull;
        const oy = (pointer.y - hot.cy) * hot.pull;
        hot.el.style.transform = `translate3d(${ox}px, ${oy}px, 0)`;
      }
    }, ORDER.CURSOR);

    return () => {
      unsub();
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div aria-hidden="true">
      {/* Both start fully transparent. If the capability gate fails the effect
          returns early and they simply never become visible — no fragile
          display-toggling variant needed. */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] border border-brand-300 opacity-0 [contain:layout_style_size] [will-change:transform]"
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-[7px] w-[7px] rounded-full bg-accent-400 opacity-0 [will-change:transform]"
      />
    </div>
  );
}
