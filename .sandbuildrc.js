const index = require('./packages/index/package.json');
const sandCore = require('./packages/sand-core/package.json');
const path = require('path');

module.exports = {
  // 服务启动端口
  port: 9533,
  //webpack配置
  webpackOptions: {
    htmlTitle: 'sand-demo',
    entry: path.resolve(__dirname, './examples/common/index.jsx'),
    entryHtml: path.resolve(__dirname, './examples/common/index.html'),
    // 入口文件所在文件夹
    demoBasePath: path.resolve(__dirname, './examples'),
  },
  // rollup 配置
  configurations: [
    {
      entry: path.resolve(__dirname, './packages/index/src/index.js'),
      packagesPath: path.resolve(__dirname, './packages'),
      pathName: 'index',
      pkgName: 'index-entry',
      pkg: index,
      cssExtract: false,
      umdGlobals: {
        'react': 'react',
        'react-dom': 'react-dom',
      },
    },
    {
      entry: path.resolve(__dirname, './packages/sand-core/index.js'),
      packagesPath: path.resolve(__dirname, './packages'),
      pathName: 'sand-core',
      pkgName: 'sand-core',
      pkg: sandCore,
      cssExtract: false,
      umdGlobals: {
        'react': 'react',
        'react-dom': 'react-dom',
        'react-router-dom': 'react-router-dom',
        'react-redux': 'react-redux',
        'react-loadable': 'react-loadable',
        'dva-core': 'dva-core',
        'prop-types': 'prop-types',
      },
    },
  ],
}
