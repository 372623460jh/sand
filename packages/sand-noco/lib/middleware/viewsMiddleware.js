const views = require('koa-views');
const path = require('path');

/**
 * 模版引擎中间件
 * @param {*} viewsPath 模板根目录
 */
function viewsMiddleware(viewsPath = '') {
  /**
   * 模板的位置
   */
  const baseViewsPath = viewsPath || path.resolve(process.cwd(), './app/views');

  return views(
    baseViewsPath, // 设置视图根目录
    {
      map: {
        html: 'ejs', // 模板为ejs
      },
    }
  );
}

module.exports = viewsMiddleware;
