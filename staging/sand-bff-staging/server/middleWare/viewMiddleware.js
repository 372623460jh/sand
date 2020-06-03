const views = require('koa-views');
const path = require('path');

/**
 * 模版引擎中间件
 */
function viewMiddleware() {
  return views(
    path.resolve(__dirname, '../views'), // 设置视图根目录
    {
      map: {
        html: 'ejs', // 模板为ejs
      },
    },
  );
}

module.exports = viewMiddleware;
