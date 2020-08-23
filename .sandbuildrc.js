const path = require('path');

module.exports = {
  // 服务启动端口
  port: 9533,
  //webpack配置
  webpackOptions: {
    entry: path.resolve(__dirname, './examples/common/index.tsx'),
    entryHtml: path.resolve(__dirname, './examples/common/index.html'),
    // ts过babel
    tsShouldBabel: true,
  },
  // rollup 配置
  configurations: [
    {
      entry: path.resolve(__dirname, './packages/sand-core/src/index.ts'),
      pkgPath: path.resolve(__dirname, './packages/sand-core'),
      bundleName: 'sand-core',
      isTs: true,
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
      moduleType: ['esm'],
    },
    {
      entry: path.resolve(__dirname, './packages/sand-moco/src/index.ts'),
      pkgPath: path.resolve(__dirname, './packages/sand-moco'),
      bundleName: 'sand-moco',
      isTs: true,
      cssExtract: false,
      umdGlobals: {
        'react-redux': 'react-redux',
        'dva-core': 'dva-core',
        react: 'react',
        'react-dom': 'react-dom',
      },
      moduleType: ['esm'],
    },
    // {
    //   buildType: 'babel',
    //   pkgPath: path.resolve(__dirname, './packages/sand-core'),
    //   isTs: true,
    //   nodeVersion: 8,
    //   moduleType: ['esm', 'cjs'],
    // },
    // {
    //   buildType: 'babel',
    //   pkgPath: path.resolve(__dirname, './packages/sand-moco'),
    //   isTs: true,
    //   nodeVersion: 8,
    //   moduleType: ['esm', 'cjs'],
    // },
  ],
};
