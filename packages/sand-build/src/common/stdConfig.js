/**
 * 该文件中的方法用于标准化sandbuildrc.js中的配置
 */
const { logError, getDefault, getPath } = require('../utils');
const { DEFAULT_PORT } = require('../constant');

/**
 * webpackOptions标准化
 * @param {*} options
 */
function stdWebpackOptions(options) {
  const {
    // 入口html（必填）
    entryHtml = '',
    // 入口文件（必填）
    entry = '',
    // 端口
    port = DEFAULT_PORT,
    // 项目跟目录（非必填，默认process.cwd()）
    basePath = process.cwd(),
    // 输出路径 为空的话指向process.cwd()/dist
    outputPath = '',
    // bable配置用于替换内置babel配置（非必填）
    babelConfig = undefined,
    // webpack要扩展的其他rules（非必填）
    ruleConfig = undefined,
    // splitChunks扩展
    splitChunksConfig = undefined,
    // 别名,非必填
    alias = {},
    // 拷贝插件
    copyPlugin = [],
    // 构建时设置publicPath
    publicPath = {
      devPath: '/',
      prodPath: '/',
    },
    // history中间件选项，决定哪些请求需要重定向到index.html,解决history路由找不到页面的情况
    historyApiOpts = {},
    // ts是否需要过babel。web项目需要过babel，node项目不需要。如果需要过babel，ts的编译产物必须是es规范。
    tsShouldBabel = false,
    // 外部传入的替换变量
    replaceConfig = {},
    // 外部传入的扩展插件
    extendPlugin = {
      // development 扩展插件
      devExtendPlugin: [],
      // production 扩展插件
      prodExtendPlugin: [],
    },
    // 哪些库不打入bundle中
    externals = {},
  } = options;

  if (!entryHtml || !entry) {
    logError('webpackOptions.entryHtml和webpackOptions.entry为必填项');
    return {};
  }

  return {
    entryHtml,
    entry,
    port,
    basePath,
    babelConfig,
    ruleConfig,
    splitChunksConfig,
    alias,
    historyApiOpts,
    outputPath,
    copyPlugin,
    publicPath,
    tsShouldBabel,
    replaceConfig,
    extendPlugin,
    externals,
  };
}

/**
 * libsOptions 标准化
 * @param {*} option
 */
function stdLibConfig(option) {
  const {
    // 入口文件，绝对路径
    entry = '',
    // 包的目录
    pkgPath = '',
    // 构建出来的文件名, 必填
    bundleName = '',
    // 是否单独提取 css 文件，默认是 false，只有 rollup 构建下生效。
    cssExtract = false,
    // 配置 esm 的构建方式，可以配置 rollup 或 babel。
    esm = undefined,
    // 配置 cjs 的构建方式，可以配置 rollup 或 babel。
    cjs = undefined,
    // 配置 umd 的构建方式，umd 只支持 rollup 构建。
    umd = undefined,
    // 是否是 ts,默认 false。
    isTs = false,
    // cjs模式可以指定node版本 默认6。其他模式下不生效
    nodeVersion = '6',
    // babel扩展
    babelConfig = undefined,
    // 别名,内置了@ -> src 的别名。只有 rollup 构建时会生效
    alias = [],
    // 替换配置replace的漏出
    replaceConfig = {},
    // 全局模块，只有 rollup，umd 模式下生效。
    umdGlobals = {},
    // 是否开启babelruntime，把 helper 方法提取到 @babel/runtime 里。一定要在 dependencies 里有 @babel/runtime 依赖
    babelRuntime = false,
  } = option;

  if (!entry || !pkgPath || !bundleName) {
    logError(
      'lib模式下libsOptions[].entry和libsOptions[].pkgPath和libsOptions[].bundleName为必填项'
    );
    return {};
  }

  // 读取package.json
  // eslint-disable-next-line
  const pkgJson = require(getPath(pkgPath, './package.json'));

  return {
    entry,
    pkgPath,
    bundleName,
    esm,
    cjs,
    umd,
    pkg: pkgJson,
    isTs: !!isTs,
    cssExtract: !!cssExtract,
    alias,
    umdGlobals,
    babelRuntime,
    babelConfig,
    replaceConfig,
    nodeVersion,
  };
}

/**
 * 标准化sandBuild配置
 * @param {*} options
 */
function stdSandBuildOpts(options) {
  // 标准化后的配置
  const stdOpts = {};
  const { webpackOptions, libsOptions } = options;

  if (webpackOptions) {
    stdOpts.webpackOptions = stdWebpackOptions(webpackOptions);
  }

  if (libsOptions && Array.isArray(libsOptions) && libsOptions.length > 0) {
    const stdconfig = [];
    for (let n = 0; n < libsOptions.length; n++) {
      const option = libsOptions[n];
      stdconfig.push(stdLibConfig(option));
    }
    stdOpts.libsOptions = stdconfig;
  }

  return stdOpts;
}

/**
 * 读取sandbuildrc.js配置,并且标准化
 * @param {*} path 配置所在路径
 */
function getSandBuildConfig(sandBuildPath) {
  // 动态读取sandbuildrc.js配置
  // eslint-disable-next-line
  return stdSandBuildOpts(getDefault(require(sandBuildPath)));
}

module.exports = {
  getSandBuildConfig,
};
