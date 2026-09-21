import portrait from "@/assets/images/portrait.jpg";

export const profile = {
  firstName: "Amarjeet",
  lastName: "Choudhary",
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },

  /** Drives the hero's rotating role line. */
  roles: [
    "Full Stack Developer",
    "TypeScript Engineer",
    "React & Node Developer",
    "API & Database Design",
  ],

  headline: "I build typed, production-grade web applications.",
  tagline:
    "Full stack developer working across React, TypeScript, Node and Postgres — from schema design to the last pixel.",

  bio: [
    "I'm a full stack developer and Computer Science graduate based in Delhi, India. Most of what I build is end-to-end: a typed Node API over Postgres, a React front end that consumes it, and the auth, validation and deployment in between.",
    "Recently I've been working almost entirely in TypeScript — Next.js and React 19 on the front, Express with Prisma or Drizzle on the back, and Postgres underneath. A few of my projects pull in AI where it earns its place, like sentiment analysis over movie reviews or generated narrative summaries in an audit tool.",
    "I care about the parts people don't see: sensible data models, honest error states, and pages that stay fast on a mid-range phone.",
  ],

  location: "Delhi, India",
  email: "amarjeetchoudhary647@gmail.com",
  phone: "+91 98107 47614",
  resumeUrl:
    "https://drive.google.com/file/d/1PN2rnvo8iwKByhes-t6NX4yHDKdWbZbi/view?usp=sharing",

  availability: {
    open: true,
    label: "Open to full-time roles",
  },

  portrait: {
    src: portrait,
    width: 700,
    height: 1010,
    alt: "Portrait of Amarjeet Choudhary",
  },
};

/**
 * Headline stats. Every value here is checkable against the public GitHub
 * account — no vanity counters.
 */
export const stats = [
  { id: "shipped", value: "6", label: "Apps deployed live" },
  { id: "stack", value: "TypeScript", label: "Primary language" },
  { id: "focus", value: "Full stack", label: "Front end to schema" },
];
