import { FiArrowDown, FiArrowUpRight } from "react-icons/fi";
import Button from "@/components/ui/Button";
import RoleTicker from "./RoleTicker";
import PerspectiveGrid from "@/components/fx/PerspectiveGrid";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { profile, stats } from "@/data/profile";

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center">
      <PerspectiveGrid />
      <div className="relative mx-auto w-full max-w-content px-6 pb-20 pt-32 sm:px-8">
        <RevealGroup gap={0.09}>
          {profile.availability.open && (
            <RevealItem as="p" className="mb-7 flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/70 animate-pulse-soft" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-sm text-slate-300">{profile.availability.label}</span>
            </RevealItem>
          )}

          <RevealItem
            as="h1"
            className="font-display text-[clamp(2.5rem,7vw,4.75rem)] font-semibold leading-[1.05] tracking-tight text-white"
          >
            {profile.firstName}{" "}
            <span className="bg-gradient-to-r from-brand-400 via-iris-400 to-accent-400 bg-clip-text text-transparent">
              {profile.lastName}
            </span>
          </RevealItem>

          <RevealItem
            as="p"
            className="mt-5 font-mono text-lg text-slate-200 sm:text-xl"
            aria-live="off"
          >
            <RoleTicker roles={profile.roles} />
          </RevealItem>

          <RevealItem as="p" className="mt-6 max-w-xl text-base leading-relaxed text-slate-300">
            {profile.tagline}
          </RevealItem>

          <RevealItem className="mt-10 flex flex-wrap items-center gap-3">
            <Button href="#work" size="lg" magnetic pull={0.16}>
              View my work
              <FiArrowDown className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button href="#contact" variant="secondary" size="lg" magnetic pull={0.16}>
              Get in touch
              <FiArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </RevealItem>

          <RevealItem className="mt-16 grid max-w-lg grid-cols-3 gap-6 border-t border-white/[0.08] pt-8">
            {stats.map((s) => (
              <div key={s.id}>
                <div className="font-display text-xl font-semibold text-white sm:text-2xl">
                  {s.value}
                </div>
                <div className="mt-1 text-xs leading-snug text-slate-400">{s.label}</div>
              </div>
            ))}
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
