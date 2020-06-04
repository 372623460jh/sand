const path = require('path');

module.exports = {
  // 服务启动端口
  port: 9533,
  //webpack配置
  webpackOptions: {
    entry: path.resolve(__dirname, './examples/common/index.jsx'),
    entryHtml: path.resolve(__dirname, './examples/common/index.html'),
  },
  // rollup 配置
  configurations: [
    {
      entry: path.resolve(__dirname, './packages/sand-core/index.js'),
      pkgPath: path.resolve(__dirname, './packages/sand-core'),
      bundleName: 'sand-core',
      umdGlobals: {
        react: 'react',
        'react-dom': 'react-dom',
        'react-router-dom': 'react-router-dom',
        'react-router-config': 'react-router-config',
        history: 'history',
        'react-redux': 'react-redux',
        'dva-core': 'dva-core',
        'prop-types': 'prop-types',
      },
    },
  ],
};
