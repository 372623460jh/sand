const path = require('path');
const url = require('@rollup/plugin-url');
const json = require('@rollup/plugin-json');
const postcss = require('rollup-plugin-postcss');
const replace = require('@rollup/plugin-replace');
const nodeResolve = require('@rollup/plugin-node-resolve').default;
const typescript2 = require('rollup-plugin-typescript2');
const commonjs = require('@rollup/plugin-commonjs');
const babel = require('@rollup/plugin-babel').default;
const { terser } = require('rollup-plugin-terser');
const autoprefixer = require('autoprefixer');
const { startCase } = require('lodash');
const alias = require('@rollup/plugin-alias');
const { getBabelConfig } = require('../common/getBabelConfig');
const { getDepsConfig } = require('./getDepsConfig');
const { getPath, logError } = require('../utils');
const { getBrowsersList } = require('../common/getBrowsersList');
const { buildTypeEnum, moduleTypeEnum, extensions } = require('../constant');

/**
 * 根据options生成plugins
 * @param {*} options
 */
function getBasePlugins(options = {}) {
  const {
    // 构建类型esm | cjs | umd
    moduleType,
    // 是否单独提起css文件
    cssExtract,
    // 构建环境
    env,
    // 是不是ts
    isTs,
    // 别名配置
    aliasConfig,
    // 包名
    pkgName,
    // isUmd
    isUmd,
    // 是否开启babelruntime
    babelRuntime,
    // packages文件绝对路径
    packagesPath,
    // 覆盖的babel配置
    babelConfig,
    // replace插件漏出的扩展配置，
    replaceConfig,
    // cjs模式下的node版本
    nodeVersion,
  } = options;

  // 是否是生产环境
  const isProd = env === 'production';

  /**
   * 基础别名，将@/* -> src/*
   */
  const baseAlias = [
    {
      find: /^@\/(.*)/,
      replacement: getPath(packagesPath, `./${pkgName}/src/$1`),
    },
  ];

  // 读取babel配置
  let babelConfigObj = getBabelConfig({
    // 构建方式
    buildType: buildTypeEnum.rollup,
    // 构建类型esm | cjs | umd
    moduleType,
    // 包的绝对路径
    packagesPath,
    // 包名
    pkgName,
    // cjs模式下的node版本
    nodeVersion,
    // 是否开启babelruntime
    babelRuntime,
  });

  if (babelConfig) {
    babelConfigObj = babelConfig(babelConfigObj);
  }

  return [
    // 支持非js、css的模块引入
    url(),
    // 处理css,less
    postcss({
      // 是否单独提起css文件
      extract: cssExtract,
      // 支持的文件扩展名
      extensions: ['.css', '.less'],
      // 将css注入到head中
      inject: true,
      // // css modules
      // modules: false,
      // 根据文件名自动使用css module（*.module.css、*.module.less）
      autoModules: true,
      // 压缩css
      minimize: isProd,
      use: {
        // 支持less
        less: {
          plugins: [],
          javascriptEnabled: true,
        },
      },
      // 插件
      plugins: [
        // 添加前缀
        autoprefixer(getBrowsersList(isProd)),
      ],
    }),
    // 替换代码中的'process.env.NODE_ENV'为JSON.stringify(env)
    replace({
      preventAssignment: true,
      values: {
        'process.env.NODE_ENV': JSON.stringify(env),
        ...replaceConfig,
      },
    }),
    // @rollup/plugin-node-resolve, 它会允许加载在 node_modules 中的第三方模块。
    nodeResolve({
      mainFields: ['module', 'jsnext:main', 'main'],
      // 允许引入以下文件类型
      extensions,
    }),
    // 支持ts
    isTs &&
      typescript2({
        // 设置为true以进行干净的构建（清除每个构建上的缓存）。
        clean: true,
        // tsconfig配置
        tsconfig: getPath(packagesPath, `./${pkgName}/tsconfig.json`),
      }),
    // 使用babel处理代码
    babel(babelConfigObj),
    // 别名
    alias({
      entries: [...baseAlias, ...aliasConfig],
    }),
    // 支持json模块的引入
    json(),
    // umd 使用 rollup-plugin-commonjs, 它会将 CommonJS 模块转换为 ES6,来为 Rollup 获得兼容。
    isUmd &&
      commonjs({
        include: /node_modules/,
        // 忽略
        // exclude: [`${getPath(packagesPath, `./${pkgName}/src/**`)}`],
        // namedExports 配置以及被rollup移除 from https://github.com/rollup/plugins/pull/149
      }),
    // 如果是umd并且是生产环境就使用uglify压缩代码
    isUmd &&
      isProd &&
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false,
        },
      }),
  ].filter(Boolean); // .filter(Boolean)用于移除数组中的false
}

