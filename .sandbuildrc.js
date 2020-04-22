const lib1 = require('./packages/lib1/package.json');
const lib2 = require('./packages/lib2/package.json');
const ComponentTest = require('./packages/component-test/package.json');
const index = require('./packages/index/package.json');

module.exports = {
  // webpack服务启动端口
  port: 9533,
  // rollup 配置
  configurations: [
    {
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
    {
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
      pathName: 'lib1',
      pkgName: 'moduleOne',
      pkg: lib1,
      // umd打包时不需要将底线库
      umdGlobals: {
        lodash: '_',
      },
    },
    {
      pathName: 'lib2',
      pkgName: 'moduleTwo',
      pkg: lib2,
    },
  ],
}
