// check https://github.com/nightwatchjs/nightwatch/issues/408
require('events').EventEmitter.defaultMaxListeners = 100;
require('dotenv/config');

const nightwatch = {
  src_folders: ['tests/feature'],
  page_objects_path: 'tests/commands',
  selenium: {
    'start_process': false,
    'host' : 'hub-cloud.browserstack.com',
    port: 443,
  },

  webdriver: {
    keep_alive: true, // keep session alive
  },

  globals: {
    // controls the timeout value for async hooks. Expects the done() callback to be invoked within this time
    // or an error is thrown
    asyncHookTimeout : 300 * 1000, // timeout for .perform method for instance.
    // ensure process is closing as in some cases, process hang forever.
    after: (done)=> {
      process.exit(0);
      done();
    },
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
        browser_version: '90.0',
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
  }
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

if (!process.env.RUN_SERIAL) {
  nightwatch.test_workers = {
    enabled: true,
    workers: 'auto',
  }
}

module.exports = nightwatch;
