const path = require('path');

module.exports = {
  //webpack配置
  webpackOptions: {
    // 服务启动端口
    port: 9533,
    entry: path.resolve(__dirname, './examples/common/index.tsx'),
    entryHtml: path.resolve(__dirname, './examples/common/index.html'),
    // ts过babel
    tsShouldBabel: true,
  },
  // lib配置
  libsOptions: [
    {
      entry: path.resolve(__dirname, './packages/sand-core/src/index.ts'),
      pkgPath: path.resolve(__dirname, './packages/sand-core'),
      bundleName: 'sand-core',
      isTs: true,
      esm: {
        buildType: 'rollup',
      },
      cjs: {
        buildType: 'rollup',
      },
      umd: {
        buildType: 'rollup',
      },
      umdGlobals: {
        react: 'react',
        'react-dom': 'react-dom',
        'react-router-dom': 'react-router-dom',
        'react-router-config': 'react-router-config',
        history: 'history',
        'react-redux': 'react-redux',
        'dva-core': 'dva-core',
        'prop-types': 'prop-types',
      },
    },
    {
      entry: path.resolve(__dirname, './packages/sand-moco/src/index.ts'),
      pkgPath: path.resolve(__dirname, './packages/sand-moco'),
      bundleName: 'sand-moco',
      isTs: true,
      esm: {
        buildType: 'rollup',
      },
      cjs: {
        buildType: 'rollup',
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
    },
  ],
};
