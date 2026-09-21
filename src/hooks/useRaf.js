import { useEffect } from "react";
import { subscribe } from "@/lib/raf";

/** Subscribe a callback to the global rAF loop for the component's lifetime. */
export function useRaf(fn, order, enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    return subscribe(fn, order);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, order]);
}
