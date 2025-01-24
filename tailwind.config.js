/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
          poppins: ['Poppins', 'sans-serif'], // Add the Poppins font
        },
        borderWidth: {
          '16': '4rem',  // Adds a new class `border-16` for a 4rem border
          '20': '5rem',  // Adds a new class `border-20` for a 5rem border
        },
    },
  },
  plugins: [],
}
