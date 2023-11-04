/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "pale-cream": "#FFF9CA",
        "pale-orange": "#FFDEB4",
        "pale-red": "#FFB4B4",
        "pale-purple": "#B2A4FF",
        "pale-dark-blue": "#3C4262"
      },
    },
  },
  plugins: [],
  darkMode: "class"
}

