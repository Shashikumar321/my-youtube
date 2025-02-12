/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        crimson: '#ed143d'
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],      },
    },
  },
  plugins: [],
}