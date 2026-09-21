import { memo, useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/env";

const TYPE_MS = 55;
const DELETE_MS = 28;
const HOLD_MS = 1600;

/**
 * Isolated so the typing animation re-renders this one line of text and
 * nothing else. The previous implementation re-rendered the entire hero —
 * and re-registered a mousemove listener — on every keystroke.
 */
function RoleTicker({ roles, className }) {
  const [text, setText] = useState(roles[0]);
  const timer = useRef(0);

  useEffect(() => {
    // Under reduced motion the full first role just stays put.
    if (prefersReducedMotion()) {
      setText(roles[0]);
      return;
    }

    let word = 0;
    let char = 0;
    let deleting = false;
    let cancelled = false;

    const step = () => {
      if (cancelled) return;
      const current = roles[word];

      if (!deleting) {
        char += 1;
        setText(current.slice(0, char));
        if (char === current.length) {
          deleting = true;
          timer.current = setTimeout(step, HOLD_MS);
          return;
        }
      } else {
        char -= 1;
        setText(current.slice(0, char));
        if (char === 0) {
          deleting = false;
          word = (word + 1) % roles.length;
        }
      }

      timer.current = setTimeout(step, deleting ? DELETE_MS : TYPE_MS);
    };

    timer.current = setTimeout(step, 700);
    return () => {
      cancelled = true;
      clearTimeout(timer.current);
    };
  }, [roles]);

  return (
    <span className={className}>
      {/* Screen readers get the stable list, not a character-by-character stream. */}
      <span className="sr-only">{roles.join(", ")}</span>
      <span aria-hidden="true">
        {text}
        <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.12em] bg-accent-400 animate-caret-blink" />
      </span>
    </span>
  );
}

export default memo(RoleTicker);
