const webpackDev = require('webpack-dev-middleware');

/**
 * 根据webpack-dev-middleware封装的koa2中间件
 * @param {*} compiler webpack构建产物
 * @param {*} opts
 */
const devMiddleware = (compiler, opts) => {
  const middleware = webpackDev(compiler, opts);
  return async (ctx, next) => {
    await middleware(
      ctx.req,
      {
        end: (content) => {
          ctx.body = content;
        },
        setHeader: (name, value) => {
          ctx.set(name, value);
        },
      },
      next
    );
  };
};

module.exports = devMiddleware;
