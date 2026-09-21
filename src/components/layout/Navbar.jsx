import { useEffect, useState } from "react";
import { navItems } from "@/data/navigation";
import { socials } from "@/data/socials";
import { profile } from "@/data/profile";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/lib/cn";
import Button from "@/components/ui/Button";

const SECTION_IDS = navItems.map((n) => n.id);
const primarySocials = socials.filter((s) => s.primary && s.id !== "email");

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const active = useScrollSpy(SECTION_IDS);

  // Commits only when crossing the threshold, not on every scroll event.
  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 12;
      setScrolled((prev) => (prev === next ? prev : next));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        // No backdrop-blur: a blurred fixed bar over an animating canvas forces
        // the compositor to re-sample the whole region every frame.
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "border-b border-white/[0.07] bg-ink-950/90" : "border-b border-transparent"
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-content items-center justify-between px-6 sm:px-8"
      >
        <a
          href="#top"
          className="font-display text-sm font-semibold tracking-tight text-white"
          data-magnetic="button"
          data-magnetic-pull="0.12"
        >
          {profile.firstName}
          <span className="text-brand-400">.</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? "true" : undefined}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm transition-colors",
                  active === item.id ? "text-white" : "text-slate-400 hover:text-slate-100"
                )}
                data-magnetic="button"
                data-magnetic-pull="0.1"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          {primarySocials.map(({ id, label, href, Icon }) => (
            <a
              key={id}
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={label}
              className="hidden rounded-full p-2.5 text-slate-400 transition-colors hover:text-white sm:block"
              data-magnetic="button"
              data-magnetic-pull="0.2"
            >
              <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
            </a>
          ))}
          <Button href={profile.resumeUrl} variant="secondary" size="sm" className="ml-1">
            Résumé
          </Button>
        </div>
      </nav>
    </header>
  );
}
