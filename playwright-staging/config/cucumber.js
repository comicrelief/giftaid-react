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
    publishQuiet: true,
  },
};
