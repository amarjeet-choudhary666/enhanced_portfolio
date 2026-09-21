import { subscribe, ORDER } from "./raf";

/**
 * Pointer state lives in a module singleton, never in React state.
 *
 * Nothing subscribes to this object. Anything that needs the pointer is already
 * running inside the rAF loop and reads these fields directly, then writes to
 * its own DOM node. That is the whole reason moving the mouse costs zero React
 * renders — the previous build called setState twice per pointermove and
 * re-rendered trees of 60+ animated nodes at pointer frequency.
 */
export const pointer = {
  x: 0,
  y: 0, // client px
  nx: 0,
  ny: 0, // normalised device coords, -1..1
  sx: 0,
  sy: 0, // spring-smoothed, for the lagging ring
  vx: 0,
  vy: 0, // spring velocity
  inside: false,
  down: false,
  /** Cached rect of the hovered [data-magnetic] element, or null. */
  hot: null,
  /** True once the visitor has pressed Tab — we permanently restore the native cursor. */
  keyboard: false,
};

const SPRING_K = 170;
const SPRING_C = 26;

let installed = false;

/** Re-measure the cached magnetic target. Called on enter, scroll and resize — never per frame. */
function measureHot() {
  if (!pointer.hot) return;
  const r = pointer.hot.el.getBoundingClientRect();
  pointer.hot.cx = r.left + r.width / 2;
  pointer.hot.cy = r.top + r.height / 2;
  pointer.hot.w = r.width;
  pointer.hot.h = r.height;
}

export function installPointer() {
  if (installed || typeof window === "undefined") return () => {};
  installed = true;

  pointer.sx = pointer.x = window.innerWidth / 2;
  pointer.sy = pointer.y = window.innerHeight / 2;

  const onMove = (e) => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    pointer.nx = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.ny = -((e.clientY / window.innerHeight) * 2 - 1);
    pointer.inside = true;
  };

  const onDown = () => {
    pointer.down = true;
  };
  const onUp = () => {
    pointer.down = false;
  };
  const onLeave = () => {
    pointer.inside = false;
  };
  const onEnter = () => {
    pointer.inside = true;
  };

  // One delegated listener for every magnetic element on the page. The rect is
  // measured once on enter and cached — measuring inside the rAF loop is the
  // exact layout-thrash trap the old Skills section fell into.
  const onOver = (e) => {
    const el = e.target.closest?.("[data-magnetic]");
    if (!el) return;
    if (pointer.hot?.el === el) return;
    pointer.hot = {
      el,
      kind: el.dataset.magnetic || "button",
      cx: 0,
      cy: 0,
      w: 0,
      h: 0,
      pull: Number(el.dataset.magneticPull ?? 0.25),
    };
    measureHot();
  };

  const onOut = (e) => {
    if (!pointer.hot) return;
    const to = e.relatedTarget;
    if (to && pointer.hot.el.contains(to)) return;
    if (to?.closest?.("[data-magnetic]") === pointer.hot.el) return;
    pointer.hot.el.style.transform = "";
    pointer.hot = null;
  };

  const onKeyDown = (e) => {
    if (e.key === "Tab") {
      pointer.keyboard = true;
      document.documentElement.classList.add("using-keyboard");
    }
  };

  let rafPending = false;
  const onScrollOrResize = () => {
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(() => {
      rafPending = false;
      measureHot();
    });
  };

  window.addEventListener("pointermove", onMove, { passive: true });
  window.addEventListener("pointerdown", onDown, { passive: true });
  window.addEventListener("pointerup", onUp, { passive: true });
  document.addEventListener("pointerleave", onLeave);
  document.addEventListener("pointerenter", onEnter);
  document.addEventListener("pointerover", onOver, { passive: true });
  document.addEventListener("pointerout", onOut, { passive: true });
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("scroll", onScrollOrResize, { passive: true });
  window.addEventListener("resize", onScrollOrResize, { passive: true });

  // Spring smoothing runs first each frame so every later subscriber reads a
  // consistent, already-integrated value.
  const unsub = subscribe((dt) => {
    pointer.vx += ((pointer.x - pointer.sx) * SPRING_K - pointer.vx * SPRING_C) * dt;
    pointer.vy += ((pointer.y - pointer.sy) * SPRING_K - pointer.vy * SPRING_C) * dt;
    pointer.sx += pointer.vx * dt;
    pointer.sy += pointer.vy * dt;
  }, ORDER.POINTER);

  return () => {
    installed = false;
    unsub();
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerdown", onDown);
    window.removeEventListener("pointerup", onUp);
    document.removeEventListener("pointerleave", onLeave);
    document.removeEventListener("pointerenter", onEnter);
    document.removeEventListener("pointerover", onOver);
    document.removeEventListener("pointerout", onOut);
    window.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("scroll", onScrollOrResize);
    window.removeEventListener("resize", onScrollOrResize);
  };
}
