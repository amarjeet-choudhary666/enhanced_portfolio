/**
 * Adding a project means adding one object to this array. Filter chips and
 * counts derive from the data.
 *
 * Two deliberate schema choices:
 *  - There is no `stars` or `forks` field, so invented social proof cannot be
 *    reintroduced by accident.
 *  - `links.live` is `null` when nothing is deployed. The card renders no Live
 *    button at all rather than a dead `href="#"`.
 */

const GH = "https://github.com/amarjeet-choudhary666";

export const projects = [
  {
    id: "ai-movie-insights",
    title: "AI Movie Insights",
    blurb: "Pulls audience reviews for any film and runs Gemini sentiment analysis over them.",
    description:
      "Look up a film by IMDb ID and get its metadata from OMDb alongside audience reviews from TMDB, then run those reviews through Google Gemini for sentiment analysis. Results are cached in Postgres so repeat lookups never re-hit the third-party APIs.",
    year: 2026,
    status: "shipped",
    tags: ["ai", "fullstack"],
    stack: ["Next.js 15", "TypeScript", "Express", "Prisma", "PostgreSQL", "Gemini", "Zod"],
    highlights: [
      "Three external APIs composed behind one typed endpoint",
      "Database caching layer to cut redundant API spend",
      "Zod validation across the request boundary",
    ],
    links: {
      repo: `${GH}/AI-Movie-Insights`,
      live: "https://ai-movie-insights-mu.vercel.app",
    },
    featured: true,
  },
  {
    id: "reputation-roots",
    title: "Reputation Roots",
    blurb: "A marketplace shipped twice — React web app and an Expo React Native companion.",
    description:
      "A full marketplace with product browsing, search with pagination, favourites and an admin CRUD dashboard. The same typed Express API backs both a React web client and a React Native mobile app built on Expo Router.",
    year: 2026,
    status: "shipped",
    tags: ["fullstack", "mobile"],
    stack: [
      "React 18",
      "React Native",
      "Expo",
      "TypeScript",
      "Express",
      "Prisma",
      "PostgreSQL",
      "Zustand",
      "JWT",
    ],
    highlights: [
      "One API serving both a web and a native client",
      "JWT auth with bcrypt hashing, Helmet, CORS and rate limiting",
      "Shared Zustand store patterns across platforms",
    ],
    links: {
      repo: `${GH}/amarjeet-choudhary666-Reputation-Roots-Web-app-and-mobile-app`,
      live: "https://amarjeet-choudhary666-reputation-ro.vercel.app",
    },
    featured: true,
  },
  {
    id: "credex-stackaudit",
    title: "Credex — AI Stack Audit",
    blurb: "Anonymous SaaS spend audit with deterministic savings maths and shareable results.",
    description:
      "Startups submit their tool stack with no sign-up and get a savings breakdown back. The cost rules are deterministic and isolated in the backend so results are reproducible; Gemini only writes the narrative summary on top. Each audit gets a shareable URL with its own OG tags.",
    year: 2026,
    status: "shipped",
    tags: ["ai", "fullstack"],
    stack: ["Vue 3", "Vite", "Express", "Drizzle ORM", "PostgreSQL", "Gemini"],
    highlights: [
      "Deterministic pricing engine kept separate from the AI layer",
      "Shareable result URLs with generated OG metadata",
      "Rate limiting on an unauthenticated public endpoint",
    ],
    links: { repo: `${GH}/Credex---StackAudit-full-stack`, live: null },
    featured: true,
  },
  {
    id: "tshirt-editor",
    title: "Custom T-Shirt Editor",
    blurb: "Live SVG design editor with real-time preview on a garment mockup.",
    description:
      "Compose text onto a t-shirt mockup and see every change render instantly. Six font families, adjustable sizing from 16 to 64px, three placement anchors, eight garment colours and six text colours — all driven through SVG rather than canvas, so the preview stays crisp at any resolution.",
    year: 2026,
    status: "shipped",
    tags: ["frontend"],
    stack: ["React 19", "TypeScript", "Vite", "Tailwind v4", "shadcn/ui", "SVG"],
    highlights: [
      "Resolution-independent SVG rendering instead of canvas",
      "Fully controlled editor state with reset and validation",
    ],
    links: {
      repo: `${GH}/custom-t-short-editor-website`,
      live: "https://custom-t-short-editor-website.vercel.app",
    },
    featured: false,
  },

  // ---------------------------------------------------------------------
  // PLACEHOLDER COPY — these two are real, deployed repos, but the blurbs
  // and highlights below are filler. Replace the `blurb`, `description`,
  // `highlights` and `stack` with the real details, then delete this note.
  // ---------------------------------------------------------------------
  {
    id: "digital-heros-golf",
    title: "Digital Heros Golf",
    blurb: "PLACEHOLDER — describe what this golf platform does in one line.",
    description:
      "PLACEHOLDER — replace with a real description of the project: what problem it solves, who it is for, and the interesting technical part.",
    year: 2026,
    status: "shipped",
    tags: ["frontend"],
    stack: ["TypeScript", "React"],
    highlights: ["PLACEHOLDER — a notable technical decision"],
    links: { repo: `${GH}/Digital-Heros-golf`, live: "https://digital-heros-golf.vercel.app" },
    featured: false,
  },
  {
    id: "pm-furniture",
    title: "P&M Furniture",
    blurb: "PLACEHOLDER — describe this furniture storefront in one line.",
    description:
      "PLACEHOLDER — replace with a real description of the project: what problem it solves, who it is for, and the interesting technical part.",
    year: 2026,
    status: "shipped",
    tags: ["frontend"],
    stack: ["TypeScript", "React"],
    highlights: ["PLACEHOLDER — a notable technical decision"],
    links: { repo: `${GH}/P-M-furniture`, live: "https://p-m-furniture-chi.vercel.app" },
    featured: false,
  },
];

export const TAG_LABELS = {
  fullstack: "Full stack",
  ai: "AI",
  frontend: "Front end",
  mobile: "Mobile",
};

/** Derived from the data, so a new tag creates its own filter chip automatically. */
export const projectTags = [
  { id: "all", label: "All" },
  ...[...new Set(projects.flatMap((p) => p.tags))].map((id) => ({
    id,
    label: TAG_LABELS[id] ?? id,
  })),
];

export const githubProfileUrl = `${GH}?tab=repositories`;
