const path = require('path');
const ComponentTest = require('./packages/component-test/package.json');

module.exports = {
  // webpack服务启动端口
  port: 9898,
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
