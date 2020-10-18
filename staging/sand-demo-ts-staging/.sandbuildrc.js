const path = require('path');

module.exports = {
  //webpack配置
  webpackOptions: {
    port: 9897,
    entry: path.resolve(__dirname, './examples/common/index.tsx'),
    entryHtml: path.resolve(__dirname, './examples/common/index.html'),
    tsShouldBabel: true,
  },
};
