const babel = require('rollup-plugin-babel');
const builtins = require('rollup-plugin-node-builtins');
const commonjs = require('rollup-plugin-commonjs');
const globals = require('rollup-plugin-node-globals');
const json = require('rollup-plugin-json');
const replace = require('rollup-plugin-replace');
const resolve = require('rollup-plugin-node-resolve');
const typescript = require('rollup-plugin-typescript2');
const alias = require('rollup-plugin-alias');
const { terser } = require('rollup-plugin-terser');
const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');
const { startCase } = require('lodash');
const { getBabelConfig } = require('./getBabelConfig');
const { getDepsConfig } = require('./getDepsConfig');
const { getPath, getBrowsersList } = require('../../utils');

/**
 * 根据options生成plugins
 * @param {*} options
 */
function getBasePlugins(options = {}) {
  const {
    // 是否单独提起css文件
    cssExtract,
    // 构建环境
    env,
    // 是不是ts
    isTs,
    // 别名配置
    aliasConfig,
    // 包名
    pathName,
    // isUmd
    isUmd,
    // umd构建时用来兼容commonjs
    namedExports,
    // 构建文件绝对路径
    packagesPath,
  } = options;

  // 是否是生产环境
  const isProd = env === 'production';

  /**
   * 基础别名，将@/* -> src/*
   */
  const baseAlias = [
    {
      find: /^@\/(.*)/,
      replacement: getPath(packagesPath, `./${pathName}/src/$1`),
    },
  ];

  return [
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
      // .module.css .module.less 自动使用css module
      autoModules: true,
      // 压缩css
      minimize: isProd,
      use: {
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
    // rollup-plugin-node-resolve, 它会允许加载在 node_modules 中的第三方模块。
    resolve({
      preferBuiltins: true,
      browser: true,
      // 允许引入以下3种文件类型
      extensions: ['.js', '.jsx', 'ts', 'tsx', '.json'],
    }),
    // 支持ts
    isTs && typescript({
      abortOnError: false,
      tsconfig: getPath(packagesPath, `./${pathName}/tsconfig.json`),
      clean: true,
    }),
    // 支持json模块的引入
    json(),
    // 替换代码中的'process.env.NODE_ENV'为JSON.stringify(env)
    replace({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
    // 让浏览器端支持node内置模块
    builtins(),
    // 使用babel处理代码
    babel(
      getBabelConfig({ packagesPath, isUmd, pathName }),
    ),
    // 别名
    alias({
      entries: [
        ...baseAlias,
        ...aliasConfig,
      ],
    }),
    // 让浏览器端支持node内置模块
    globals(),
    // umd 使用 rollup-plugin-commonjs, 它会将 CommonJS 模块转换为 ES6,来为 Rollup 获得兼容。
    isUmd && commonjs({
      // 忽略
      exclude: [`${getPath(packagesPath, `./${pathName}/src/**`)}`],
      namedExports: {
        ...namedExports,
      },
    }),
    // 如果是umd并且是生产环境就使用uglify压缩代码
    isUmd && isProd && terser(),
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
    packagesPath = '', // packages文件目录，绝对路径
    pathName = '', // 需要打包的包文件名
    pkgName = '', // 构建出来的文件名
    pkg = {}, // package.json对象
    isTs = false, // 是不是ts
    alias: aliasConfig = [], // 别名
    umdGlobals = {}, // 全局模块
    namedExports = {}, // cjs的模块在umd打包时需要手动声明名称：
    cssExtract = true, // 是否单独提起css文件
  } = config;

  const { version = '' } = pkg;

  // 入口文件
  const input = entry;

  // 广告
  const banner = '/*!\n'
    + ` * ${pkgName}.js v${version}\n`
    + ` * (c) 2019-${new Date().getFullYear()} Jiang He\n`
    + ' * Released under the MIT License.\n'
    + ' */';

  const deps = getDepsConfig({ pkg });

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
    // 是否单独提起css文件
    cssExtract,
    env,
    isTs,
    aliasConfig,
    pathName,
    isUmd,
    namedExports,
    packagesPath,
  });

  if (isUmd) {
    // umd构建配置
    return {
      plugins,
      input,
      onwarn,
      output: {
        // umd方式输出
        format: 'umd',
        // 输出路径从package.json中读
        file: getPath(packagesPath, `./${pathName}/${isProd ? `dist/${pkgName}.min.js` : `dist/${pkgName}.js`}`),
        exports: 'named',
        // 首字母大写
        name: startCase(pkgName).replace(/ /g, ''),
        // 全局模块，例如告诉Rollup jQuery 模块的id等同于 $ 变量最后生成umd代码时会是
        // var MyBundle = (function ($) {
        // }(window.jQuery));
        globals: {
          // ...getDepsMap({ pkg }),
          ...umdGlobals,
        },
        banner,
      },
      // 外部引用不打包
      external: Object.keys(umdGlobals || {}),
    };
  }

  // esm,cjs构建配置
  return {
    plugins,
    input,
    onwarn,
    output: target === 'esm' ? {
      file: getPath(packagesPath, `./${pathName}/esm/${pkgName}.js`),
      format: 'es',
      sourcemap: true,
      banner,
    } : {
      file: getPath(packagesPath, `./${pathName}/cjs/${pkgName}.js`),
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      banner,
    },
    // 我们需要显式地声明哪些模块是外部的，这意味着它们在运行时出现。
    // 对于非umd配置，这意味着所有的非slate包。
    external: (id) =>
    // 当构建时有引入模块时会执行该回调方法，如果返回true就表示是外部引入，false表示是内部引入，内部引入将会被打包构建，外部映入将不会被打包。
    // dependencies和peerDependencies中声明的包都会被当做外部引用不打包到项目中。
    // eslint-disable-next-line implicit-arrow-linebreak
      !!deps.find((dep) => dep === id || id.startsWith(`${dep}/`))
    ,
  };
}

/**
 * 生产rullup打包配置的方法
 * @param {*} config
 * @param {*} rootPath
 * @param {*} env
 */
function factory(config, env) {
  const isProd = env === 'production';
  return [
    configure(config, 'development', 'cjs'), // dev环境cjs输出
    configure(config, 'development', 'esm'), // dev环境esm输出
    isProd && configure(config, 'development', 'umd'), // prod环境 非压缩 umd 输出
    isProd && configure(config, 'production', 'umd'), // prod环境 umd 输出
  ].filter(Boolean); // .filter(Boolean)用于移除数组中的false
}

module.exports = factory;
