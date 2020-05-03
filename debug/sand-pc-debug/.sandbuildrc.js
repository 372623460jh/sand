const ComponentTest = require('./packages/component-test/package.json');

module.exports = {
  // webpack服务启动端口
  port: 9898,
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
  ],
}
