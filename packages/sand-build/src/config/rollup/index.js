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
const { startCase } = require('lodash');
const path = require('path');
const { getBabelConfig } = require('./getBabelConfig');
const { getDepsConfig } = require('./getDepsConfig');

/**
 * 根据配置，环境，模块化规范返回Rollup配置
 * @param {*} config 配置
 * @param {*} rootPath 配置的根目录
 * @param {*} env 环境
 * @param {*} target 模块化规范，umd|cjs|esm
 */
function configure(config, rootPath, env, target) {
  // 是否是生产环境
  const isProd = env === 'production';
  // 是否是umd
  const isUmd = target === 'umd';
  const {
    pathName = '', // 需要打包的包文件名
    pkgName = '', // 构建出来的文件名
    pkg = {}, // package.json对象
    isTs = false, // 是不是ts
    alias: aliasConfig = [], // 别名
    umdGlobals = {}, // 全局模块
    namedExports = {}, // cjs的模块在umd打包时需要手动声明名称：
  } = config;

  /**
   * 获取文件的相对与.sandbuildrc.js文件的目录
   * @param {*} p
   */
  const pathResolve = (p) => path.resolve(rootPath, p);

  const { version = '' } = pkg;

  // 入口文件
  const input = pathResolve(`./packages/${pathName}/src/${isTs ? 'index.ts' : 'index.js'}`);

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

  /**
   * 基础别名，将@/* -> src/*
   */
  const baseAlias = [
    {
      find: /^@\/(.*)/,
      replacement: pathResolve(`./packages/${pathName}/src/$1`),
    },
  ];

  const plugins = [
    // rollup-plugin-node-resolve, 它会允许加载在 node_modules 中的第三方模块。
    resolve({
      browser: true,
    }),

    // 支持ts
    isTs && typescript({
      abortOnError: false,
      tsconfig: pathResolve(`./packages/${pathName}/tsconfig.json`),
      clean: true,
    }),

    // umd 使用 rollup-plugin-commonjs, 它会将 CommonJS 模块转换为 ES6,来为 Rollup 获得兼容。
    isUmd && commonjs({
      // 忽略
      exclude: [`packages/${pathName}/src/**`],
      namedExports: {
        ...namedExports,
      },
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
      getBabelConfig({ isUmd, pathName }),
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

    // 如果是umd并且是生产环境就使用uglify压缩代码
    isUmd && isProd && terser(),

  ].filter(Boolean); // .filter(Boolean)用于移除数组中的false

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
        file: pathResolve(`./packages/${pathName}/${isProd ? `dist/${pkgName}.min.js` : `dist/${pkgName}.js`}`),
        exports: 'named',
        // 首字母大写
        name: startCase(pkgName).replace(/ /g, ''),
        // 全局模块，例如告诉Rollup jQuery 模块的id等同于 $ 变量最后生成umd代码时会是
        // var MyBundle = (function ($) {
        // }(window.jQuery));
        globals: {
          ...umdGlobals,
        },
        banner,
      },
      // 外部引用不打包
      external: Object.keys(umdGlobals || {}),
      // rollup watch 模式时忽略node_module下的文件变化
      watch: {
        exclude: 'node_modules/**',
      },
    };
  }

  // esm,cjs构建配置
  return {
    plugins,
    input,
    onwarn,
    output: target === 'esm' ? {
      file: pathResolve(`./packages/${pathName}/esm/${pkgName}.es.js`),
      format: 'es',
      sourcemap: true,
      banner,
    } : {
      file: pathResolve(`./packages/${pathName}/cjs/${pkgName}.js`),
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      banner,
    },
    // We need to explicitly state which modules are external, meaning that they are present at runtime. In the case of non-UMD configs, this meansall non-Slate packages.
    // 我们需要显式地声明哪些模块是外部的，这意味着它们在运行时出现。对于非umd配置，这意味着所有的非slate包。
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
function factory(config, rootPath, env) {
  const isProd = env === 'prod';
  return [
    configure(config, rootPath, 'development', 'cjs'), // dev环境cjs输出
    configure(config, rootPath, 'development', 'esm'), // dev环境esm输出
    isProd && configure(config, rootPath, 'development', 'umd'), // prod环境 非压缩 umd 输出
    isProd && configure(config, rootPath, 'production', 'umd'), // prod环境 umd 输出
  ].filter(Boolean); // .filter(Boolean)用于移除数组中的false
}

module.exports = factory;
