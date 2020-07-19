const path = require('path');

module.exports = {
  port: 9540,
  webpackOptions: {
    entry: path.resolve(__dirname, './examples/common/index.tsx'),
    entryHtml: path.resolve(__dirname, './examples/common/index.html'),
    // 入口文件所在文件夹
    basePath: path.resolve(__dirname, '../sand-demo-debug'),
    // ts过babel
    tsShouldBabel: true,
  },
};
