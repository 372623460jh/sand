const path = require('path');

module.exports = {
  // lib 配置
  libsOptions: [
    {
      entry: path.resolve(__dirname, './packages/component-test/src/index.js'),
      pkgPath: path.resolve(__dirname, './packages/component-test'),
      bundleName: 'component-test',
      esm: {
        buildType: 'babel',
      },
      cjs: {
        buildType: 'babel',
      },
      umd: {
        buildType: 'rollup',
      },
      umdGlobals: {
        antd: 'antd',
        '@jianghe/sand-core': 'sand-core',
        '@jianghe/sand-core/react': 'react',
        '@jianghe/sand-core/react-dom': 'react-dom',
      },
      nodeVersion: 6,
      replaceConfig: {
        __TEST_VARIABLE__: `console.log('test replace config')`,
      },
    },
    {
      entry: path.resolve(__dirname, './packages/ts-test/src/index.ts'),
      pkgPath: path.resolve(__dirname, './packages/ts-test'),
      bundleName: 'ts-test',
      isTs: true,
      esm: {
        buildType: 'rollup',
      },
      cjs: {
        buildType: 'babel',
      },
      umd: {
        buildType: 'rollup',
      },
      umdGlobals: {
        'react-redux': 'react-redux',
        'dva-core': 'dva-core',
        react: 'react',
        'react-dom': 'react-dom',
      },
      nodeVersion: 6,
      replaceConfig: {
        __TEST_VARIABLE__: `console.log('test replace config')`,
      },
    },
    {
      entry: path.resolve(__dirname, './packages/babel-ts/src/index.ts'),
      pkgPath: path.resolve(__dirname, './packages/babel-ts'),
      bundleName: 'babel-ts',
      isTs: true,
      nodeVersion: 6,
      esm: {
        buildType: 'babel',
      },
      cjs: {
        buildType: 'rollup',
      },
      replaceConfig: {
        __TEST_VARIABLE__: `console.log('test replace config')`,
      },
    },
    {
      entry: path.resolve(__dirname, './packages/babel-js/src/index.js'),
      pkgPath: path.resolve(__dirname, './packages/babel-js'),
      bundleName: 'babel-js',
      nodeVersion: 6,
      esm: {
        buildType: 'babel',
      },
      cjs: {
        buildType: 'rollup',
      },
      replaceConfig: {
        __TEST_VARIABLE__: `console.log('test replace config')`,
      },
    },
  ],
};
