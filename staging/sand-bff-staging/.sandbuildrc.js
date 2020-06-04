const path = require('path');

module.exports = {
  // webpack服务启动端口
  port: 9538,
  //webpack配置
  webpackOptions: {
    entry: path.resolve(__dirname, './src/entry/index.jsx'),
    entryHtml: path.resolve(__dirname, './src/entry/index.html'),
  },
};
