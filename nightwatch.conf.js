const nightwatch = {
  src_folders: ['tests/feature'],
  page_objects_path: 'tests/commands',
  selenium: {
    "start_process": false,
    "host" : "hub-cloud.browserstack.com",
    port: 80,
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
    default: {
      desiredCapabilities: {
        os: 'Windows',
        os_version: '10',
        browser: 'Chrome',
        browser_version: '70.0',
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
for(var i in nightwatch.test_settings){
  var config = nightwatch.test_settings[i];
  config['selenium_host'] = nightwatch.selenium.host;
  config['selenium_port'] = nightwatch.selenium.port;
  config['desiredCapabilities'] = config['desiredCapabilities'] || {};
  for(var j in nightwatch.common_capabilities){
    config['desiredCapabilities'][j] = config['desiredCapabilities'][j] || nightwatch.common_capabilities[j];
  }
}

module.exports = nightwatch;
