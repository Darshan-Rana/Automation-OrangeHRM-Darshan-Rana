// cypress.config.js
const { defineConfig } = require("cypress");

module.exports = defineConfig({

  // --- GLOBAL SETTINGS ---
  viewportHeight: 1080,
  viewportWidth: 1920,
  defaultCommandTimeout: 7000,

  // Reporter Configuration
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    html: true,
    charts: true,
    reportPageTitle: 'Cypress - Automation Test Reports',
    embeddedScreenshots: true,
    inlineAssets: true,
    quiet: true,
    debug: false,
    saveJson: true
  },

  e2e: {
    // Files and paths
    supportFile: 'cypress/support/e2e.js',

    // --- VIDEO SETTINGS (Optimized for stability) ---
    video: true,
    videoCompression: false, // Disabling compression increases stability
    videoUploadOnPasses: true, // Keeps videos even if all tests pass

    // Screenshot Settings
    screenshots: {
      saveAllAttempts: false,
      // Invalid 'videoOnFailOnly' property has been removed.
    },

    // --- NODE EVENT REGISTRATION AND BROWSER PATHING ---
    setupNodeEvents(on, config) {
      // 1. Register the Mochawesome reporter plugin
      require('cypress-mochawesome-reporter/plugin')(on);
      const userChromePath = 'C:\\Users\\ranadars\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe';

      // Check if the user-installed Chrome is already listed, and if not, add it.
      const isChromeDetected = config.browsers.some(browser => browser.name === 'chrome');

      if (!isChromeDetected) {
        config.browsers = [
          ...config.browsers, // Keep Electron, Edge, and Firefox
          {
            name: 'chrome',
            family: 'chromium',
            channel: 'stable',
            displayName: 'Chrome (Darshan Rana Install)',
            path: userChromePath,
            version: "120.0.0.0",
            majorVersion : "120"
          },
        ];
      }
      
      return config;
    },
  },
});