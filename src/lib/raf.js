/**
 * The single requestAnimationFrame loop for the entire site.
 *
 * Everything animated outside of React's render cycle subscribes here: the
 * custom cursor, magnetic buttons, and the WebGL particle field. One loop means
 * deterministic ordering (the cursor never renders a frame behind the pointer
 * it just read) and one place to stop all motion when the tab is hidden.
 */

const subs = [];
let frameId = 0;
let last = 0;
let running = false;

function tick(now) {
  frameId = requestAnimationFrame(tick);

  // Clamping dt is load-bearing, not polish. Returning from a background tab
  // hands you a dt of 30+ seconds; an unclamped spring integrator explodes and
  // the cursor ring launches off screen.
  const dt = Math.min((now - last) / 1000, 1 / 30);
  last = now;
  const t = now * 0.001;

  for (let i = 0; i < subs.length; i++) subs[i].fn(dt, t);
}

function start() {
  if (running || subs.length === 0 || document.hidden) return;
  running = true;
  last = performance.now();
  frameId = requestAnimationFrame(tick);
}

function stop() {
  if (!running) return;
  cancelAnimationFrame(frameId);
  running = false;
}

/** Lower `order` runs earlier within a frame. */
export function subscribe(fn, order = 50) {
  const entry = { fn, order };
  subs.push(entry);
  subs.sort((a, b) => a.order - b.order);
  start();

  return () => {
    const i = subs.indexOf(entry);
    if (i > -1) subs.splice(i, 1);
    if (subs.length === 0) stop();
  };
}

export const ORDER = {
  POINTER: 10,
  CURSOR: 20,
  MAGNETIC: 30,
  RENDER: 60,
};

if (typeof document !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else start();
  });
}
