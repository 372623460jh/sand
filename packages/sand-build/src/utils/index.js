/* eslint-disable no-console */
const fs = require('fs');
const chalk = require('chalk');
const path = require('path');
const childProcess = require('child_process');
const { DEFAULT_PORT, moduleTypeEnum, buildTypeEnum } = require('../constant');

/**
 * 错误处理
 * @param {*} e
 */
function logError(e) {
  console.log(chalk.red(e));
}

/**
 * 获取require的default
 * @param {*} obj
 */
function getDefault(obj) {
  return obj.default || obj;
}

/**
 * 递归创建目录 同步方法
 * @param {*} dirname 目录
 */
// eslint-disable-next-line consistent-return
function mkdirsSync(dirname) {
  if (fs.existsSync(dirname)) {
    // 文件以及存在
    return true;
  }
  // 创建上一级目录
  if (mkdirsSync(path.dirname(dirname))) {
    // 上一级存在创建下一级目录
    fs.mkdirSync(dirname);
    return true;
  }
}

/**
 * 创建软链接 linkPath -> sourcePath
 * @param {*} linkPath 软链接起始位置
 * @param {*} sourcePath 被指向的路径
 */
function createSymbolicLink(linkPath, sourcePath) {
  // 校验sourcePath是否存在
  if (!fs.existsSync(sourcePath)) {
    // 不存在
    logError(`软链接目标路径${sourcePath}不存在`);
    return false;
  }

  // 软链接起始已经存在，先删除
  if (fs.existsSync(linkPath)) {
    console.log(
      chalk.green(`${chalk.yellow('[LINK]')} 删除原始软链接 ${linkPath}`)
    );
    fs.unlinkSync(linkPath);
  }

  // 生成起始位置文件的上一级文件夹
  if (mkdirsSync(path.dirname(linkPath))) {
    // 创建软链接
    if (process.platform === 'win32') {
      // windows环境
      childProcess.execSync(`mklink ${linkPath} ${sourcePath}`, {
        cwd: process.cwd(),
      });
    } else if (process.platform === 'darwin' || process.platform === 'linux') {
      // linux或mac os
      childProcess.execSync(`ln -s ${sourcePath} ${linkPath}`, {
        cwd: process.cwd(),
      });
    } else {
      logError(`${process.platform}该操作系统不支持创建软链接`);
      return false;
    }
    return true;
  }

  logError(`文件创建失败: ${path.dirname(linkPath)}`);
  return false;
}

/**
 * 获取绝对路径
 * @param {*} p
 */
function getPath(absPath, p) {
  return path.resolve(absPath, p);
}

/**
 * 获取支持的浏览器列表，用于autoprefixer来自动增加前缀
 * @param {*} isProd 是否生产环境
 */
function getBrowsersList(isProd) {
  return {
    overrideBrowserslist: isProd
      ? ['last 2 versions', 'ios >= 9', 'android >= 4']
      : [
          'last 2 Chrome versions', // 开发环境，默认只支持Chrome最新的2个版本
        ],
  };
}

/**
 * webpackOptions标准化
 * @param {*} options
 */
