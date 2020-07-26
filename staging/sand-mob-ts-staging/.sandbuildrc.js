const path = require('path');

module.exports = {
  // webpack服务启动端口
  port: 9900,
  //webpack配置
  webpackOptions: {
    entry: path.resolve(__dirname, './src/entry/index.ts'),
    entryHtml: path.resolve(__dirname, './src/entry/index.html'),
    // ts过babel
    tsShouldBabel: true,
  },
};
