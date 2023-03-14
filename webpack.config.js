/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require('path');

module.exports = {
  entry: './test/test.spec.js', // Path to your test file
  output: {
    filename: 'test.bundle.js',
    path: path.resolve(__dirname, 'dist') // Output directory for the bundled code
  }
};