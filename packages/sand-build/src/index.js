const startApp = require('./webpack/script/dev');
const buildApp = require('./webpack/script/prod');
const buildLib = require('./common/libBuild');
const { typeEnum } = require('./constant');
const { logError } = require('./utils');

/**
 * build指令回调
 * @param {*} options 指令入参
 */
async function build(options) {
  const {
    type = typeEnum.webpack,
    // 指定sandbuildrc入口只有debug时会有此入参
    sandbuildrcPath = '',
  } = options;
  if (type === typeEnum.lib) {
    // lib
    buildLib(options);
  } else {
    // webpack||demo
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
    type = typeEnum.webpack,
    // 指定sandbuildrc入口只有debug时会有此入参
    sandbuildrcPath = '',
  } = options;
  if (type === typeEnum.webpack || type === typeEnum.demo) {
    // pc||demo||mob时启动webpack服务
    startApp({
      type,
      env: 'development',
      sandbuildrcPath,
    });
  } else if (type === typeEnum.lib) {
    // 调lib时，先执行build lib watch 再执行 s.tart example
    build({
      ...options,
      // 构建完成后执行start
      buildFinishCallback: () => {
        startApp({
          type,
          env: 'development',
          sandbuildrcPath,
        });
      },
    });
  } else {
    logError(`暂不支持${type}类型的start`);
  }
}

module.exports = {
  build,
  start,
};
