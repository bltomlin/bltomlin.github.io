import { defineConfig } from "vite";

export default defineConfig({
  base: "/https://github.com/bltomlin/bltomlin.github.io/",
  build: {
    minify: "terser",
  },
});
