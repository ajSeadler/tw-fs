/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  // tailwind.config.ts
  theme: {
    extend: {
      colors: {
        espnRed: "#cc0000",
        espnBlack: "#1a1a1a",
        espnGray: "#e5e5e5",
      },
      fontFamily: {
        sans: ['"Helvetica Neue"', "Arial", "sans-serif"],
      },
    },
  },

  plugins: [],
};
