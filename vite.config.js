import { defineConfig } from "vite";

export default defineConfig({
  base: "/bltomlin.github.io ",
  build: {
    minify: "terser",
  },
});
