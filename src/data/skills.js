/**
 * Fluency tiers instead of self-assigned percentages.
 *
 * "React 90% / AWS 65%" is unfalsifiable and invites the one question you
 * cannot win in an interview. Three honest tiers say the same thing with
 * nothing to defend.
 */

export const TIERS = [
  { id: "core", label: "Daily driver", note: "Reach for these without thinking" },
  { id: "working", label: "Comfortable", note: "Shipped production work with these" },
  { id: "learning", label: "Familiar", note: "Used on real projects, still deepening" },
];

export const skillGroups = [
  {
    id: "frontend",
    label: "Front end",
    items: [
      { name: "React", tier: "core", note: "Hooks, composition, render performance" },
      { name: "TypeScript", tier: "core", note: "Typed across client and server" },
      { name: "Tailwind CSS", tier: "core", note: "Design tokens, responsive systems" },
      { name: "JavaScript", tier: "core", note: "Modern ES2020+" },
      { name: "HTML & CSS", tier: "core", note: "Semantic markup, accessible layouts" },
      { name: "Next.js", tier: "working", note: "App Router, server components" },
      { name: "React Native", tier: "working", note: "Expo Router, native navigation" },
      { name: "Three.js", tier: "learning", note: "GLSL shaders, GPU particle systems" },
    ],
  },
  {
    id: "backend",
    label: "Back end & data",
    items: [
      { name: "Node.js", tier: "core", note: "Typed services and REST APIs" },
      { name: "Express", tier: "core", note: "Middleware, auth, rate limiting" },
      { name: "PostgreSQL", tier: "core", note: "Schema design, relational modelling" },
      { name: "MongoDB", tier: "working", note: "Document modelling with Mongoose" },
      { name: "Prisma", tier: "working", note: "Type-safe queries and migrations" },
      { name: "Drizzle ORM", tier: "working", note: "SQL-first schema definitions" },
      { name: "NestJS", tier: "learning", note: "Modular service architecture" },
      { name: "Go", tier: "learning", note: "Concurrent services" },
    ],
  },
  {
    id: "tools",
    label: "Tooling & infra",
    items: [
      { name: "Git", tier: "core", note: "Branching, review workflow" },
      { name: "Vite", tier: "core", note: "Build config, code splitting" },
      { name: "Vercel", tier: "core", note: "Preview deploys, edge caching" },
      { name: "Docker", tier: "working", note: "Containerised local environments" },
      { name: "Linux", tier: "working", note: "Shell, process and service management" },
      { name: "AWS", tier: "learning", note: "S3, EC2 fundamentals" },
    ],
  },
];
