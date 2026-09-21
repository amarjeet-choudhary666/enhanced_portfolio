import { useRef, useState } from "react";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import Section, { SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { profile } from "@/data/profile";
import { socials } from "@/data/socials";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const FIELD =
  "w-full rounded-lg border border-white/[0.1] bg-white/[0.03] px-3.5 py-2.5 text-sm text-white " +
  "placeholder:text-slate-500 transition-colors focus:border-brand-400/50 focus:outline-none " +
  "focus:ring-2 focus:ring-brand-500/30";

const details = [
  { id: "email", Icon: FiMail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { id: "phone", Icon: FiPhone, label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
  { id: "location", Icon: FiMapPin, label: "Location", value: profile.location, href: null },
];

export default function Contact() {
  const formRef = useRef(null);
  const [state, setState] = useState("idle"); // idle | sending | sent | error

  async function handleSubmit(e) {
    e.preventDefault();
    if (state === "sending") return;

    // Honeypot: real people leave this hidden field empty.
    if (formRef.current.elements.company?.value) {
      setState("sent");
      return;
    }

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.error("EmailJS env vars are missing — see .env.example");
      setState("error");
      return;
    }

    setState("sending");
    try {
      // Loaded on submit so it stays out of the initial bundle.
      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);
      formRef.current.reset();
      setState("sent");
    } catch (err) {
      console.error(err);
      setState("error");
    }
  }

  return (
    <Section id="contact" className="border-t border-white/[0.06]">
      <div className="grid gap-12 md:grid-cols-[0.9fr_1fr] md:gap-16">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Let's build something"
            lead="Open to full-time roles and freelance work. The fastest way to reach me is email."
          />

          <dl className="mt-10 space-y-5">
            {details.map(({ id, Icon, label, value, href }) => (
              <div key={id} className="flex items-start gap-3.5">
                <Icon className="mt-0.5 h-[18px] w-[18px] shrink-0 text-brand-400" aria-hidden="true" />
                <div>
                  <dt className="font-mono text-xs uppercase tracking-wider text-slate-500">
                    {label}
                  </dt>
                  <dd className="mt-0.5 text-sm text-slate-200">
                    {href ? (
                      <a
                        href={href}
                        className="underline-offset-4 hover:text-white hover:underline"
                        data-magnetic="button"
                        data-magnetic-pull="0.12"
                      >
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex gap-2">
            {socials
              .filter((s) => s.id !== "email")
              .map(({ id, label, href, Icon }) => (
                <a
                  key={id}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="rounded-full border border-white/[0.08] p-3 text-slate-400 transition-colors hover:border-white/20 hover:text-white"
                  data-magnetic="button"
                  data-magnetic-pull="0.22"
                >
                  <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                </a>
              ))}
          </div>
        </div>

        <Reveal>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate={false}
            className="rounded-2xl border border-white/[0.09] bg-ink-900/70 p-6 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.9)] sm:p-7"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="from_name" className="mb-1.5 block text-sm text-slate-300">
                  Name
                </label>
                <input
                  id="from_name"
                  name="from_name"
                  type="text"
                  required
                  autoComplete="name"
                  className={FIELD}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="from_email" className="mb-1.5 block text-sm text-slate-300">
                  Email
                </label>
                <input
                  id="from_email"
                  name="from_email"
                  type="email"
                  required
                  autoComplete="email"
                  className={FIELD}
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="message" className="mb-1.5 block text-sm text-slate-300">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className={`${FIELD} resize-y`}
                placeholder="What are you working on?"
              />
            </div>

            {/* Honeypot — hidden from people, tempting to bots. */}
            <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
              <label htmlFor="company">Company</label>
              <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Button type="submit" disabled={state === "sending"} magnetic pull={0.14}>
                {state === "sending" ? "Sending…" : "Send message"}
              </Button>

              <p
                role="status"
                aria-live="polite"
                className="text-sm"
              >
                {state === "sent" && (
                  <span className="text-emerald-300">
                    Thanks &mdash; I&rsquo;ll get back to you soon.
                  </span>
                )}
                {state === "error" && (
                  <span className="text-red-300">
                    Something went wrong. Email me directly at {profile.email}.
                  </span>
                )}
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
