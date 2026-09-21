import { cn } from "@/lib/cn";

const BASE =
  "relative inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium " +
  "transition-[color,background-color,border-color,box-shadow,filter] duration-200 focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 " +
  "disabled:cursor-not-allowed disabled:opacity-60";

// Depth comes from box-shadow only (a solid bottom edge plus a coloured drop),
// never from a transform — magnetic buttons own their inline transform.
const VARIANTS = {
  primary:
    "bg-gradient-to-b from-brand-400 to-brand-500 text-white " +
    "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3),0_4px_0_0_#2b52d6,0_14px_28px_-10px_rgba(61,107,255,0.75)] " +
    "hover:brightness-110 active:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_1px_0_0_#2b52d6,0_6px_14px_-8px_rgba(61,107,255,0.6)]",
  secondary:
    "border border-white/15 bg-white/[0.04] text-slate-100 hover:bg-white/[0.09] " +
    "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_4px_0_0_rgba(255,255,255,0.05)]",
  ghost: "text-slate-300 hover:text-white",
};

const SIZES = {
  sm: "h-9 px-4",
  md: "h-11 px-6",
  lg: "h-12 px-7 text-base",
};

/**
 * `magnetic` tags the element for the delegated pointer listener — the cursor
 * ring snaps to it and it leans toward the pointer. Pull is intentionally small
 * so the hit target never drifts away from where the visitor aimed.
 */
export default function Button({
  as,
  variant = "primary",
  size = "md",
  magnetic = true,
  pull = 0.18,
  className,
  children,
  ...rest
}) {
  const Tag = as ?? (rest.href ? "a" : "button");
  const external = Tag === "a" && rest.href?.startsWith("http");

  return (
    <Tag
      className={cn(BASE, VARIANTS[variant], SIZES[size], className)}
      {...(magnetic ? { "data-magnetic": "button", "data-magnetic-pull": pull } : null)}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : null)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
