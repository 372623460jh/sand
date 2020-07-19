const path = require('path');

module.exports = {
  // webpack服务启动端口
  port: 9898,
  //webpack配置
  webpackOptions: {
    entry: path.resolve(__dirname, './examples/common/index.tsx'),
    entryHtml: path.resolve(__dirname, './examples/common/index.html'),
    // ts过babel
    tsShouldBabel: true,
  },
  // rollup 配置
  configurations: [
    {
      entry: path.resolve(__dirname, './packages/component-test/src/index.ts'),
      pkgPath: path.resolve(__dirname, './packages/component-test'),
      bundleName: 'component-test',
      cssExtract: true,
      isTs: true,
      umdGlobals: {
        antd: 'antd',
        react: 'react',
        'react-dom': 'react-dom',
        '@ant-design/icons': 'icons',
      },
    },
  ],
};
