const path = require('path');

module.exports = {
  // webpack服务启动端口
  port: 9897,
  //webpack配置
  webpackOptions: {
    entry: path.resolve(__dirname, './examples/common/index.tsx'),
    entryHtml: path.resolve(__dirname, './examples/common/index.html'),
    // ts过babel
    tsShouldBabel: true,
  },
};
