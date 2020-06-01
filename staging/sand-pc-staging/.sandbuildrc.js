const path = require('path');


module.exports = {
  // webpack服务启动端口
  port: 9899,
  //webpack配置
  webpackOptions: {
    entry: path.resolve(__dirname, './src/entry/index.jsx'),
    entryHtml: path.resolve(__dirname, './src/entry/index.html'),
    // 哪些请求需要重定向到index.html,用于解决history路由找不到页面的情况
    historyApiOpts: {
      // 是否启用
      enable: true,
      // 白名单
      whiteList: ['^/spa(?:/|$)', '^/$'],
    }
  },
}
