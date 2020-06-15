/**
 * 兜底的错误处理中间件，最先加载
 */
function errorHandlerMiddleware() {
  return async (ctx, next) => {
    // 获取日志实例
    const { defaultLogger, errorLogger } = ctx;

    try {
      await next();
    } catch (error) {
      /**
       * 兜底的日志输出
       */
      defaultLogger.debug(error);
      errorLogger.error(error);
    }
  };
}

module.exports = errorHandlerMiddleware;
