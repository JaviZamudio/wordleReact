/** @type {import('tailwindcss').Config} */
// Green: #538d4e
// yellow: #b59f3b
// light gray: #818384
// dark gray: #3a3a3c
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightGray: "#d3d6da",
        green: "#6aaa64",
        yellow: "#c9b458",
        darkGray: "#787c7e",
      },
    },
  },
  plugins: [],
}