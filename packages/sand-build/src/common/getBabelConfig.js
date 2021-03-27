/* eslint-disable @typescript-eslint/no-unused-vars */
const { extname } = require('path');
const { buildTypeEnum, moduleTypeEnum, extensions } = require('../constant');
const { getPath } = require('../utils');

/**
 * babel模式下需要将less转成css
 */
function transformImportLess2Css() {
  return {
    name: 'transform-import-less-to-css',
    visitor: {
      ImportDeclaration(path, source) {
        const re = /\.less$/;
        if (re.test(path.node.source.value)) {
          path.node.source.value = path.node.source.value.replace(re, '.css');
        }
      },
    },
  };
}

/**
 * 获取是不是浏览器模式
 * @param {*} opts
 */
const getIsBrowser = (opts) => {
  const {
    // 构建方式rollup | babel
    buildType,
    // 构建类型esm | cjs | umd
    moduleType,
    // 文件绝对路径babel模式下才有此参数
    filePath,
  } = opts;

  // esm和umd模式是浏览器模式
  let isBrowser =
    moduleType === moduleTypeEnum.esm || moduleType === moduleTypeEnum.umd;

  if (buildType === buildTypeEnum.babel) {
    // babel场景，如果是 jsx或tsx文件 一定是浏览器模式
    if (extname(filePath) === '.tsx' || extname(filePath) === '.jsx') {
      isBrowser = true;
    }
  }

  return isBrowser;
};

/**
 * 获取babel配置
 * @param {*} opts
 */
function getBabelConfig(opts) {
  const {
    // 构建方式rollup | babel
    buildType,
    // 构建类型esm | cjs | umd
    moduleType,
    // 要构建的文件路径，只有babel模式下才有
    filePath = '',
    // node的版本号，只有cjs模式下支持此参数
    nodeVersion,
    // packages文件目录，绝对路径
    packagesPath = '',
    // 要构建的包名
    pkgName = '',
    // 是否开启babelruntime
    babelRuntime = false,
  } = opts;

  // 是不是浏览器模式
  const isBrowser = getIsBrowser({
    buildType,
    moduleType,
    filePath,
  });

  // cjs 关闭runtimeHelpers
  const runtimeHelpers =
    moduleType === moduleTypeEnum.cjs ? false : babelRuntime;

  // babel targets 配置
  const targets = isBrowser
    ? {
        browsers: ['last 2 versions', 'IE 10'],
      }
    : { node: nodeVersion || 6 };

  return {
    // https://github.com/rollup/plugins/tree/master/packages/babel#babelhelpers
    babelHelpers: runtimeHelpers ? 'runtime' : 'bundled',
    // include: [`${getPath(packagesPath, `./${pkgName}/src/**`)}`],
    exclude: /\/node_modules\//,
    // 忽略外部babel配置
    babelrc: false,
    extensions,
    presets: [
      // 处理ts
      require.resolve('@babel/preset-typescript'),
      [
        require.resolve('@babel/preset-env'),
        moduleType === moduleTypeEnum.umd
          ? {
              modules: false,
            }
          : {
              targets,
              modules: moduleType === moduleTypeEnum.esm ? false : 'auto',
              exclude: ['@babel/plugin-transform-regenerator'],
            },
      ],
      // 处理react
      require.resolve('@babel/preset-react'),
    ],
    plugins: [
      // babel模式下 将less转css
      ...(buildType === buildTypeEnum.babel ? [transformImportLess2Css] : []),
      require.resolve('babel-plugin-react-require'),
      require.resolve('@babel/plugin-syntax-dynamic-import'),
      require.resolve('@babel/plugin-proposal-export-default-from'),
      require.resolve('@babel/plugin-proposal-export-namespace-from'),
      require.resolve('@babel/plugin-proposal-do-expressions'),
      require.resolve('@babel/plugin-proposal-nullish-coalescing-operator'),
      require.resolve('@babel/plugin-proposal-optional-chaining'),
      require.resolve('@babel/plugin-proposal-object-rest-spread'),
      [
        // 支持注解
        require.resolve('@babel/plugin-proposal-decorators'),
        { legacy: true },
      ],
      [
        // 支持class
        require.resolve('@babel/plugin-proposal-class-properties'),
        { loose: true },
      ],
      ...(runtimeHelpers
        ? [
            [
              // 把 helper 方法提取到 @babel/runtime 里。
              // 一定要在 dependencies 里有 @babel/runtime 依赖
              // runtimeHelpers 只对 esm 有效，cjs 下无效，因为 cjs 已经不给浏览器用了，
              // 只在 ssr 时会用到，无需关心小的尺寸差异
              require.resolve('@babel/plugin-transform-runtime'),
              moduleType === moduleTypeEnum.umd
                ? {}
                : {
                    useESModules:
                      isBrowser && moduleType === moduleTypeEnum.esm,
                    version: require('@babel/runtime/package.json').version,
                  },
            ],
          ]
        : []),
    ],
  };
}

module.exports = { getBabelConfig };
