const nightwatch = {
  src_folders: ['tests/feature'],
  page_objects_path: 'tests/commands',
  selenium: {
    start_process: false,
  },
  test_settings: {
    default: {
      selenium_host: 'hub-cloud.browserstack.com',
      selenium_port: 80,
      silent: true,
      screenshots: {
        enabled: false,
        path: '',
      },
      desiredCapabilities: {
        'browserstack.user': process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
        'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',
        acceptSslCerts: true,
        os: 'Windows',
        os_version: '10',
        browser: 'Chrome',
        browser_version: '70.0',
        resolution: '1024x768',
        name: 'Giftaid - Sanity',
      },
    },
  },
  test_workers: {
    enabled: true,
    workers: 'auto',
  },
};

module.exports = nightwatch;
