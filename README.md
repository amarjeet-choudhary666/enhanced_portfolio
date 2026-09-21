# Portfolio — Amarjeet Choudhary

Live: https://portfolioamarjeet.vercel.app/

React 18 + Vite + Tailwind, with a GPU-driven Three.js particle field that reacts
to the cursor.

## Running it

```bash
npm install
cp .env.example .env    # fill in the EmailJS values
npm run dev
```

`npm run build` · `npm run preview` · `npm run lint`

## Adding content

All copy lives in `src/data/`. Components are presentational and map over it.

| File | Holds |
| --- | --- |
| `profile.js` | Name, roles, bio, contact details, résumé link, headline stats |
| `projects.js` | The project list, filter tags derive from it automatically |
| `skills.js` | Skill groups and fluency tiers |
| `socials.js` | Social links (`primary` controls navbar vs footer) |
| `navigation.js` | Nav items — also drives section ids and the scroll spy |

Adding a project means appending one object to `projects` in
`src/data/projects.js`. If `links.live` is `null` the card renders no Live
button, and there is deliberately no `stars`/`forks` field in the schema.

> Two entries (`digital-heros-golf`, `pm-furniture`) currently carry
> **PLACEHOLDER** copy. Replace their `blurb`, `description`, `stack` and
> `highlights` with real details.

## Performance model

The site is built around one rule: **moving the mouse must not re-render React.**

- `src/lib/pointer.js` — pointer state in a module singleton, not state. Nothing
  subscribes; consumers read it from inside the animation loop and write to
  their own DOM nodes.
- `src/lib/raf.js` — a single `requestAnimationFrame` loop shared by the cursor
  and the WebGL renderer, with ordered subscribers, a clamped delta (so a
  backgrounded tab can't explode the spring integrator) and an automatic stop on
  `visibilitychange`.
- `repeat: Infinity` never appears in JSX. Perpetual motion is either a shader
  uniform or one of three CSS keyframes in `tailwind.config.js`. framer-motion
  is used for entrance reveals only, through `src/components/ui/Reveal.jsx` —
  the only file using `whileInView`, always with `once: true`.

### The Three.js field

`three` is ~128 KB gz, so it is kept off the critical path:

- imported **only** via dynamic `import()` in `ParticleBackground.jsx`, after
  first paint and deferred to `requestIdleCallback`
- an ESLint `no-restricted-imports` rule fails the lint if anything outside
  `src/components/fx/three/` imports it, because a stray static import would
  silently fold it into the entry chunk with no build error
- **not loaded at all** on touch devices, under `prefers-reduced-motion`, on
  save-data/2G, or below 900px — the cursor well is the whole point, and there
  is no cursor on a phone. Those visitors get a CSS gradient backdrop.
- the canvas lives inside the hero rather than fixed behind the page, so
  scrolling past it genuinely unsubscribes the renderer via IntersectionObserver

All particle motion happens in the vertex shader. Per frame the CPU does three
vector operations to rebuild the cursor ray — there is no particle loop.
Displacement is a fraction of the remaining distance to the cursor axis, which
is self-limiting, so there is no `1/r²` singularity to clamp around.

### Custom cursor

Hiding the system cursor overrides an OS accessibility accommodation, so it is
gated to fine pointers, disabled under reduced-motion and forced-colors, kept
`auto` over text inputs, and **permanently stood down the first time the visitor
presses Tab**.

## Bundle

| Chunk | gzipped | When |
| --- | --- | --- |
| react | 45.4 KB | initial |
| motion | 24.9 KB | initial |
| app | 14.8 KB | initial |
| css | 6.0 KB | initial |
| **three** | **128.4 KB** | post-idle, desktop only |

Initial JS ≈ 85 KB gz.
