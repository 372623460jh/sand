/* eslint-disable no-console */
const rollup = require('rollup');
const chalk = require('chalk');
const path = require('path');
const startApp = require('./config/webpack/script/dev');
const factory = require('./config/rollup');
const { createSymbolicLink, logError, getDefault } = require('./utils');

/**
 * 处理rc文件生成可用的配置文件
 * @param {*} env 环境，prod还是dev
 */
function handleConfig(env) {
  // 动态读取sandbuildrc.js配置
  // eslint-disable-next-line
  const { configurations = [] } = getDefault(require(path.resolve(process.cwd(), './.sandbuildrc.js')));
  let configs = [];
  configurations.forEach((config) => {
    // 调用factory生成rollup打包配置
    configs = configs.concat([...factory(config, env)]);
  });
  return {
    configs,
    packagesInfo: configurations,
  };
}

/**
 * 构建单个配置
 * @param {*} config 单个配置
 */
async function buildEntry(config) {
  const { output } = config;
  const bundle = await rollup.rollup(config);
  await bundle.generate(output);
  await bundle.write(output);
  console.log(chalk.green(`${chalk.yellow('[BUILD]')} -> ${output.file}`));
}

/**
 * 构建所有配置
 * @param {*} allConfig 全部配置数组
 */
function buildAll(allConfig) {
  let built = 0;
  // 配置项长度
  const total = allConfig.length;
  // 返回Promise用做同步
  return new Promise((resolve, reject) => {
    const next = () => {
      // 构建单个配置
      buildEntry(allConfig[built]).then(() => {
        built++;
        if (built < total) {
          next();
        } else {
          // 构建结束
          resolve();
        }
      }).catch((e) => {
        reject(e);
      });
    };
    next();
  });
}

/**
 * 构建监听模式
 * @param {*} configs rollup配置
 */
function watching(configs) {
  console.log(chalk.yellow('======== sand-build 开始构建（watch）========'));
  // 开启监听
  const watcher = rollup.watch(configs);
  watcher.on('event', (event) => {
    /**
     * event.code 会是下面其中一个：
     *  START        — 监听器正在启动（重启）
     *  BUNDLE_START — 构建单个文件束
     *  BUNDLE_END   — 完成文件束构建
     *  END          — 完成所有文件束构建
     *  ERROR        — 构建时遇到错误
     *  FATAL        — 遇到无可修复的错误
     */
    const { code, output, error } = event;
    if (code === 'BUNDLE_END') {
      // 构建完成
      console.log(chalk.green(`${chalk.yellow('[WATCHING]')} -> ${output[0]}`));
    }
    if (code === 'ERROR') {
      // 构建时遇到错误
      logError(error);
    }
    if (code === 'FATAL') {
      // 构建时遇到无可修复的错误，关闭构建
      logError(error);
      // 停止监听
      watcher.close();
    }
  });
}

/**
 * 获取绝对路径
 * @param {*} p
 */
function pathResolve(p) {
  return path.resolve(process.cwd(), p);
}

/**
 * 根据配置文件创建软链接
 * @param {*} packagesInfo 配置文件
 */
function createLink(packagesInfo) {
  console.log(chalk.yellow('======== sand-build 开始创建软链（link）========'));
  for (let index = 0; index < packagesInfo.length; index++) {
    const { pkg = {}, pathName = '' } = packagesInfo[index];
    const { name = '' } = pkg;
    // node_modules下的根据包名创建的目录
    const nodeModulesPath = pathResolve(`./node_modules/${name}`);
    // packages下的真实包名
    const realPath = pathResolve(`./packages/${pathName}`);
    // 创建软链接
    if (createSymbolicLink(nodeModulesPath, realPath)) {
      // 软连创建成功
      console.log(chalk.green(`${chalk.yellow('[LINK]')} 创建软链接 ${nodeModulesPath} -> ${realPath}`));
    }
  }
  console.log(chalk.yellow('======== sand-build 软链创建完成（link）========'));
}

/**
 * 启动rollup指令回调
 * @param {*} options 指令入参
 */
async function build(options) {
  const { watch, link, env = 'dev' } = options;
  const { configs, packagesInfo } = handleConfig(env);
  if (link) {
    // 需要在.sandbuildrc.js所在目录中的node_modules下创建软链，
    // 链接到packages中的对应包，方便调试packages中的应用
    createLink(packagesInfo);
  }
  if (watch) {
    watching(configs);
  } else {
    try {
      console.log(chalk.yellow('======== sand-build 开始构建（build）========'));
      /**
         * 构建所有配置
         */
      await buildAll(configs);
      console.log(chalk.yellow('======== sand-build 构建结束（build）========'));
    } catch (error) {
      logError(error);
    }
  }
}

/**
 * 启动webpack服务回调
 * @param {*} options 指令入参
 */
function start(options) {
  const { env = 'dev' } = options;
  // 启动webpack服务
  startApp(env);
}

module.exports = {
  build,
  start,
};
