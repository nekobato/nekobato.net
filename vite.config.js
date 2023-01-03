import { defineConfig } from "vite";
import { ViteEjsPlugin } from "vite-plugin-ejs";
import { me, resume } from "./data.js";

export default defineConfig({
  plugins: [
    ViteEjsPlugin({
      me,
      resume,
    }),
  ],
});
