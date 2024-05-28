import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import alpinejs from "@astrojs/alpinejs";

import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: "https://altoflight.com/",
  integrations: [
    mdx(),
    sitemap(),
    tailwind(),
    react(),
    alpinejs(),
    partytown(),
  ],
  redirects: {
    "/pilot-training": "/ground-school/private-pilot",
    "/airplanes-for-sale": "/acquisitions-sales",
    "/airplanes-for-rent": "/about/our-fleet",
    "/how-to-operate-an-airplane": "/ground-school/instrument-rating",
  },
});
