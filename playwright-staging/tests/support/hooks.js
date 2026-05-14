require('dotenv').config();
const caps = require('../../config/browserstack');
const { Before, After, Status, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const Commands = require('../utils/commands');

setDefaultTimeout(300 * 1000); // 5 mins

// Runs before each scenario
Before(async function (scenario) {
  // Set BrowserStack session name to scenario name (helps to see in BS dashboard)
  caps.name = scenario.pickle.name;
  
  // Connect to BrowserStack via Playwright CDP
  this.browser = await chromium.connect({
    wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(caps))}`,
  });
  
  this.context = await this.browser.newContext({
    viewport: null, // Use full screen instead of fixed viewport
    serviceWorkers: 'block', // Avoids caching issues
  });
  
  this.page = await this.context.newPage();
  
  // Keep default Playwright action/assertion timeout consistent across Cucumber tests
  this.page.setDefaultTimeout(30000);
  
  // Increase navigation timeout for slower redirects/page loads on BrowserStack
  this.page.setDefaultNavigationTimeout(45000);
  
  // Maximise browser window
  const session = await this.context.newCDPSession(this.page);
  const { windowId } = await session.send('Browser.getWindowForTarget');
  await session.send('Browser.setWindowBounds', {
    windowId,
    bounds: { windowState: 'maximized' },
  });
  
  /** @type {Commands} */
  this.commands = new Commands(this.page);
});

// After each scenario completes, report the test result (pass/fail) to BrowserStack
After(async function (scenario) {
  const testResult = {
    action: 'setSessionStatus',
    arguments: {
      status: scenario.result?.status === Status.PASSED ? 'passed' : 'failed',
      reason: scenario.result?.message || '',
    },
  };
  
  // Close page
  if (this.page) {
    await this.page.evaluate(() => {}, `browserstack_executor: ${JSON.stringify(testResult)}`);
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
