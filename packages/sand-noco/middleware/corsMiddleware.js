const cors = require('koa2-cors');
const { getCors } = require('../utils/cors');

/**
 * cors中间件
 * @param {*} opts cors配置
 */
function corsMiddleware(opts) {
  /**
   * 读取cors配置
   */
  const corsConfig = opts || getCors();
  return cors(corsConfig);
}

module.exports = corsMiddleware;
