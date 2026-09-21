import { useEffect, useState } from "react";

/**
 * Tracks which section is currently in view using one IntersectionObserver for
 * all of them. Commits at most once per section change — not per scroll event,
 * which is what the old unthrottled scroll + getBoundingClientRect listeners did.
 */
export function useScrollSpy(ids, { rootMargin = "-45% 0px -50% 0px" } = {}) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;

    const visible = new Map();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target.id, e.isIntersecting);
        const next = ids.find((id) => visible.get(id));
        if (next) setActive((prev) => (prev === next ? prev : next));
      },
      { rootMargin, threshold: 0 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids, rootMargin]);

  return active;
}
