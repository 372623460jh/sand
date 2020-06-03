const { commonLog, defaultLog, errorLog } = require('../common/utils/log');

/**
 * controller 日志信息输出中间件
 */
function ctrLogMiddleware() {
  return async (ctx, next) => {
    const { path: originPath, method } = ctx;
    let data = {};
    if (method === 'GET') {
      data = ctx.request.query;
    } else if (method === 'POST') {
      data = ctx.request.body;
    } else {
      errorLog.error(`请求方式不合法，仅支持GET/POST方法 path=${originPath} || method=${method} || data=${JSON.stringify(data)}`);
      // TODO: 返回通用报错
    }
    // 日志记录
    commonLog.info(`path=${originPath} || method=${method} || data=${JSON.stringify(data)}`);
    // 控制台输出
    defaultLog.debug(`path=${originPath} || method=${method} || data=${JSON.stringify(data)}`);
    await next();
  };
}

module.exports = ctrLogMiddleware;
