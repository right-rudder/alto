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
      keyframes: {
        "slow-zoom": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
      },
      animation: {
        "slow-zoom": "slow-zoom 30s infinite",
      },
    },
  },
  plugins: [],
  safelist: [
    "[counter-set:_num_var(--num-graduates)]",
    "[counter-set:_num_var(--num-professionals)]",
  ],
};
