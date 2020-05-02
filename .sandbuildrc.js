const index = require('./packages/index/package.json');

module.exports = {
  // webpack服务启动端口
  port: 9533,
  // rollup 配置
  configurations: [
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
  ],
}
