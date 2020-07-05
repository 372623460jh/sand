const startApp = require('./config/webpack/script/dev');
const buildApp = require('./config/webpack/script/prod');
const buildLib = require('./config/rollup/script/build');
const { typeEnum } = require('./constant');
const { logError } = require('./utils');

/**
 * build指令回调
 * @param {*} options 指令入参
 */
async function build(options) {
  const {
    type = typeEnum.pc,
    sandbuildrcPath = '', // 指定sandbuildrc入口只有debug时会有此入参
  } = options;
  if (type === typeEnum.lib) {
    // lib
    buildLib(options);
  } else {
    // pc||demo||mob
    buildApp({
      type,
      env: 'production',
      sandbuildrcPath,
    });
  }
}

/**
 * start指令回调
 * @param {*} options 指令入参
 * type取值pc/mob/demo
 */
function start(options) {
  const {
    type = typeEnum.pc,
    sandbuildrcPath = '', // 指定sandbuildrc入口只有debug时会有此入参
  } = options;
  // start都是development
  const env = 'development';
  if (type === typeEnum.pc || type === typeEnum.demo || type === typeEnum.mob) {
    // pc||demo||mob时启动webpack服务
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
