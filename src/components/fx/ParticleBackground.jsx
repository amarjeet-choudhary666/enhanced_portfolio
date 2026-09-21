import { useEffect, useRef, useState } from "react";
import StaticBackdrop from "./StaticBackdrop";
import { shouldRunHeavyFX } from "@/lib/env";

/**
 * The lazy boundary. This file must never import anything from `three` —
 * a single static import here would hoist the whole library into the entry
 * chunk with no error.
 *
 * The import() fires inside an effect (so after first paint) and is further
 * deferred to requestIdleCallback, so it competes with nothing during the LCP
 * window. There is deliberately no <link rel="prefetch">: on a slow connection
 * that would start the download during LCP, which is the thing we're avoiding.
 *
 * The layer is fixed to the viewport so the field sits behind every section,
 * not just the hero. Because it is always on screen there is no
 * IntersectionObserver to unsubscribe it — the global loop still stops on
 * `visibilitychange`, and the renderer is desktop-only to begin with.
 */
export default function ParticleBackground() {
  const hostRef = useRef(null);
  const fieldRef = useRef(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (!shouldRunHeavyFX()) return;

    let cancelled = false;
    let idleId = 0;

    const boot = () => {
      import("./three/ParticleField")
        .then(({ createParticleField }) => {
          if (cancelled || !hostRef.current) return;
          fieldRef.current = createParticleField(hostRef.current);
          setLive(true); // exactly one re-render, ever
        })
        .catch(() => {
          /* WebGL unavailable — the CSS backdrop stays */
        });
    };

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(boot, { timeout: 2500 });
    } else {
      idleId = window.setTimeout(boot, 1200);
    }

    // If the visitor turns reduced-motion on mid-session, tear the field down.
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onPrefChange = (e) => {
      if (!e.matches) return;
      fieldRef.current?.dispose();
      fieldRef.current = null;
      setLive(false);
    };
    mql.addEventListener("change", onPrefChange);

    return () => {
      cancelled = true;
      if ("cancelIdleCallback" in window) window.cancelIdleCallback(idleId);
      clearTimeout(idleId);
      mql.removeEventListener("change", onPrefChange);
      fieldRef.current?.dispose();
      fieldRef.current = null;
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <StaticBackdrop dim={live} />
      <div ref={hostRef} className="absolute inset-0" />
      {/* Keeps long-form text legible over the brightest part of the field
          without a backdrop-filter, which would recomposite every frame. */}
      <div className="absolute inset-0 bg-ink-950/35" />
    </div>
  );
}
