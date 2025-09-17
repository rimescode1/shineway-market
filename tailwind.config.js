const {heroui} = require('@heroui/theme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/components/navbar.js"
  ],
  theme: {
    extend: {
      colors: {
        green: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "leaf-fall": "leafFall 15s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        leafFall: {
          "0%": {
            transform: "translateX(-100px) translateY(-100px) rotate(0deg)",
          },
          "100%": {
            transform: "translateX(100vw) translateY(100vh) rotate(360deg)",
          },
        },
      },
    },
  },
  plugins: [heroui()],
};
