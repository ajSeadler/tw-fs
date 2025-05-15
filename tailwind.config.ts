/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  // tailwind.config.ts
  theme: {
    extend: {
      keyframes: {
        meteor: {
          "0%": { transform: "translateY(-20%) translateX(-50%)" },
          "100%": { transform: "translateY(300%) translateX(-50%)" },
        },
      },
      animation: {
        meteor: "meteor var(--duration) var(--delay) ease-in-out infinite",
      },
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
