/* eslint-disable no-console */
const rollup = require('rollup');
const chalk = require('chalk');
const startApp = require('./config/webpack/script/dev');
const buildApp = require('./config/webpack/script/prod');
const factory = require('./config/rollup');
const { typeEnum } = require('./constant');
const {
  createSymbolicLink, logError, getDefault, getPath,
} = require('./utils');

/**
 * 处理rc文件生成可用的配置文件
 * @param {*} env 环境，prod还是dev
 */
function handleConfig(props) {
  const { env, sandbuildrcPath } = props;
  // 动态读取sandbuildrc.js配置
  const { configurations = [] } = getDefault(
    // eslint-disable-next-line
    require(sandbuildrcPath || getPath(process.cwd(), './.sandbuildrc.js')),
  );
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
 * 根据配置文件创建软链接
 * @param {*} packagesInfo 配置文件
 */
function createLink(packagesInfo) {
  console.log(chalk.yellow('======== sand-build 开始创建软链（link）========'));
  for (let index = 0; index < packagesInfo.length; index++) {
    const { pkg = {}, pathName = '', packagesPath } = packagesInfo[index];
    const { name = '' } = pkg;
    // node_modules下的根据包名创建的目录
    const nodeModulesPath = getPath(process.cwd(), `./node_modules/${name}`);
    // packages下的真实包名
    const realPath = getPath(packagesPath, `./${pathName}`);
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
  const {
    watch,
    link,
    type = typeEnum.pc,
    sandbuildrcPath = '', // 指定sandbuildrc入口只有debug时会有此入参
  } = options;
  if (type === typeEnum.lib) {
    // lib
    const { configs, packagesInfo } = handleConfig(options);
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
  } else {
    buildApp({
      type,
      env: 'production',
      sandbuildrcPath,
    });
  }
}

/**
 * 启动webpack服务回调
 * @param {*} options 指令入参
 * type取值pc/mob/demo
 */
function start(options) {
  const {
    type = typeEnum.pc,
    sandbuildrcPath = '', // 指定sandbuildrc入口只有debug时会有此入参
  } = options;
  // start都是dev
  const env = 'development';
  if (type === typeEnum.pc || type === typeEnum.demo) {
    // pc或者demo时启动webpack服务
    startApp({
      type,
      env,
      sandbuildrcPath,
    });
  } else {
    logError(`暂不支持${type}类型的start`);
  }
}

module.exports = {
  build,
  start,
};
