import Section, { SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import Img from "@/components/ui/Img";
import { useTilt } from "@/hooks/useTilt";
import { profile } from "@/data/profile";
import { scaleIn } from "@/lib/motion";

export default function About() {
  const portraitRef = useTilt({ max: 9, lift: 14 });

  return (
    <Section id="about" className="border-t border-white/[0.06]">
      <div className="grid gap-12 md:grid-cols-[1fr_0.8fr] md:gap-16">
        <div>
          <SectionHeading eyebrow="About" title={profile.headline} />

          <RevealGroup gap={0.09} className="mt-8 space-y-5">
            {profile.bio.map((para, i) => (
              <RevealItem as="p" key={i} className="text-base leading-relaxed text-slate-300">
                {para}
              </RevealItem>
            ))}
          </RevealGroup>

          <RevealGroup gap={0.06} className="mt-10 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            <RevealItem>
              <dt className="font-mono text-xs uppercase tracking-wider text-slate-500">Based in</dt>
              <dd className="mt-1 text-sm text-slate-200">{profile.location}</dd>
            </RevealItem>
            <RevealItem>
              <dt className="font-mono text-xs uppercase tracking-wider text-slate-500">Email</dt>
              <dd className="mt-1 text-sm">
                <a
                  href={`mailto:${profile.email}`}
                  className="text-brand-300 underline-offset-4 hover:underline"
                  data-magnetic="button"
                  data-magnetic-pull="0.12"
                >
                  {profile.email}
                </a>
              </dd>
            </RevealItem>
          </RevealGroup>
        </div>

        <Reveal
          variants={scaleIn}
          className="relative mx-auto w-full max-w-xs [perspective:1100px] md:mx-0"
        >
          <div ref={portraitRef} className="relative [transform-style:preserve-3d]">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-brand-500/25 via-iris-500/12 to-transparent blur-2xl"
            />
            {/* Stacked slabs set back in Z — static depth at rest, and they
                parallax against the photo as it tilts. */}
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-2xl border border-iris-400/20 bg-iris-500/[0.06] [transform:translate3d(28px,28px,-90px)]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-2xl border border-brand-400/25 bg-brand-500/[0.08] [transform:translate3d(14px,14px,-45px)]"
            />
            <Img
              src={profile.portrait.src}
              alt={profile.portrait.alt}
              width={profile.portrait.width}
              height={profile.portrait.height}
              className="relative w-full rounded-2xl border border-white/[0.09] object-cover shadow-[0_30px_80px_-30px_rgba(0,0,0,0.95)]"
            />
            {/* Sheen tracks the pointer across the portrait. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-2xl opacity-[var(--ga,0)]"
              style={{
                background:
                  "radial-gradient(300px circle at var(--gx,50%) var(--gy,50%), rgba(255,255,255,0.14), transparent 60%)",
              }}
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
