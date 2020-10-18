const path = require('path');

module.exports = {
  webpackOptions: {
    port: 9898,
    entry: path.resolve(__dirname, './examples/common/index.tsx'),
    entryHtml: path.resolve(__dirname, './examples/common/index.html'),
    tsShouldBabel: true,
  },
  libsOptions: [
    {
      entry: path.resolve(__dirname, './packages/component-test/src/index.ts'),
      pkgPath: path.resolve(__dirname, './packages/component-test'),
      bundleName: 'component-test',
      cssExtract: true,
      isTs: true,
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
        '@ant-design/icons': 'icons',
      },
    },
  ],
};
