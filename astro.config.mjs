// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://sl820.github.io",
  trailingSlash: "ignore",
  build: {
    format: "directory",
  },
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});
