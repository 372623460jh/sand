const path = require('path');

module.exports = {
  // webpack服务启动端口
  port: 9897,
  //webpack配置
  webpackOptions: {
    entry: path.resolve(__dirname, './src/entry/index.jsx'),
    entryHtml: path.resolve(__dirname, './src/entry/index.html'),
    basePath: path.resolve(__dirname, '../sand-pc-debug'),
  },
}
