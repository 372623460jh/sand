const lib1 = require('./packages/lib1/package.json');
const lib2 = require('./packages/lib2/package.json');

module.exports = {
  // rollup 配置
  configurations: [
    // ./packages/lib1的配置
    {
      pathName: 'lib1',
      pkgName: 'moduleOne',
      pkg: lib1,
      // umd打包时不需要将底线库
      umdGlobals: {
        lodash: '_',
      },
    },
    // ./packages/lib2的配置
    {
      pathName: 'lib2',
      pkgName: 'moduleTwo',
      pkg: lib2,
    },
  ],
}
