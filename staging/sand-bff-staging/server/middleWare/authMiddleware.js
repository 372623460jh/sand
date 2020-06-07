/**
 * session配置
 */
const { sessionConfig, sessionKey } = require('../common/config/sessionConf');
/**
 * koaSession中间件
 */
const koaSession = require('koa-session');

/**
 * 登录模块中间件
 */
function authMiddleware(app) {
  // 设置加密key
  app.keys = sessionKey;
  // 根据配置生成中间件
  const session = koaSession(sessionConfig, app);
  // 使用session中间件
  app.use(session);
  // 处理登录模块
  return async (ctx, next) => {
    const databaseUserName = 'jianghe';
    const databaseUserPasswd = '123123';

    if (
      ctx.path === '/' ||
      ctx.path === '/spa' ||
      ctx.path === '/favicon.ico'
    ) {
      // 不需要登录验证
      await next();
    } else {
      if (!ctx.session.userInfo) {
        // 没有userInfo信息，设置userInfo属性为false
        ctx.session.userInfo = false;

        let query = ctx.request.query;

        // 判断用户名密码是否为空
        if (query.nickname && query.passwd) {
          // 比对并分情况返回结果
          if (databaseUserName === query.nickname) {
            // 如果存在该用户名
            if (databaseUserPasswd === query.passwd) {
              // 账号密码正确
              ctx.session.userInfo = {
                userId: '112233445',
                accountName: 'jianghe01',
                userName: 'jianghe.jh',
                phoneNumber: '13095308808',
              };
              await next();
            } else {
              ctx.response.body = {
                stat: 'faild',
                resule: '登录失败',
              };
            }
          } else {
            ctx.response.body = {
              stat: 'faild',
              resule: '登录失败',
            };
          }
        } else {
          ctx.response.body = {
            stat: 'faild',
            resule: '登录失败',
          };
        }
      } else {
        // 如果session中有用户信息则视为已登录，执行后续的中间件
        await next();
      }
    }
  };
}

module.exports = authMiddleware;
