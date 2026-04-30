require('dotenv').config();

const { Before, After, Status, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const { Commands } = require('../utils/commands');

setDefaultTimeout(300 * 1000);

const clientPlaywrightVersion = require('@playwright/test/package.json').version;

const caps = {
  project: 'giftaid-react',
  name: 'cucumber e2e tests',
  browser: 'chrome',
  browser_version: 'latest',
  resolution: '1920x1080',
  os: 'Windows',
  os_version: '11',
  'browserstack.username': process.env.BROWSERSTACK_USERNAME,
  'browserstack.accessKey': process.env.BROWSERSTACK_ACCESS_KEY,
  'client.playwrightVersion': clientPlaywrightVersion,
  'browserstack.playwrightVersion': clientPlaywrightVersion,
  
  // logs
  'browserstack.networkLogs': true,
  'browserstack.console': 'info',
  'browserstack.debug': true,
  'browserstack.idleTimeout': 300,
};

Before(async function (scenario) {
  caps.name = scenario.pickle.name;
  
  this.browser = await chromium.connect({
    wsEndpoint:
      `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(caps))}`,
  });
  
  this.context = await this.browser.newContext({
    viewport: null,
    serviceWorkers: 'block',
  });
  
  this.page = await this.context.newPage();
  
  // maximise window
  const session = await this.context.newCDPSession(this.page);
  const { windowId } = await session.send('Browser.getWindowForTarget');
  await session.send('Browser.setWindowBounds', {
    windowId,
    bounds: { windowState: 'maximized' },
  });
  
  this.commands = new Commands(this.page);
});

After(async function (scenario) {
  const testResult = {
    action: 'setSessionStatus',
    arguments: {
      status: scenario.result?.status === Status.PASSED ? 'passed' : 'failed',
      reason: scenario.result?.message || '',
    },
  };
  
  if (this.page) {
    await this.page.evaluate(() => {}, `browserstack_executor: ${JSON.stringify(testResult)}`);
    await this.page.close();
  }
  
  if (this.context) {
    await this.context.close();
  }
  
  if (this.browser) {
    await this.browser.close();
  }
});
