/**
 * 环境枚举
 */
const ENV_ENUM = {
  DEV: {
    code: 'DEV',
  },
  TEST: {
    code: 'TEST',
  },
  PRE: {
    code: 'PRE',
  },
  PROD: {
    code: 'PROD',
  },
};

/**
 * 登录中间件白名单配置
 */
const authWhiteList = {
  // 不需要登录的白名单
  unLoginWhiteList: ['^/favicon.ico$', '^/spa(?:/|$)', '^/$'],
  // 登录接口白名单
  loginWhiteList: ['^/login.json$'],
};

/**
 * 获取hash值，只要服务不重启hash保持一致，用于拼接到资源文件后防止资源文件缓存。
 */
let hash = '';
const getHash = () => {
  if (hash) {
    return hash;
  }
  hash = Math.random().toString(36).slice(-8);
  return hash;
};

module.exports = {
  ENV_ENUM,
  getHash,
  authWhiteList,
};
