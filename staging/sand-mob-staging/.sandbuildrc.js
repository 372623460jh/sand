const path = require('path');

module.exports = {
  // webpack服务启动端口
  port: 9901,
  //webpack配置
  webpackOptions: {
    entry: path.resolve(__dirname, './src/entry/index.js'),
    entryHtml: path.resolve(__dirname, './src/entry/index.html'),
    alias: {
      '@': path.resolve(__dirname, './src/'),
    },
  },
};
