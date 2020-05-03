const ComponentTest = require('./packages/component-test/package.json');
const path = require('path');


module.exports = {
  // webpack服务启动端口
  port: 9898,
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
      entry: path.resolve(__dirname, './packages/component-test/src/index.js'),
      packagesPath: path.resolve(__dirname, './packages'),
      pathName: 'component-test',
      pkgName: 'component-test',
      pkg: ComponentTest,
      umdGlobals: {
        'antd': 'antd',
        'prop-types': 'prop-types',
        'react': 'react',
        'react-dom': 'react-dom',
      },
    },
  ],
}
