const webpackHot = require('webpack-hot-middleware');
const { PassThrough } = require('stream');

/**
 * 根据webpack-hot-middleware封装的koa2 中间件
 * @param {*} compiler  webpack构建产物
 * @param {*} opts
 */
const hotMiddleware = (compiler, opts) => {
  const middleware = webpackHot(compiler, opts);
  return async (ctx, next) => {
    const stream = new PassThrough();
    ctx.body = stream;
    await middleware(
      ctx.req,
      {
        write: stream.write.bind(stream),
        writeHead: (status, headers) => {
          ctx.status = status;
          ctx.set(headers);
        },
        end: () => {},
      },
      next
    );
  };
};

module.exports = hotMiddleware;
