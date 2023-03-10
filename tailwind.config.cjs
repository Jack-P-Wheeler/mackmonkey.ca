/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
        '16': 'repeat(16, minmax(0, 1fr))',

        // Complex site-specific column configuration
        'page': '200px 1fr',
        'media': '1fr 400px'
      },
      fontFamily: {
        sans: "'Arimo', sans-serif;"
      }
    },
  },
  plugins: [],
}
