import { defineConfig } from "vite";
import { ViteEjsPlugin } from "vite-plugin-ejs";
import { meta, me, resume } from "./data.js";

export default defineConfig({
  plugins: [
    ViteEjsPlugin({
      meta,
      me,
      resume,
    }),
  ],
});
