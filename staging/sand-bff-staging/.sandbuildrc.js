const path = require('path');

module.exports = {
  //webpack配置
  webpackOptions: {
    // webpack服务启动端口
    port: 9538,
    // 入口文件
    entry: path.resolve(__dirname, './src/entry/index.jsx'),
    // 入口html
    entryHtml: path.resolve(__dirname, './src/entry/index.html'),
    // 别名
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    copyPlugin: [
      {
        from: path.resolve(__dirname, './src/assets'),
        to: path.resolve(__dirname, './dist/assets'),
      },
    ],
  },
};
