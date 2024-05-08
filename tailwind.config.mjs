import defaultTheme from "tailwindcss/defaultTheme";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Raleway Variable", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "dark-blue": "#09212b",
        "medium-blue": "#2cc0ff",
      },
    },
  },
  plugins: [],
};
