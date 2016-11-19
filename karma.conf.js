module.exports = function (config) {
  config.set({
    frameworks: ["jasmine"],
    files: [
      "node_modules/angular/angular.js",
      "node_modules/angular-mocks/angular-mocks.js",
      "angular-interpolate*.js"
    ],
    reporters: ["mocha", "junit", "coverage"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: true,
    browsers: ["PhantomJS"],
    concurrency: Infinity,
    junitReporter: {
      outputDir: "test/karma-reports"
    },
    coverageReporter: {
      dir: "test/karma-coverage"
    }
  });
};