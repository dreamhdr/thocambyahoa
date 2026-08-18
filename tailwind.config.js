/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'rustic-dark': '#2B1810',
        'rustic-brown': '#4A3728',
        'rustic-wood': '#8B6F47',
        'rustic-cream': '#E8DCC4',
        'rustic-beige': '#D4C5A9',
        'indigo-deep': '#1A1A2E',
        'earth-red': '#A0522D',
      },
      fontFamily: {
        'serif': ['Crimson Text', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
