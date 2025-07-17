/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playwrite: ["Playwrite AU SA", "serif"],
        poppins: ["Poppins", "serif"],
        playfair: ["Playfair", "serif"],
        winky: ["Winky Rough", "sans-serif"]
      }
    },
  },
  plugins: [],
}

