require('dotenv').config();

const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const { Commands } = require('../utils/commands');

setDefaultTimeout(300 * 1000);

// Runs before each scenario
Before(async function () {
  this.browser = await chromium.launch({
    channel: 'chrome',
    headless: process.env.HEADED !== 'true',
  });
  
  this.context = await this.browser.newContext({
    viewport: {
      width: 1300,
      height: 1000,
    },
    serviceWorkers: 'block', // Avoids caching issues
  });
  
  this.page = await this.context.newPage();
  this.commands = new Commands(this.page);
});

After(async function () {
  if (this.page) {
    await this.page.close();
  }
  // Close context and browser
  if (this.context) {
    await this.context.close();
  }
  
  if (this.browser) {
    await this.browser.close();
  }
});
