const path = require('path');

module.exports = {
  //webpack配置
  webpackOptions: {
    port: 9900,
    entry: path.resolve(__dirname, './src/entry/index.ts'),
    entryHtml: path.resolve(__dirname, './src/entry/index.html'),
    tsShouldBabel: true,
  },
};
