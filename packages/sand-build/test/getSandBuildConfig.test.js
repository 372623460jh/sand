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
        entry: getPath(rootPath, './packages/sand-core/src/index.ts'),
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
          files: [
            'dist',
            'esm',
            'cjs',
            'history.js',
            'polyfill.js',
            'prop-types.js',
            'react.js',
            'react-dom.js',
            'react-redux.js',
            'router-config.js',
            'router-dom.js',
            'server.js',
          ],
          main: 'esm/sand-core.js',
          module: 'esm/sand-core.js',
          cjs: 'cjs/sand-core.js',
          keywords: ['sand', 'spa', 'pc'],
          scripts: {},
          dependencies: {
            'dva-core': '1.4.0',
            history: '4.10.1',
            'prop-types': '15.7.2',
            react: '16.13.1',
            'react-dom': '16.13.1',
            'react-redux': '6.0.1',
            'react-router-config': '5.1.1',
            'react-router': '4.3.1',
            'react-router-dom': '4.3.1',
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
        isTs: true,
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
        moduleType: ['cjs', 'esm', 'umd'],
        namedExports: {},
      },
      {
        entry: getPath(rootPath, './packages/sand-moco/src/index.ts'),
        pkgPath: getPath(rootPath, './packages/sand-moco'),
        alias: [],
        babelConfig: undefined,
        bundleName: 'sand-moco',
        cssExtract: false,
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
            'dva-core': '1.4.0',
            'react-redux': '6.0.1',
          },
          description: 'sand移动端单页核心框架',
          devDependencies: {
            '@types/react-redux': '6.0.14',
            '@types/webpack-env': '1.15.2',
          },
          files: ['dist', 'esm', 'cjs'],
          keywords: ['sand', 'spa', 'mob'],
          license: 'MIT',
          main: 'esm/sand-moco.js',
          module: 'esm/sand-moco.js',
          name: '@jianghe/sand-moco',
          peerDependencies: {
            react: '16.13.1',
            'react-dom': '16.13.1',
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
        moduleType: ['cjs', 'esm', 'umd'],
        umdGlobals: {
          'dva-core': 'dva-core',
          react: 'react',
          'react-dom': 'react-dom',
          'react-redux': 'react-redux',
        },
      },
      {
        entry: getPath(rootPath, './packages/sand-noco/src/index.ts'),
        pkgPath: getPath(rootPath, './packages/sand-noco'),
        alias: [],
        babelConfig: undefined,
        bundleName: 'sand-noco',
        cssExtract: false,
        isTs: true,
        moduleType: ['cjs'],
        namedExports: {},
        pkg: {
          authors: [
            {
              email: '573748150jh@163.com',
              name: 'jianghe',
            },
          ],
          dependencies: {
            ejs: '3.1.3',
            koa: '2.13.0',
            'koa-bodyparser': '4.3.0',
            'koa-router': '9.1.0',
            'koa-views': '6.3.0',
            'koa2-cors': '2.0.6',
            log4js: '6.3.0',
          },
          description: 'node',
          keywords: ['sand-noco'],
          license: 'MIT',
          main: './index.js',
          name: '@jianghe/sand-noco',
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
          version: '1.2.3-6',
        },
        umdGlobals: {},
      },
    ],
  };
  // 断言
  expect(
    getSandBuildConfig(getPath(__dirname, '../../../.sandbuildrc.js'))
  ).toEqual(result);
});
