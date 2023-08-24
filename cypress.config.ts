import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(_on, _config) {
      // implement node event listeners here
    },
  },

  video: false,
  videoUploadOnPasses: false,

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
