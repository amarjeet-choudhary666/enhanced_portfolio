import Section, { SectionHeading } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { skillGroups, TIERS } from "@/data/skills";
import { cn } from "@/lib/cn";

const TIER_STYLE = {
  core: "border-brand-400/35 bg-brand-500/[0.12] text-white",
  working: "border-white/[0.12] bg-white/[0.04] text-slate-200",
  learning: "border-white/[0.07] bg-transparent text-slate-400",
};

// Keycap edge colour per tier — the stronger the skill, the more solid the key.
const TIER_EDGE = {
  core: "[--edge:rgba(43,82,214,0.75)]",
  working: "[--edge:rgba(255,255,255,0.09)]",
  learning: "[--edge:rgba(255,255,255,0.04)]",
};

const TIER_ORDER = { core: 0, working: 1, learning: 2 };

export default function Skills() {
  return (
    <Section id="skills" className="border-t border-white/[0.06]">
      <SectionHeading
        eyebrow="Skills"
        title="What I work with"
        lead="Grouped by how often I actually reach for them, rather than a self-assigned percentage."
      />

      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
        {TIERS.map((t) => (
          <div key={t.id} className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className={cn("h-2.5 w-2.5 rounded-sm border", TIER_STYLE[t.id])}
            />
            <span className="text-xs text-slate-400">
              <span className="text-slate-200">{t.label}</span> — {t.note}
            </span>
          </div>
        ))}
      </div>

      <RevealGroup gap={0.1} className="mt-12 space-y-10">
        {skillGroups.map((group) => (
          <RevealItem key={group.id}>
            <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500">
              {group.label}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {[...group.items]
                .sort((a, b) => TIER_ORDER[a.tier] - TIER_ORDER[b.tier])
                .map((skill) => (
                  <li key={skill.name}>
                    <span
                      title={skill.note}
                      className={cn(
                        "keycap inline-flex cursor-default items-baseline gap-2 rounded-lg border px-3 py-2 text-sm",
                        "bg-gradient-to-b from-white/[0.03] to-transparent hover:border-brand-400/40",
                        TIER_STYLE[skill.tier],
                        TIER_EDGE[skill.tier]
                      )}
                    >
                      {skill.name}
                      <span className="hidden text-[11px] text-slate-500 lg:inline">
                        {skill.note}
                      </span>
                    </span>
                  </li>
                ))}
            </ul>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
