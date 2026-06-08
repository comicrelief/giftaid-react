// Get Playwright version to match BrowserStack runtime
const clientPlaywrightVersion = require('@playwright/test/package.json').version;

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
  
  // Match BrowserStack Playwright version with local version
  'client.playwrightVersion': clientPlaywrightVersion,
  'browserstack.playwrightVersion': clientPlaywrightVersion,
  
  // BrowserStack logs/debugging
  'browserstack.networkLogs': true,
  'browserstack.console': 'info',
  'browserstack.debug': true,
  'browserstack.idleTimeout': 300,
};

module.exports = caps;
