// check https://github.com/nightwatchjs/nightwatch/issues/408
require('events').EventEmitter.defaultMaxListeners = 100;

const nightwatch = {
  src_folders: ['tests/feature'],
  page_objects_path: 'tests/commands',
  selenium: {
    'start_process': false,
    'host' : 'hub-cloud.browserstack.com',
    port: 443,
  },

  globals: {
    // this controls whether to abort the test execution when an assertion failed and skip the rest
    // it's being used in waitFor commands and expect assertions
    // abortOnAssertionFailure: true,

    // this will overwrite the default polling interval (currently 500ms) for waitFor commands
    // and expect assertions that use retry
    // waitForConditionPollInterval: 500,

    // default timeout value in milliseconds for waitFor commands and implicit waitFor value for
    // expect assertions
    // waitForConditionTimeout : 5000,

    // since 1.4.0 – this controls whether to abort the test execution when an element cannot be located; an error
    // is logged in all cases, but this also enables skipping the rest of the testcase;
    // it's being used in element commands such as .click() or .getText()
    // abortOnElementLocateError: false,

    // this will cause waitFor commands on elements to throw an error if multiple
    // elements are found using the given locate strategy and selector
    // throwOnMultipleElementsReturned: false,

    // By default a warning is printed if multiple elements are found using the given locate strategy
    // and selector; set this to true to suppress those warnings
    // suppressWarningsOnMultipleElementsReturned: false,

    // controls the timeout value for async hooks. Expects the done() callback to be invoked within this time
    // or an error is thrown
    asyncHookTimeout : 300 * 1000, // timeout for .perform method for instance.

    // controls the timeout value for when running async unit tests. Expects the done() callback to be invoked within this time
    // or an error is thrown
    // unitTestsTimeout : 2000,

    // controls the timeout value for when executing the global async reporter. Expects the done() callback to be
    // invoked within this time or an error is thrown
    // customReporterCallbackTimeout: 20000,

    // Automatically retrying failed assertions - You can tell Nightwatch to automatically retry failed assertions
    // until a given timeout is reached, before the test runner gives up and fails the test.
    // retryAssertionTimeout: 5000,

  },

  common_capabilities: {
    'browserstack.user': process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
    'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',
    'browserstack.selenium_version': "3.141.59", // latest selenium to fix element selectors.
    'browserstack.idleTimeout': 300,
    acceptSslCerts: true,
    silent: true,
    live_output: false,
    detailed_output: false,
    screenshots: {
      enabled: false,
      path: '',
    },
    request_timeout_options: {
      timeout: 200 * 1000,
    },
  },

  test_settings: {
    default: {},
      chrome: {
      desiredCapabilities: {
        os: 'Windows',
        os_version: '10',
        browser: 'Chrome',
        browser_version: '87.0',
        resolution: '1024x768',
        name: 'Giftaid - Sanity',
      },
    },
    ie: {
      desiredCapabilities: {
        os: 'Windows',
        os_version: '10',
        browser: 'IE',
        browser_version: '11.0',
        resolution: '1024x768',
        name: 'Giftaid - Sanity',
      },
    },
    // firefox: {
    //   desiredCapabilities: {
    //     os: 'Windows',
    //     os_version: '10',
    //     browser: 'firefox',
    //     browser_version: '69.0',
    //     resolution: '1024x768',
    //     name: 'Giftaid - Sanity',
    //   },
    // },
  },
  test_workers: {
    enabled: true,
    workers: 'auto',
  },
};

// Code to support common capabilites
for(const testSetting in nightwatch.test_settings){
  const config = nightwatch.test_settings[testSetting];
  config['selenium_host'] = nightwatch.selenium.host;
  config['selenium_port'] = nightwatch.selenium.port;
  config['desiredCapabilities'] = config['desiredCapabilities'] || {};
  for(const commonCapability in nightwatch.common_capabilities){
    config['desiredCapabilities'][commonCapability] = config['desiredCapabilities'][commonCapability] || nightwatch.common_capabilities[commonCapability];
  }
}

module.exports = nightwatch;
