import { cn } from "@/lib/cn";

/**
 * Pure-CSS gradient mesh. Paints instantly so there is never a black hole
 * while the WebGL chunk loads, and is the permanent background on touch
 * devices and under prefers-reduced-motion.
 */
export default function StaticBackdrop({ dim = false }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 transition-opacity duration-[1200ms] ease-out",
        dim ? "opacity-40" : "opacity-100"
      )}
    >
      <div className="absolute inset-0 bg-ink-950" />
      <div
        className="absolute -left-[15%] top-[-20%] h-[70vmax] w-[70vmax] rounded-full opacity-50 blur-[120px] animate-pulse-soft"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(61,107,255,0.55), rgba(61,107,255,0) 65%)",
        }}
      />
      <div
        className="absolute -right-[10%] top-[10%] h-[55vmax] w-[55vmax] rounded-full opacity-40 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(139,92,246,0.5), rgba(139,92,246,0) 65%)",
        }}
      />
      <div
        className="absolute bottom-[-25%] left-[30%] h-[50vmax] w-[50vmax] rounded-full opacity-30 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(34,211,238,0.35), rgba(34,211,238,0) 65%)",
        }}
      />
    </div>
  );
}
