import { defineConfig } from "vite";
import { ViteEjsPlugin } from "vite-plugin-ejs";
import { activities, links, meta, me, portfolio, resume } from "./data/index.js";

export default defineConfig({
  plugins: [
    ViteEjsPlugin({
      meta,
      me,
      resume,
      links,
      portfolio,
      activities,
    }),
  ],
});
