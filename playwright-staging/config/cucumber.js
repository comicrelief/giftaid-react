module.exports = {
  default: {
    paths: ['tests/features/**/*.feature'],
    require: [
      'tests/support/**/*.js',
      'tests/step-definitions/**/*.js',
    ],
    format: ['progress', 'summary'],
    // Use 'pretty' locally for readable step-by-step output.
    // On CI keep the output minimal to avoid noisy logs.
    retry: process.env.CI ? 2 : 0, // no retries when running locally
    parallel: 3,
    publishQuiet: true, // Hide the default Cucumber report publishing link (we check CI instead)
  },
};
