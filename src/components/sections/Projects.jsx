import { useMemo, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import Section, { SectionHeading } from "@/components/ui/Section";
import { RevealGroup } from "@/components/ui/Reveal";
import ProjectCard from "./ProjectCard";
import { projects, projectTags, githubProfileUrl } from "@/data/projects";
import { cn } from "@/lib/cn";

export default function Projects() {
  const [filter, setFilter] = useState("all");

  const visible = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.tags.includes(filter))),
    [filter]
  );

  return (
    <Section id="work">
      <SectionHeading
        eyebrow="Selected work"
        title="Things I've built and shipped"
        lead="Full stack projects, most of them deployed and clickable. Every card links to its source."
      />

      {/* Plain CSS colour transitions rather than a shared-layout animation —
          visually identical to a sliding pill, and it costs nothing. */}
      <div
        role="tablist"
        aria-label="Filter projects by category"
        className="mt-10 flex flex-wrap gap-2"
      >
        {projectTags.map((tag) => {
          const isActive = filter === tag.id;
          return (
            <button
              key={tag.id}
              role="tab"
              type="button"
              aria-selected={isActive}
              onClick={() => setFilter(tag.id)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400",
                "focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950",
                isActive
                  ? "border-brand-400/40 bg-brand-500/15 text-white"
                  : "border-white/[0.08] bg-white/[0.02] text-slate-400 hover:text-slate-100"
              )}
              data-magnetic="button"
              data-magnetic-pull="0.12"
            >
              {tag.label}
            </button>
          );
        })}
      </div>

      <RevealGroup gap={0.07} className="mt-8 grid gap-5 md:grid-cols-2">
        {visible.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </RevealGroup>

      <p className="mt-10 text-sm text-slate-400">
        More on{" "}
        <a
          href={githubProfileUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1 text-brand-300 underline-offset-4 hover:underline"
          data-magnetic="button"
          data-magnetic-pull="0.15"
        >
          GitHub
          <FiArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
        .
      </p>
    </Section>
  );
}
