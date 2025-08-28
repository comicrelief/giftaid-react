// @ts-check
const { devices } = require('@playwright/test');

const config = {
  testDir: 'tests',
  testMatch: '**/*.spec.js',
  /* Maximum time one test can run for. */
  timeout: 300 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 30 * 1000,
  },
  reporter: 'list',
  retries: 2,
  workers: 3,
  use:{
    viewport: null,
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    navigationTimeout: 45000,
    scriptTimeout: 60000, // this is needed for long running scripts
    serviceWorkers: 'block', // optional but reduces flakiness
  },
  grep: [new RegExp('@regression'), new RegExp('@sanity'), new RegExp('@nightly-sanity')],

  /* Configure projects for major browsers */
  projects: [
    // -- BrowserStack Projects --
    // name should be of the format browser@browser_version:os os_version@browserstack
    {
      name: 'chrome@latest:Windows 11@browserstack',
      use: {
        browserName: 'chromium',
        ...devices['Desktop Chrome'],
      },
    },
  ],
};

module.exports = config;
