require('dotenv').config();

const { Before, After, Status, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const Commands = require('../utils/commands');

setDefaultTimeout(300 * 1000); // 5 mins

// Get Playwright version to match BrowserStack runtime
const clientPlaywrightVersion = require('@playwright/test/package.json').version;

// BrowserStack capabilities
const caps = {
  project: 'giftaid-react',
  name: 'e2e tests',
  browser: 'chrome',
  browser_version: 'latest',
  resolution: '1920x1080',
  os: 'Windows',
  os_version: '11',
  'browserstack.username': process.env.BROWSERSTACK_USERNAME,
  'browserstack.accessKey': process.env.BROWSERSTACK_ACCESS_KEY,
  // Ensure BrowserStack Playwright version matches local version
  'client.playwrightVersion': clientPlaywrightVersion,
  'browserstack.playwrightVersion': clientPlaywrightVersion,
  
  // logs
  'browserstack.networkLogs': true,
  'browserstack.console': 'info',
  'browserstack.debug': true,
  'browserstack.idleTimeout': 300,
};

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
