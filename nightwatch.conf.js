const nightwatch = {
  src_folders: ['tests/feature'],
  page_objects_path: 'tests/commands',
  selenium: {
    "start_process": false,
    "host" : "hub-cloud.browserstack.com",
    port: 443,
  },

  common_capabilities: {
    'browserstack.user': process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
    'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',
    'name': 'Bstack-[Nightwatch] Parallel Test',
    acceptSslCerts: true,
    silent: true,
    live_output : true,
    request_timeout_options: {
      timeout: 100000
    },
    screenshots: {
      enabled: false,
      path: '',
    },
  },

  test_settings: {
    default: {},
      chrome: {
      desiredCapabilities: {
        os: 'Windows',
        os_version: '10',
        browser: 'Chrome',
        browser_version: '83.0',
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
