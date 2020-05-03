const path = require('path');

module.exports = {
  port: 9540,
  webpackOptions: {
    htmlTitle: 'sand-demo',
    entry: path.resolve(__dirname, './common/index.jsx'),
    entryHtml: path.resolve(__dirname, './common/index.html'),
    // 入口文件所在文件夹
    demoBasePath: path.resolve(__dirname, '../sand-demo-debug'),
  }
}
