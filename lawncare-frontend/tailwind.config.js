/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#22c55e', // green-500
          600: '#16a34a', // green-600
        },
      },
    },
  },
  plugins: [],
}