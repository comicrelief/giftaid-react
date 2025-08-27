require('dotenv').config();

const base = require('@playwright/test');
const clientPlaywrightVersion = require('@playwright/test/package.json').version; // "1.50.0"

// BrowserStack Specific Capabilities.
const caps = {
  project: 'Donation',
  name: 'e2e tests',
  browser: 'chrome',
  browser_version: 'latest',
  resolution: '1920x1080',
  os: 'Windows',
  os_version: '11',
  'browserstack.username': process.env.BROWSERSTACK_USERNAME,
  'browserstack.accessKey': process.env.BROWSERSTACK_ACCESS_KEY,
  'client.playwrightVersion': '1.50.0',
  'browserstack.playwrightVersion': '1.50.0',
  
  // logs
  'browserstack.networkLogs': true,
  'browserstack.console': 'info',
  'browserstack.debug': true,
  'browserstack.idleTimeout': 300,
};

// Patching the capabilities dynamically according to the project name.
const patchCaps = (name, title) => {
  const combination = name.split(/@browserstack/)[0];
  const [browserCaps, rawOsCaps] = combination.split(':');
  let [browser, browser_version] = (browserCaps || '').split('@');
  
  browser = (browser || 'chrome').toLowerCase();
  if (browser === 'chromium') browser = 'chrome';
  
  const osCaps = (rawOsCaps || '').trim();
  const osTokens = osCaps ? osCaps.split(/\s+/) : [];
  const os = osTokens.shift() || 'Windows';
  const os_version = osTokens.join(' ') || '11';
  
  caps.browser = browser;
  caps.browser_version = browser_version || 'latest';
  caps.os = os;
  caps.os_version = os_version;
  caps.name = title;
};

const isHash = (entity) => Boolean(entity && typeof(entity) === "object" && !Array.isArray(entity));
const nestedKeyValue = (hash, keys) => keys.reduce((hash, key) => (isHash(hash) ? hash[key] : undefined), hash);
const isUndefined = val => (val === undefined || val === null || val === '');
const evaluateSessionStatus = (status) => {
  if (!isUndefined(status)) {
    status = status.toLowerCase();
  }
  if (status === "passed") {
    return "passed";
  } else if (status === "failed" || status === "timedout") {
    return "failed";
  } else {
    return "";
  }
}

exports.test = base.test.extend({
  page: async ({ page, playwright }, use, testInfo) => {
    // Use BrowserStack Launched Browser according to capabilities for cross-browser testing.
    if (testInfo.project.name.match(/browserstack/)) {
      patchCaps(testInfo.project.name,`${testInfo.title}`);
      const vBrowser = await playwright.chromium.connect({
        wsEndpoint:
          `wss://cdp.browserstack.com/playwright?caps=` +
          `${encodeURIComponent(JSON.stringify(caps))}`,
      });
      const vContext = await vBrowser.newContext(testInfo.project.use);
      const vPage = await vContext.newPage();
      await use(vPage);
      const testResult = {
        action: 'setSessionStatus',
        arguments: {
          status: evaluateSessionStatus(testInfo.status),
          reason: nestedKeyValue(testInfo, ['error', 'message'])
        },
      };
      await vPage.evaluate(() => {},
        `browserstack_executor: ${JSON.stringify(testResult)}`);
      await vPage.close();
      await vBrowser.close();
    } else {
      use(page);
    }
  },
});
