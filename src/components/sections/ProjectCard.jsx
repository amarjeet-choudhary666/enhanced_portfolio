import { memo } from "react";
import { FiGithub, FiArrowUpRight } from "react-icons/fi";
import { RevealItem } from "@/components/ui/Reveal";
import { useTilt } from "@/hooks/useTilt";
import { cn } from "@/lib/cn";

const STATUS = {
  shipped: { label: "Live", className: "bg-emerald-400/10 text-emerald-300 ring-emerald-400/20" },
  "in-progress": { label: "In progress", className: "bg-amber-400/10 text-amber-300 ring-amber-400/20" },
  archived: { label: "Archived", className: "bg-slate-400/10 text-slate-300 ring-slate-400/20" },
};

function ProjectCard({ project }) {
  const { title, blurb, description, stack, highlights, links, status, year } = project;
  const badge = STATUS[status] ?? STATUS.archived;
  const tiltRef = useTilt({ max: 6, lift: 10 });

  return (
    <RevealItem as="div" className="h-full [perspective:1200px]">
      <article
        ref={tiltRef}
        className={cn(
          "group relative flex h-full flex-col rounded-2xl border border-white/[0.09] [transform-style:preserve-3d]",
          // Solid-ish rather than blurred: a backdrop-filter over the animating
          // canvas would force a full-region recomposite every frame.
          "bg-gradient-to-b from-ink-800/80 to-ink-900/80 p-6 sm:p-7",
          // Top-edge highlight + a shadow that deepens and picks up brand light as
          // the card lifts toward the viewer.
          "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07),0_20px_60px_-25px_rgba(0,0,0,0.9)]",
          "transition-[border-color,box-shadow] duration-300 hover:border-brand-400/30",
          "hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_40px_80px_-30px_rgba(61,107,255,0.45)]"
        )}
        data-magnetic="box"
        data-magnetic-pull="0"
      >
        {/* Sheen follows the pointer across the card face. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-[var(--ga,0)] transition-opacity"
          style={{
            background:
              "radial-gradient(420px circle at var(--gx,50%) var(--gy,50%), rgba(109,140,255,0.13), transparent 60%)",
          }}
        />

        <div className="depth-layer relative mb-4 flex items-start justify-between gap-4 [--z:44px]">
        <div>
          <h3 className="font-display text-lg font-semibold tracking-tight text-white">{title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{blurb}</p>
        </div>
        <span
          className={cn(
            "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 ring-inset",
            badge.className
          )}
        >
          {badge.label}
        </span>
      </div>

      <p className="depth-layer relative text-sm leading-relaxed text-slate-300 [--z:22px]">{description}</p>

      {highlights?.length > 0 && (
        <ul className="depth-layer relative mt-5 space-y-2 [--z:18px]">
          {highlights.map((h) => (
            <li key={h} className="flex gap-2.5 text-sm text-slate-400">
              <span
                aria-hidden="true"
                className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent-400"
              />
              {h}
            </li>
          ))}
        </ul>
      )}

      <ul className="depth-layer relative mt-6 flex flex-wrap gap-1.5 [--z:30px]">
        {stack.map((tech) => (
          <li
            key={tech}
            className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2 py-1 font-mono text-[11px] text-slate-300"
          >
            {tech}
          </li>
        ))}
      </ul>

      <div className="depth-layer relative mt-7 flex items-center gap-4 border-t border-white/[0.07] pt-5 [--z:36px]">
        <a
          href={links.repo}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1.5 text-sm text-slate-300 transition-colors hover:text-white"
          data-magnetic="button"
          data-magnetic-pull="0.15"
        >
          <FiGithub className="h-4 w-4" aria-hidden="true" />
          Source
          <span className="sr-only"> code for {title} on GitHub</span>
        </a>

        {/* Rendered only when something is actually deployed — never a dead "#". */}
        {links.live && (
          <a
            href={links.live}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 text-sm text-brand-300 transition-colors hover:text-brand-400"
            data-magnetic="button"
            data-magnetic-pull="0.15"
          >
            Live demo
            <FiArrowUpRight className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only"> of {title}</span>
          </a>
        )}

        <span className="ml-auto font-mono text-xs text-slate-500">{year}</span>
      </div>
      </article>
    </RevealItem>
  );
}

export default memo(ProjectCard);
