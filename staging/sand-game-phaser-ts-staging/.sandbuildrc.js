const path = require('path');

module.exports = {
  // 服务启动端口
  port: 7776,
  //webpack配置
  webpackOptions: {
    entry: path.resolve(__dirname, './src/entry/index.tsx'),
    entryHtml: path.resolve(__dirname, './src/entry/index.html'),
    alias: {
      '@': path.resolve(__dirname, './src/'),
    },
    copyPlugin: [
      {
        from: path.resolve(__dirname, './src/assets'),
        to: path.resolve(__dirname, './dist/assets'),
      },
    ],
  },
};
