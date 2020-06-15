const getLogger = require('../utils/logger');

/**
 * 日志中间件
 * @param {*} logPath 日志输出根路径
 */
function loggerMiddleware(logPath = '') {
  // 获取日志实例
  const { errorLog, commonLog, defaultLog } = getLogger(logPath);
  return async (ctx, next) => {
    /**
     * 挂载通用日志
     */
    ctx.commonLogger = (() => {
      return commonLog;
    })();

    /**
     * 挂载报错日志
     */
    ctx.errorLogger = (() => {
      return errorLog;
    })();

    /**
     * 默认日志
     */
    ctx.defaultLogger = (() => {
      return defaultLog;
    })();

    await next();
  };
}

module.exports = loggerMiddleware;
