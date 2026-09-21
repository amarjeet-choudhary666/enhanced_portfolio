// Temporary smoke test — deleted after verification.
import { renderToString } from "react-dom/server";
import App from "./App.jsx";

const html = renderToString(<App />);

const checks = [
  ["hero", "Choudhary"],
  ["projects", 'id="work"'],
  ["real project", "AI Movie Insights"],
  ["live link", "ai-movie-insights-mu.vercel.app"],
  ["card tilt wrapper", "perspective:1200px"],
  ["card sheen var", "--gx"],
  ["portrait perspective", "perspective:1100px"],
  ["about", 'id="about"'],
  ["skills", 'id="skills"'],
  ["contact form", 'name="from_email"'],
  ["honeypot", 'name="company"'],
];

let failed = 0;
for (const [label, needle] of checks) {
  const ok = html.includes(needle);
  if (!ok) failed++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}`);
}

const forbidden = [
  ["fake stars", "128"],
  ["dead link", 'href="#"'],
  ["hotlink", "anuragsinghbam"],
];
for (const [label, needle] of forbidden) {
  const present = html.includes(needle);
  if (present) failed++;
  console.log(`${present ? "FAIL" : "PASS"}  no ${label}`);
}

// Card count sanity: 6 projects, each wrapped in a perspective container.
const cards = (html.match(/perspective:1200px/g) || []).length;
console.log(`${cards === 6 ? "PASS" : "FAIL"}  6 project cards (found ${cards})`);
if (cards !== 6) failed++;

console.log(`\nrendered ${html.length} chars, ${failed} failure(s)`);
process.exit(failed ? 1 : 0);
