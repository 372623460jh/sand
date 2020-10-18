const path = require('path');

module.exports = {
  webpackOptions: {
    port: 9540,
    entry: path.resolve(__dirname, './examples/common/index.tsx'),
    entryHtml: path.resolve(__dirname, './examples/common/index.html'),
    // 入口文件所在文件夹
    basePath: path.resolve(__dirname, '../sand-demo-debug'),
    // ts过babel
    tsShouldBabel: true,
    replaceConfig: {
      __TEST_VARIABLE__: `console.log('test replace config')`,
    },
    extendPlugin: {
      devExtendPlugin: [],
      prodExtendPlugin: [],
    },
    // externals: {
    //   react: 'react',
    // },
  },
};
