import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    screenshotsFolder: "test/e2e/screenshots",
    videosFolder: "test/e2e/videos",
    supportFile: "test/e2e/cypress/support/e2e.ts",
    specPattern: "test/e2e/**/*.spec.ts",
    // setupNodeEvents(on, config) {
    //   // implement node event listeners here
    // },
  },
});
