require('dotenv').config();

const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium, webkit, devices } = require('@playwright/test');
const { Commands } = require('../utils/commands');

setDefaultTimeout(300 * 1000);

// Runs before each scenario
Before(async function () {
  const browserName = process.env.BROWSER || 'chromium';
  const isMobileSafari = browserName === 'mobile-safari';
  
  this.browser = isMobileSafari
    ? await webkit.launch({
      headless: process.env.HEADED !== 'true',
    })
    : await chromium.launch({
      channel: 'chrome',
      headless: process.env.HEADED !== 'true',
    });
  
  this.context = await this.browser.newContext(
    isMobileSafari
      ? {
        ...devices['iPhone 12'],
        serviceWorkers: 'block',
      }
      : {
        viewport: {
          width: 1300,
          height: 1000,
        },
        serviceWorkers: 'block',
      }
  );
  
  this.page = await this.context.newPage();
  
  // Increase navigation timeout for slower redirects/page loads
  this.page.setDefaultNavigationTimeout(45000);
  
  this.commands = new Commands(this.page);
});

// Runs after each scenario
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
