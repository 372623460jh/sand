const { getSandBuildConfig } = require('../src/utils');
const { getPath } = require('../src/utils');
const { version } = require('../../sand-core/package.json');
const { version: versionMoco } = require('../../sand-moco/package.json');

test('读取并标准化.sandbuildrc.js => json', () => {
  const rootPath = process.cwd();
  // 标准化后的配置
  const result = {
    port: 9533,
    webpackOptions: {
      entryHtml: getPath(rootPath, './examples/common/index.html'),
      entry: getPath(rootPath, './examples/common/index.tsx'),
      basePath: rootPath,
      babelConfig: undefined,
      otherRules: [],
      copyPlugin: [],
      outputPath: '',
      alias: {},
      historyApiOpts: {},
      publicPath: {
        devPath: '/',
        prodPath: '/',
      },
      tsShouldBabel: true,
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
          main: 'esm/sand-core.js',
          module: 'esm/sand-core.js',
          cjs: 'cjs/sand-core.js',
          keywords: ['sand', 'spa', 'pc'],
          scripts: {},
          dependencies: {
            'dva-core': '^1.4.0',
            history: '^4.10.1',
            'prop-types': '^15.7.2',
            react: '^16.13.1',
            'react-dom': '^16.13.1',
            'react-redux': '^6.0.1',
            'react-router-config': '^5.1.1',
            'react-router': '^4.3.1',
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
      {
        alias: [],
        babelConfig: undefined,
        bundleName: 'sand-moco',
        cssExtract: false,
        entry:
          '/Users/jianghe/Desktop/jianghe_ws/sand/packages/sand-moco/src/index.ts',
        isTs: true,
        namedExports: {},
        pkg: {
          authors: [
            {
              email: '573748150jh@163.com',
              name: 'jianghe',
            },
          ],
          cjs: 'cjs/sand-moco.js',
          dependencies: {
            'dva-core': '^1.4.0',
            'react-redux': '^6.0.1',
          },
          description: 'sand移动端单页核心框架',
          devDependencies: {
            '@types/react-redux': '^6.0.14',
            '@types/webpack-env': '^1.15.2',
          },
          files: ['dist', 'esm', 'cjs'],
          keywords: ['sand', 'spa', 'mob'],
          license: 'MIT',
          main: 'esm/sand-moco.js',
          module: 'esm/sand-moco.js',
          name: '@jianghe/sand-moco',
          peerDependencies: {
            react: '^16.13.1',
            'react-dom': '^16.13.1',
          },
          private: false,
          publishConfig: {
            access: 'public',
            registry: 'https://registry.npmjs.org',
          },
          repository: {
            type: 'git',
            url: 'https://github.com/372623460jh/sand.git',
          },
          scripts: {},
          version: versionMoco,
        },
        pkgPath: '/Users/jianghe/Desktop/jianghe_ws/sand/packages/sand-moco',
        umdGlobals: {
          'dva-core': 'dva-core',
          react: 'react',
          'react-dom': 'react-dom',
          'react-redux': 'react-redux',
        },
      },
    ],
  };
  // 断言
  expect(
    getSandBuildConfig(getPath(__dirname, '../../../.sandbuildrc.js'))
  ).toEqual(result);
});
