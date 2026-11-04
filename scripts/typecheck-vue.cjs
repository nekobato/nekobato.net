// vue-tsc uses the JavaScript compiler API, which TypeScript 7 no longer exposes.
// Keep the site's TypeScript 7 compiler and use TypeScript 6 for SFC checks only.
require("vue-tsc").run(require.resolve("typescript-vue/lib/tsc"));
