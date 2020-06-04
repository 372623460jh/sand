const path = require('path');

module.exports = {
  // webpack服务启动端口
  port: 9897,
  //webpack配置
  webpackOptions: {
    entry: path.resolve(__dirname, './examples/common/index.jsx'),
    entryHtml: path.resolve(__dirname, './examples/common/index.html'),
  },
};
