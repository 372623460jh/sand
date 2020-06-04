const { getSandBuildConfig } = require('../src/utils');
const { getPath } = require('../src/utils');
const { version } = require('../../sand-core/package.json');

test('读取并标准化.sandbuildrc.js => json', () => {
  const rootPath = process.cwd();
  // 标准化后的配置
  const result = {
    port: 9533,
    webpackOptions: {
      entryHtml: getPath(rootPath, './examples/common/index.html'),
      entry: getPath(rootPath, './examples/common/index.jsx'),
      basePath: rootPath,
      babelConfig: undefined,
      otherRules: [],
      alias: {},
      historyApiOpts: {},
    },
    configurations: [
      {
        entry: getPath(rootPath, './packages/sand-core/index.js'),
        pkgPath: getPath(rootPath, './packages/sand-core'),
        bundleName: 'sand-core',
        pkg: {
          name: '@jianghe/sand-core',
          version,
          private: false,
          description: 'sand pc的核心功能',
          license: 'MIT',
          authors: [
            {
              name: 'jianghe',
              email: '573748150jh@163.com',
            },
          ],
          main: './index.js',
          module: 'esm/sand-core.js',
          cjs: 'cjs/sand-core.js',
          keywords: ['sand-core'],
          scripts: {},
          dependencies: {
            'dva-core': '^1.4.0',
            history: '^4.9.0',
            'prop-types': '^15.7.2',
            react: '^16.13.1',
            'react-dom': '^16.13.1',
            'react-redux': '^6.0.1',
            'react-router-config': '^5.0.0',
            'react-router-dom': '^4.3.1',
          },
          repository: {
            type: 'git',
            url: 'https://github.com/372623460jh/sand.git',
          },
          publishConfig: {
            registry: 'https://registry.npmjs.org',
            access: 'public',
          },
        },
        isTs: false,
        cssExtract: false,
        alias: [],
        babelConfig: undefined,
        umdGlobals: {
          react: 'react',
          'react-dom': 'react-dom',
          'react-router-dom': 'react-router-dom',
          'react-redux': 'react-redux',
          'dva-core': 'dva-core',
          'prop-types': 'prop-types',
          history: 'history',
          'react-router-config': 'react-router-config',
        },
        namedExports: {},
      },
    ],
  };
  // 断言
  expect(
    getSandBuildConfig(getPath(__dirname, '../../../.sandbuildrc.js')),
  ).toEqual(result);
});
