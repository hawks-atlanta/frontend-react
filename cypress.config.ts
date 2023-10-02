import { defineConfig } from "cypress";
import coverageReportTask from "@cypress/code-coverage/task";

export default defineConfig({
  env: {
    codeCoverage: {
      exclude: "cypress/**/*.*"
    }
  },
  e2e: {
    baseUrl: "http://localhost:5173",
    setupNodeEvents(on, config) {
      coverageReportTask(on, config);
      return config;
    }
  },
  video: false
});
