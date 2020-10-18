const path = require('path');

module.exports = {
  webpackOptions: {
    port: 9898,
    entry: path.resolve(__dirname, './examples/common/index.jsx'),
    entryHtml: path.resolve(__dirname, './examples/common/index.html'),
  },
  libsOptions: [
    {
      entry: path.resolve(__dirname, './packages/component-test/src/index.js'),
      pkgPath: path.resolve(__dirname, './packages/component-test'),
      bundleName: 'component-test',
      cssExtract: true,
      esm: {
        buildType: 'rollup',
      },
      cjs: {
        buildType: 'rollup',
      },
      umd: {
        buildType: 'rollup',
      },
      umdGlobals: {
        antd: 'antd',
        react: 'react',
        'react-dom': 'react-dom',
      },
    },
  ],
};
