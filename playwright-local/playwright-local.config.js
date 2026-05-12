// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: '.',
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  retries: 1,
  workers: 2,
  timeout: 60 * 1000,
  expect: {
    timeout: 60 * 1000,
  },
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : [['list']],
  use: {
    // Disable local Playwright traces/videos/screenshots to avoid generating
    // test-results folders locally. In CI, keep artifacts for debugging failures.
    trace: process.env.CI ? 'on-first-retry' : 'off',
    screenshot: process.env.CI ? 'only-on-failure' : 'off',
    video: process.env.CI ? 'retain-on-failure' : 'off',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: {
          width: 1300,
          height: 1000
        }
      }
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 12'] },
      timeout: 360_000,
      expect: { timeout: 20_000 }
    }
  ],

  /* Run 'yarn start' before starting the tests */
  webServer: {
    command: 'yarn start',
    port: 3000,
    timeout: 120000,
    reuseExistingServer: true,
  },
});
