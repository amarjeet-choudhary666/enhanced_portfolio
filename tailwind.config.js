/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#05060f",
          900: "#080a16",
          850: "#0c0f1e",
          800: "#121628",
          700: "#1b2138",
          600: "#272f4d",
        },
        brand: {
          300: "#9db3ff",
          400: "#6b8cff",
          500: "#3d6bff",
          600: "#2b52d6",
        },
        iris: {
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
        },
        accent: {
          400: "#22d3ee",
          500: "#06b6d4",
        },
      },
      fontFamily: {
        sans: ["Inter Variable", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Sora Variable", "Inter Variable", "ui-sans-serif", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      maxWidth: {
        content: "72rem",
      },
      // Budget: at most three perpetual animations across the whole page.
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translate3d(0,14px,0)" },
          to: { opacity: "1", transform: "none" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.6" },
        },
        "caret-blink": {
          "0%, 45%": { opacity: "1" },
          "50%, 95%": { opacity: "0" },
        },
        // Moves by exactly one grid cell, so the loop is seamless.
        "grid-flow": {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "0 56px" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s cubic-bezier(0.22,1,0.36,1) both",
        "pulse-soft": "pulse-soft 7s ease-in-out infinite",
        "caret-blink": "caret-blink 1.1s steps(1) infinite",
        "grid-flow": "grid-flow 3.5s linear infinite",
      },
    },
  },
  plugins: [],
};
