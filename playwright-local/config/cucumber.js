module.exports = {
  default: {
    paths: ['tests/features/**/*.feature'],
    require: [
      'tests/support/**/*.js',
      'tests/step-definitions/**/*.js',
    ],
    // Use 'pretty' locally for readable step-by-step output.
    // On CI keep the output minimal to avoid noisy logs.
    format: ['progress', 'summary'],
    retry: 2, // Retry failed scenarios twice
    parallel: 2, // Run scenarios in parallel workers
    publishQuiet: true,
  },
};
