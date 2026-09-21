/**
 * A receding grid floor under the hero — the cheapest possible depth cue, and
 * the one 3D element that also ships to phones, since it is pure CSS.
 *
 * The plane is a 2D gradient tilted back with rotateX inside a perspective
 * container; the scroll is a background-position animation on that one layer,
 * so it composites without repainting the page. Under reduced motion it holds
 * still.
 */
export default function PerspectiveGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 -z-[1] h-[48%] overflow-hidden [perspective:700px] [perspective-origin:50%_0%]"
      style={{
        // Fade in from the horizon and out into the next section.
        maskImage: "linear-gradient(to bottom, transparent 0%, #000 35%, #000 70%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, #000 35%, #000 70%, transparent 100%)",
      }}
    >
      <div
        className="absolute -inset-x-1/2 top-0 h-[140%] origin-top motion-safe:animate-grid-flow"
        style={{
          transform: "rotateX(68deg)",
          backgroundImage:
            "linear-gradient(to right, rgba(107,140,255,0.22) 1px, transparent 1px)," +
            "linear-gradient(to bottom, rgba(139,92,246,0.22) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      {/* Horizon glow where the floor meets the "sky". */}
      <div className="absolute inset-x-0 top-[18%] h-24 bg-[radial-gradient(ellipse_50%_100%_at_50%_0%,rgba(61,107,255,0.25),transparent_70%)]" />
    </div>
  );
}