/**
 * 根据配置，环境，模块化规范返回Rollup配置
 * @param {*} config 配置
 * @param {*} env 环境
 * @param {*} target 模块化规范，umd|cjs|esm
 */
function configure(config, env, target) {
  // 是否是生产环境
  const isProd = env === 'production';
  // 是否是umd
  const isUmd = target === 'umd';

  const {
    entry = '', // 入口文件，绝对路径
    pkgPath = '', // 需要构建库的入口文件，绝对路径
    bundleName = '', // 构建出来的文件名
    pkg = {}, // package.json对象
    isTs = false, // 是不是ts
    alias: aliasConfig = [], // 别名
    umdGlobals = {}, // 全局模块
    babelRuntime = false, // 是否开启babelruntime
    cssExtract = false, // 是否单独提起css文件
    babelConfig, // bable配置用于替换内置babel配置（非必填，默认：内置babel配置）
    // replace插件漏出的扩展配置，
    replaceConfig,
    nodeVersion,
  } = config;

  // 版本
  const { version = '' } = pkg;
  // 包名
  const pkgName = path.basename(pkgPath);
  // packages文件绝对路径
  const packagesPath = getPath(pkgPath, '../../packages');
  // 入口文件
  const input = entry;

  // 广告
  const banner =
    '/*!\n' +
    ` * ${bundleName}.js v${version}\n` +
    ` * (c) 2019-${new Date().getFullYear()} Jiang He\n` +
    ' * Released under the MIT License.\n' +
    ' */';

  // 获取包依赖
  const deps = getDepsConfig({ pkg });

  /**
   * 当构建时有引入模块时会执行该回调方法，如果返回true就表示是外部引入，false表示是内部引入，内部引入将会被打包构建，外部映入将不会被打包。
   * dependencies和peerDependencies中声明的包都会被当做外部引用不打包到项目中。
   * @param {*} id
   * @returns
   */
  const externalFn = (id) => {
    const outSide = !!deps.find((dep) => {
      return dep === id || id.startsWith(`${dep}/`);
    });
    return outSide;
  };

  /**
   * rollup构建时有警告回调
   * @param {*} warning
   */
  const onwarn = (warning) => {
    // 循环依赖时停止Rollup
    if (warning.code !== 'CIRCULAR_DEPENDENCY') {
      // eslint-disable-next-line no-console
      console.warn(`(!) ${warning.message}`);
    }
  };

  // 获取插件配置
  const plugins = getBasePlugins({
    moduleType: target,
    babelConfig,
    // 是否单独提起css文件
    cssExtract,
    env,
    isTs,
    aliasConfig,
    pkgName,
    isUmd,
    babelRuntime,
    packagesPath,
    // replace插件漏出的扩展配置，
    replaceConfig,
    nodeVersion,
  });

  if (isUmd) {
    // umd构建配置
    return {
      input,
      output: {
        // 输出
        file: getPath(
          packagesPath,
          `./${pkgName}/${
            isProd ? `dist/${bundleName}.min.js` : `dist/${bundleName}.js`
          }`
        ),
        // umd方式输出
        format: 'umd',
        sourcemap: true,
        // 首字母大写
        name: startCase(bundleName).replace(/ /g, ''),
        // 全局模块，例如告诉Rollup jQuery 模块的id等同于 $ 变量最后生成umd代码时会是
        // var MyBundle = (function ($) {
        // }(window.jQuery));
        globals: {
          ...umdGlobals,
        },
        banner,
      },
      plugins,
      onwarn,
      // 哪些包不需要被打包
      external: externalFn,
    };
  } else if (target === moduleTypeEnum.esm) {
    // esm构建配置
    return {
      input,
      output: {
        file: getPath(packagesPath, `./${pkgName}/es/${bundleName}.js`),
        format: 'es',
        sourcemap: true,
        banner,
      },
      plugins,
      onwarn,
      // 哪些包不需要被打包
      external: externalFn,
    };
  } else if (target === moduleTypeEnum.cjs) {
    // cjs构建配置
    return {
      input,
      output: {
        file: getPath(packagesPath, `./${pkgName}/lib/${bundleName}.js`),
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
        banner,
      },
      plugins,
      onwarn,
      // 哪些包不需要被打包
      external: externalFn,
    };
  } else {
    logError('rollup构建产物配置不合法，只允许cjs，esm，umd模式');
  }
}

/**
 * 生产rullup打包配置的方法
 * @param {*} config 打包配置
 * @param {*} env 环境
 * @param {*} moduleType 构建模块的类型
 */
function factory(config, env, moduleType) {
  return [configure(config, env, moduleType)];
}

module.exports = {
  factory,
};
