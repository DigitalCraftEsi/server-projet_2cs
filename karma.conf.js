
module.exports =  function(config) {
  config.set({

    frameworks: ['jasmine','commonjs'],
    files: [
      'test/*.spec.js',
    ],
    preprocessors: {
       'test/*.spec.js': ['commonjs']
    },
    plugins: [
      // ...
      require('karma-webpack'),
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-commonjs"),
      require("karma-jasmine-html-reporter"),
      require("requirejs"),
    ],
    reporters: ['progress',"kjhtml"],
    browsers: ['Chrome'],
    singleRun: false,
    autoWatch: true
  });
}