function stdWebpackOptions(options) {
  const {
    entryHtml = '', // 入口html（必填）
    entry = '', // 入口文件（必填）
    basePath = process.cwd(), // 项目跟目录（非必填，默认process.cwd()）
    babelConfig = undefined, // bable配置用于替换内置babel配置（非必填，默认：内置babel配置）
    otherRules = [], // webpack要扩展的其他rules（非必填，默认：[]）
    alias = {}, // 别名,非必填
    historyApiOpts = {}, // history中间件选项，决定哪些请求需要重定向到index.html,解决history路由找不到页面的情况
    outputPath = '', // 输出路径 为空的话指向process.cwd()/dist
    copyPlugin = [], // 拷贝插件
    // 构建时设置publicPath
    publicPath = {
      devPath: '/',
      prodPath: '/',
    },
    tsShouldBabel = false, // ts是否需要过babel。web项目需要过babel，node项目不需要。如果需要过babel，ts的编译产物必须是es规范。
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
  }
  return {
    entryHtml,
    entry,
    basePath,
    babelConfig,
    otherRules,
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
 * configurations rollup标准化
 * @param {*} option
 */
function stdRollupConfig(option) {
  const {
    buildType = buildTypeEnum.rollup, // 构建方式（rollup，babel）
    entry = '', // 入口文件，绝对路径
    pkgPath = '', // 包的目录
    bundleName = '', // 构建出来的文件名, 必填
    isTs,
    cssExtract,
    alias = [],
    umdGlobals = {},
    namedExports = {},
    moduleType = [moduleTypeEnum.cjs, moduleTypeEnum.esm, moduleTypeEnum.umd], // 打哪些规范的包
    babelConfig = undefined, // babel扩展
    replaceConfig = {}, // 替换配置replace的漏出
    nodeVersion = '6', // cjs模式可以指定node版本 默认6。其他模式下不生效
  } = option;
  if (!entry || !pkgPath || !bundleName) {
    logError(
      'rollup模式configurations[].entry和configurations[].pkgPath和configurations[].bundleName为必填项'
    );
    return {};
  }
  // 读取package.json
  // eslint-disable-next-line
  const pkgJson = require(getPath(pkgPath, './package.json'));
  return {
    buildType,
    entry,
    pkgPath,
    bundleName,
    pkg: pkgJson,
    isTs: !!isTs,
    cssExtract: !!cssExtract,
    alias,
    umdGlobals,
    namedExports,
    babelConfig, // babel扩展
    moduleType,
    replaceConfig,
    nodeVersion,
  };
}

/**
 * configurations babel标准化
 * @param {*} options
 */
function stdBabelConfig(option) {
  const {
    pkgPath = '', // 包的目录
    buildType = buildTypeEnum.babel, // 构建方式（rollup，babel）
    isTs, // 是否是ts,默认false
    moduleType = [moduleTypeEnum.cjs, moduleTypeEnum.esm], // 打哪些规范的包
    babelConfig = undefined, // babel扩展
    nodeVersion = '6', // cjs模式可以指定node版本 默认6。其他模式下不生效
  } = option;
  if (!pkgPath) {
    logError('babel模式configurations[].pkgPath为必填项');
    return {};
  }
  // 读取package.json
  // eslint-disable-next-line
  const pkgJson = require(getPath(pkgPath, './package.json'));
  return {
    pkgPath,
    buildType,
    pkg: pkgJson,
    isTs: !!isTs,
    moduleType,
    babelConfig,
    nodeVersion,
  };
}

/**
 * 标准化SandBuild配置
 * @param {*} options
 */
function stdSandBuildOpts(options) {
  // 标准化后的配置
  const stdOpts = {};
  const { port, webpackOptions, configurations } = options;
  // 标准化端口
  stdOpts.port = port || DEFAULT_PORT;
  if (webpackOptions) {
    stdOpts.webpackOptions = stdWebpackOptions(webpackOptions);
  }
  if (
    configurations &&
    Array.isArray(configurations) &&
    configurations.length > 0
  ) {
    const stdconfig = [];
    for (let n = 0; n < configurations.length; n++) {
      const option = configurations[n];
      const { buildType = buildTypeEnum.rollup } = option;
      if (buildType === buildTypeEnum.rollup) {
        // rollup构建方式
        stdconfig.push(stdRollupConfig(option));
      } else if (buildType === buildTypeEnum.babel) {
        // babel构建方式
        stdconfig.push(stdBabelConfig(option));
      }
    }
    stdOpts.configurations = stdconfig;
  }
  return stdOpts;
}

/**
 * 读取sandbuildrc.js配置
 * @param {*} path 配置所在路径
 */
function getSandBuildConfig(SandBuildPath) {
  // 动态读取sandbuildrc.js配置
  // eslint-disable-next-line
  return stdSandBuildOpts(getDefault(require(SandBuildPath)));
}

/**
 * 获取当前配置中cjs，esm，umd的支持情况
 * @param {*} moduleType 支持的模块类型数组
 */
function getModuleTypeEnable(moduleType = []) {
  if (!Array.isArray(moduleType)) {
    logError('moduleType非数组');
    return {
      cjsEnable: false,
      esmEnable: false,
      umdEnable: false,
    };
  }

  const cjsEnable = !!(moduleType.indexOf(moduleTypeEnum.cjs) >= 0);
  const esmEnable = !!(moduleType.indexOf(moduleTypeEnum.esm) >= 0);
  const umdEnable = !!(moduleType.indexOf(moduleTypeEnum.umd) >= 0);

  return {
    cjsEnable,
    esmEnable,
    umdEnable,
  };
}

/**
 * 同步删除文件夹
 * @param {*} path
 */
function delDirSync(filePath) {
  let files = [];
  if (fs.existsSync(filePath)) {
    files = fs.readdirSync(filePath);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    files.forEach((file, index) => {
      const curPath = `${filePath}/${file}`;
      if (fs.statSync(curPath).isDirectory()) {
        delDirSync(curPath); // 递归删除文件夹
      } else {
        fs.unlinkSync(curPath); // 删除文件
      }
    });
    fs.rmdirSync(filePath);
  }
}

module.exports = {
  mkdirsSync,
  createSymbolicLink,
  getPath,
  getDefault,
  logError,
  getBrowsersList,
  getSandBuildConfig,
  getModuleTypeEnable,
  delDirSync,
};
