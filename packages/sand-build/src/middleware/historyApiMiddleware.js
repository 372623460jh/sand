/**
 * koa2的一个中间件,用于处理使用history模式返回index.html
 * 原程序是bripkens作者的connect-history-api-fallback,这里只是修改兼容Koa2而已
 */
const url = require('url');

function evaluateRewriteRule(parsedUrl, match, rule) {
  if (typeof rule === 'string') {
    return rule;
  }
  if (typeof rule !== 'function') {
    throw new Error('Rewrite rule can only be of type string of function.');
  }
  return rule({
    parsedUrl,
    match,
  });
}

function acceptsHtml(header, options) {
  options.htmlAcceptHeaders = options.htmlAcceptHeaders || ['text/html', '*/*'];
  for (let i = 0; i < options.htmlAcceptHeaders.length; i++) {
    if (header.indexOf(options.htmlAcceptHeaders[i]) !== -1) {
      return true;
    }
  }
  return false;
}

function getLogger(options) {
  if (options && options.logger) {
    return options.logger;
  }
  if (options && options.verbose) {
    // eslint-disable-next-line no-console
    return console.log.bind(console);
  }
  // eslint-disable-next-line no-new-func
  return Function();
}

function historyApiFallback(options) {
  const logger = getLogger(options);

  // eslint-disable-next-line consistent-return
  return async (ctx, next) => {
    if (ctx.method !== 'GET') {
      logger(
        'Not rewriting',
        ctx.method,
        ctx.url,
        'because the method is not GET.'
      );
      return next();
    }
    if (!ctx.header || typeof ctx.header.accept !== 'string') {
      logger(
        'Not rewriting',
        ctx.method,
        ctx.url,
        'because the client did not send an HTTP accept header.'
      );
      return next();
    }
    if (ctx.header.accept.indexOf('application/json') === 0) {
      logger(
        'Not rewriting',
        ctx.method,
        ctx.url,
        'because the client prefers JSON.'
      );
      return next();
    }
    if (!acceptsHtml(ctx.header.accept, options)) {
      logger(
        'Not rewriting',
        ctx.method,
        ctx.url,
        'because the client does not accept HTML.'
      );
      return next();
    }

    // 白名单，只有命中白名单里的请求才重定向到index.html
    if (options.whiteList) {
      // 是否命中白名单
      let isFlag = false;
      options.whiteList.forEach((item) => {
        if (!isFlag) {
          isFlag = new RegExp(item).test(ctx.url);
        }
      });
      if (!isFlag) {
        // 都没命中，该请求不重定向
        return next();
      }
    }

    // 黑名单，只有命中黑名单里的请求才不重定向到index.html
    if (options.blackList) {
      let isFlag = false;
      options.blackList.forEach((item) => {
        if (!isFlag) {
          isFlag = new RegExp(item).test(ctx.url);
        }
      });
      if (isFlag) {
        // 命中，该请求不重定向
        return next();
      }
    }

    const parsedUrl = url.parse(ctx.url);
    let rewriteTarget;
    options.rewrites = options.rewrites || [];

    for (let i = 0; i < options.rewrites.length; i++) {
      const rewrite = options.rewrites[i];
      const match = parsedUrl.pathname.match(rewrite.from);

      if (match !== null) {
        rewriteTarget = evaluateRewriteRule(parsedUrl, match, rewrite.to);
        logger('Rewriting', ctx.method, ctx.url, 'to', rewriteTarget);
        ctx.url = rewriteTarget;
        return next();
      }
    }

    if (
      parsedUrl.pathname.indexOf('.') !== -1 &&
      options.disableDotRule !== true
    ) {
      logger(
        'Not rewriting',
        ctx.method,
        ctx.url,
        'because the path includes a dot (.) character.'
      );
      return next();
    }
    rewriteTarget = options.index || '/index.html';
    logger('Rewriting', ctx.method, ctx.url, 'to', rewriteTarget);
    ctx.url = rewriteTarget;
    await next();
  };
}

module.exports = historyApiFallback;
