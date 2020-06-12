const {
  SESSION_ID,
  unsign,
  sessionTTL,
  getCookieConfig,
} = require('../../common/config/sessionConf');
const errorCode = require('../../common/error');
const { errorLog } = require('../../common/utils/log');
/**
 * redis实例
 */
const redis = require('../db/redis');

/**
 * 是否在白名单中
 * @param {*} whiteList 白名单
 * @param {*} urlPath url
 */
const isInWhiteList = (whiteList, urlPath) => {
  // 是否在不需要校验接口的白名单中
  let inWhiteList = false;
  for (let index = 0; index < whiteList.length; index++) {
    inWhiteList = new RegExp(whiteList[index]).test(urlPath);
    if (inWhiteList) {
      break;
    }
  }
  return inWhiteList;
};

/**
 * 登录模块中间件
 */
function authMiddleware(opts) {
  const {
    // 不需要校验登录的接口
    unLoginWhiteList = [],
    // 登录接口白名单
    loginWhiteList = [],
  } = opts;

  return async (ctx, next) => {
    // 错误信息
    let errorInfo = {
      errorCode: '',
      errorMsg: '',
    };

    if (isInWhiteList(unLoginWhiteList, ctx.path)) {
      // 在页面白名单中不需要校验登录

      // 直接执行后续中间件
      await next();
    } else {
      // 读取cookie中的sessionId
      const cookieSessionId = ctx.cookies.get(SESSION_ID);

      if (cookieSessionId) {
        // 校验cookie中的sessionId是否合法，有没有被篡改
        const sessionId = unsign(cookieSessionId);

        if (sessionId) {
          // sessionId合法

          // 从redis中取出对应session
          const value = await redis.get(sessionId);

          if (value) {
            // 有session值

            // 更新session的超时时间 ms
            const setOk = await redis.pexpire(sessionId, sessionTTL);

            if (setOk === 1) {
              // 更新有效期成功

              // 将sessionId设置到cookie中
              ctx.cookies.set(SESSION_ID, cookieSessionId, getCookieConfig());

              // 将用户信息写入ctx.sandSession sand项目session上下文
              ctx.sandSession = {
                sessionId,
                userInfo: JSON.parse(value),
              };

              // 执行后续中间件
              await next();
            } else {
              errorInfo = {
                errorCode: 'L0002',
                errorMsg: '系统出错请稍后重试',
              };
            }
          } else {
            errorInfo = {
              errorCode: 'L0007',
              errorMsg: '未登录，请先登录',
            };
          }
        } else {
          errorInfo = {
            errorCode: 'L0006',
            errorMsg: '未登录，请先登录',
          };
        }
      } else {
        errorInfo = {
          errorCode: 'L0005',
          errorMsg: '未登录，请先登录',
        };
      }

      /**
       * 错误统一处理
       */
      const { errorCode: eCode, errorMsg } = errorInfo;
      if (eCode) {
        // 有错误
        if (isInWhiteList(loginWhiteList, ctx.path)) {
          // 是登录接口
          // 设置sandSession为空
          ctx.sandSession = {};
          // 继续执行登录控制器
          await next();
        } else {
          const { code, desc } = errorCode[eCode];
          errorLog.info(`${code}: ${desc}`);
          ctx.response.body = {
            stat: 'faild',
            errorCode: code,
            errorMsg,
          };
        }
      }
    }
  };
}

module.exports = authMiddleware;
