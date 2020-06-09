const redis = require('../db/redis');
const { errorLog } = require('../common/utils/log');
const errorCode = require('../common/error');
const {
  sessionTTL,
  getSessionId,
  SESSION_ID,
  getCookieConfig,
} = require('../common/config/sessionConf');

class LoginController {
  /**
   * 登录
   */
  async login(ctx) {
    // 从ctx.sandSession取出userInfo sessionId
    const { sessionId, userInfo } = ctx.sandSession;

    if (sessionId && userInfo) {
      // 已登录直接返回
      ctx.response.body = {
        stat: 'ok',
        result: '已登录',
      };
    } else {
      // 取出账号，密码
      const { accountName = '', password = '' } = ctx.request.body;

      // TODO: 查询数据库

      if (accountName === 'jianghe' && password === '112233') {
        // 账号密码正确
        // 生成加密sessionId
        const { sessionId: realSessionId, signSessionId } = getSessionId(
          'sand:'
        );

        // session信息，从数据库中查出
        const sessionInfo = {
          // uid
          uid: 'u0001',
          // 账号
          accountName,
          // 手机
          mobilePhone: '13095308808',
          // 用户名
          userName: 'jianghe',
        };

        // 写入到redis
        const success = await redis.set(
          realSessionId,
          JSON.stringify(sessionInfo)
        );

        if (success === 'OK') {
          // 设置session的超时时间 ms
          const setOk = await redis.pexpire(realSessionId, sessionTTL);

          if (setOk === 1) {
            // 将sessionId设置到cookie中
            ctx.cookies.set(SESSION_ID, signSessionId, getCookieConfig());

            ctx.response.body = {
              stat: 'ok',
              result: '登录成功',
            };
          } else {
            const { code, desc } = errorCode.L0002;
            errorLog.error(`${code}: ${desc}`);
            ctx.response.body = {
              stat: 'faild',
              errorCode: code,
              errorMsg: '系统出错请稍后重试',
            };
          }
        } else {
          const { code, desc } = errorCode.L0003;
          errorLog.error(`${code}: ${desc}`);
          ctx.response.body = {
            stat: 'faild',
            errorCode: code,
            errorMsg: '系统出错请稍后重试',
          };
        }
      } else {
        const { code, desc } = errorCode.L0004;
        errorLog.info(`${code}: ${desc}`);
        ctx.response.body = {
          stat: 'faild',
          errorCode: code,
          errorMsg: '账号密码有误',
        };
      }
    }
  }

  /**
   * 登录测试
   */
  async test(ctx) {
    // 从ctx.sandSession取出userInfo
    const { userInfo } = ctx.sandSession;

    ctx.response.body = {
      stat: 'ok',
      result: {
        userInfo,
      },
    };
  }

  /**
   * 登出
   */
  async logout(ctx) {
    // 从ctx.session取出userInfo
    const { sessionId } = ctx.sandSession;

    if (sessionId) {
      // 上下文中有sessionId 删除redis中的session
      const isOk = await redis.del(sessionId);

      if (isOk === 1) {
        // 将cookie设置为无效
        ctx.cookies.set(SESSION_ID, '', { ...getCookieConfig(), maxAge: 0 });

        // 返回
        ctx.response.body = {
          stat: 'ok',
          result: '登出成功',
        };
      } else {
        // 删除redis中session异常
        const { code, desc } = errorCode.L0008;
        errorLog.error(`${code}: ${desc}`);
        ctx.response.body = {
          stat: 'faild',
          errorCode: code,
          errorMsg: '登出失败',
        };
      }
    } else {
      // 上下文中没有sessionId，无法检测登录状态
      const { code, desc } = errorCode.L0009;
      errorLog.error(`${code}: ${desc}`);
      ctx.response.body = {
        stat: 'faild',
        errorCode: code,
        errorMsg: '登出失败',
      };
    }
  }
}

const loginController = new LoginController();

module.exports = [
  {
    method: 'POST',
    route: '/login.json',
    controller: loginController.login,
  },
  {
    method: 'POST',
    route: '/test.json',
    controller: loginController.test,
  },
  {
    method: 'POST',
    route: '/logout.json',
    controller: loginController.logout,
  },
];
