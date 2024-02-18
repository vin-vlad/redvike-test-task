const { defineConfig } = require("cypress");
const { configureVisualRegression } = require('cypress-visual-regression')
module.exports = defineConfig({
  e2e: {
    env: {
      visualRegressionType: 'regression',
    },
    screenshotsFolder: './cypress/snapshots/actual',
    baseUrl: "https://qa-task.redvike.rocks/",
    setupNodeEvents(on, config) {
      configureVisualRegression(on)
    },
  },
});
