var webpackCfg = require('./webpack.config');

module.exports = function(config) {
  config.set({
    basePath: '',

    browsers: ['PhantomJS'], // You may use 'ChromeCanary', 'Chromium' or any other supported browser
    files: [
     'node_modules/babel-polyfill/dist/polyfill.js',
      'loadtests.js'
    ],


    port: 8080,
    captureTimeout: 60000,
    frameworks: [ 'mocha', 'sinon-chai' ],


    client: {
      mocha: {},
      chai: {
        includeStack: true
      }
    },

    singleRun: true,
    reporters: [ 'mocha', 'notification' ],
    // reporters: [ 'coverage', 'mocha',  'notification' ],
    preprocessors: {
      'loadtests.js': [ 'webpack', 'sourcemap' ]
    },
    webpack: webpackCfg,
    webpackServer: {
       noInfo: true,
       stats: {
          // options i.e.
          chunks: false
      }
    },
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        { type: 'html' },
        { type: 'text' }
      ]
    }
  });
};
