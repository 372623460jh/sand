const path = require('path');
const fs = require('fs');
const getKoaInstance = require('../utils/koaInstance');
const { getError } = require('../error');

/**
 * 兜底的错误处理中间件，最先加载
 * @param {*} controllerPath 控制器所在文件夹
 */
function controllerMiddleware(controllerPath = '') {
  /**
   * ctr所在的根目录
   */
  const baseControllerPath =
    controllerPath || path.resolve(process.cwd(), './app/controller');

  /**
   * 循环遍历根目录下的所有控制器，单例
   */
  const files = fs.readdirSync(baseControllerPath);

  /**
   * 过滤出controllers下的所有*.js文件
   */
  const jsFiles = files.filter((f) => f.endsWith('.js'));

  /**
   * 控制器集合
   */
  const ctrMap = {};

  /**
   * 循环实例化每一个控制器
   */
  // eslint-disable-next-line
  for (const file of jsFiles) {
    // eslint-disable-next-line no-console
    console.log(`加载 ${baseControllerPath}/${file} controller...`);
    // 读取controller数组
    // eslint-disable-next-line
    const Controller = require(`${baseControllerPath}/${file}`);
    ctrMap[file.replace(/\.js$/, '')] = new Controller();
  }

  /**
   * 获取koa实例
   */
  const app = getKoaInstance();

  /**
   * 将控制器实例挂载到koa实例上
   */
  app.controller = ctrMap;

  /**
   * 中间件处理每一个请求的日志输出
   */
  return async (ctx, next) => {
    const {
      path: originPath,
      method,
      defaultLogger,
      errorLogger,
      commonLogger,
    } = ctx;

    let data = {};

    if (method === 'GET') {
      data = ctx.request.query;
    } else if (method === 'POST') {
      data = ctx.request.body;
    } else {
      const error = getError(
        'NOCO0001',
        `path=${originPath} || method=${method} || data=${JSON.stringify(data)}`
      );
      // 控制台输出
      defaultLogger.debug(error);
      // 错误文件输出
      errorLogger.error(error);
    }
    // 日志记录
    commonLogger.info(
      `path=${originPath} || method=${method} || data=${JSON.stringify(data)}`
    );
    // 控制台输出
    defaultLogger.debug(
      `path=${originPath} || method=${method} || data=${JSON.stringify(data)}`
    );

    await next();
  };
}

module.exports = controllerMiddleware;
