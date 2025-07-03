import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
  site: "https://altoflight.com/",
  integrations: [
    mdx(),
    sitemap({
      customPages: [
        "https://altoflight.com/LearnToFly-with-AltoFlightAcademy-2024.pdf",
      ],
    }),
    tailwind(),
    react(),
    alpinejs({ entrypoint: "/src/entrypoint" }),
  ],
  redirects: {
    "/pilot-training": "/ground-school/private-pilot",
    "/airplanes-for-sale": "/acquisitions-sales",
    "/airplanes-for-rent": "/about/our-fleet",
    "/how-to-operate-an-airplane": "/ground-school/instrument-rating",
  },
});
