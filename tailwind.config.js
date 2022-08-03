const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          light: "#d9d9d9",
        },
      },
      fontFamily: {
        sans: ["Noto Sans KR", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
