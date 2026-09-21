import { profile } from "@/data/profile";
import { socials } from "@/data/socials";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] px-6 py-10 sm:px-8">
      <div className="mx-auto flex w-full max-w-content flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} {profile.fullName}
        </p>
        <nav aria-label="Social links" className="flex gap-1">
          {socials.map(({ id, label, href, Icon }) => (
            <a
              key={id}
              href={href}
              {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer noopener" } : null)}
              aria-label={label}
              className="rounded-full p-2.5 text-slate-500 transition-colors hover:text-white"
              data-magnetic="button"
              data-magnetic-pull="0.2"
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
