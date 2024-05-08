/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
export default {
  content: [
    "./src/*.tsx",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      lavender: "#9999ff",
      gray: "#6b7db3",
      purple: "#bb99ff",
      aqua: "#99ffff",
      turquoise: "#6bb3b3",
    },
    extend: {},
  },
  plugins: [nextui()],
};
