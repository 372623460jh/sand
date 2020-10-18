const path = require('path');

module.exports = {
  webpackOptions: {
    port: 9901,
    entry: path.resolve(__dirname, './src/entry/index.js'),
    entryHtml: path.resolve(__dirname, './src/entry/index.html'),
    alias: {
      '@': path.resolve(__dirname, './src/'),
    },
  },
};
