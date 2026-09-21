import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

/**
 * `scroll-mt-24` is what stops every anchor jump from tucking the heading
 * under the fixed navbar.
 */
export default function Section({ id, className, children, ...rest }) {
  return (
    <section
      id={id}
      className={cn("relative scroll-mt-24 px-6 py-24 sm:px-8 md:py-32", className)}
      {...rest}
    >
      <div className="mx-auto w-full max-w-content">{children}</div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, lead, align = "left" }) {
  return (
    <header className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <Reveal as="p" className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent-400">
          {eyebrow}
        </Reveal>
      )}
      <Reveal
        as="h2"
        className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl"
      >
        {title}
      </Reveal>
      {lead && (
        <Reveal as="p" className="mt-4 text-base leading-relaxed text-slate-300">
          {lead}
        </Reveal>
      )}
    </header>
  );
}
