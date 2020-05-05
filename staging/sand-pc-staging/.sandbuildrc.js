const path = require('path');


module.exports = {
  // webpack服务启动端口
  port: 9899,
  //webpack配置
  webpackOptions: {
    htmlTitle: 'sand-pc',
    entry: path.resolve(__dirname, './src/entry/index.jsx'),
    entryHtml: path.resolve(__dirname, './src/entry/index.html'),
    // 别名,非必填
    alias: {},
    // 显示模块分析
    showBundleAnalyzer: false,
  },
}
