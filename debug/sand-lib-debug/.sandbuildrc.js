const path = require('path');

module.exports = {
  // webpack服务启动端口
  port: 9898,
  // rollup 配置
  configurations: [
    // {
    //   buildType: 'rollup',
    //   entry: path.resolve(__dirname, './packages/component-test/src/index.js'),
    //   pkgPath: path.resolve(__dirname, './packages/component-test'),
    //   bundleName: 'comp',
    //   cssExtract: true,
    //   umdGlobals: {
    //     antd: 'antd',
    //     '@jianghe/sand-core': 'sand-core',
    //     '@jianghe/sand-core/react': 'react',
    //     '@jianghe/sand-core/react-dom': 'react-dom',
    //   },
    //   moduleType: ['cjs', 'esm'],
    //   nodeVersion: 7,
    //   replaceConfig: {
    //     __TEST_VARIABLE__: `console.log('test replace config')`,
    //   },
    // },
    // {
    //   entry: path.resolve(__dirname, './packages/ts-test/src/index.ts'),
    //   pkgPath: path.resolve(__dirname, './packages/ts-test'),
    //   bundleName: 'test',
    //   isTs: true,
    //   cssExtract: false,
    //   umdGlobals: {
    //     'react-redux': 'react-redux',
    //     'dva-core': 'dva-core',
    //     react: 'react',
    //     'react-dom': 'react-dom',
    //   },
    //   moduleType: ['esm', 'umd'],
    //   replaceConfig: {
    //     __TEST_VARIABLE__: `console.log('test replace config')`,
    //   },
    // },
    {
      buildType: 'babel',
      pkgPath: path.resolve(__dirname, './packages/component-test'),
      nodeVersion: 6,
      moduleType: ['umd', 'esm', 'cjs'],
    },
    {
      buildType: 'babel',
      pkgPath: path.resolve(__dirname, './packages/ts-test'),
      isTs: true,
      moduleType: ['umd', 'esm', 'cjs'],
    },
    {
      buildType: 'babel',
      pkgPath: path.resolve(__dirname, './packages/babel-ts'),
      isTs: true,
      nodeVersion: 7,
      moduleType: ['umd', 'esm', 'cjs'],
    },
    {
      buildType: 'babel',
      pkgPath: path.resolve(__dirname, './packages/babel-js'),
      moduleType: ['umd', 'esm', 'cjs'],
    },
  ],
};
