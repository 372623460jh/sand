const { getPublicKey } = require('./cert');

/**
 * 环境枚举
 */
const ENV_ENUM = {
  development: {
    code: 'development',
  },
  test: {
    code: 'test',
  },
  pre: {
    code: 'pre',
  },
  production: {
    code: 'production',
  },
};

/**
 * 当前环境的常量
 */
const NOW_ENV_CONST = {
  // node环境
  NODE_ENV: 'development',
  // 端口
  PORT: 9539,
  // 公钥
  PUBLIC_KEY: '',
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
 * 初始化环境
 */
function initNowEnvConst() {
  // 从node环境中取出
  const { NODE_ENV = 'development', PORT = 9539 } = process.env;
  // 环境
  NOW_ENV_CONST.NODE_ENV = ENV_ENUM[NODE_ENV].code;
  // 端口
  NOW_ENV_CONST.PORT = PORT;
  // 公钥
  NOW_ENV_CONST.PUBLIC_KEY = getPublicKey();
  return NOW_ENV_CONST;
}

/**
 * 获取当前环境常量
 */
function getNowEnvConst() {
  return NOW_ENV_CONST;
}

/**
 * 获取引用资源文件hash值，只要服务不重启hash保持一致，用于拼接到资源文件后防止资源文件缓存。
 */
let hash = '';
function getHash() {
  if (hash) {
    return hash;
  }
  hash = Math.random().toString(36).slice(-8);
  return hash;
}

/**
 * 根据环境获取
 * @param {h} env 环境
 */
function getAssets() {
  /**
   * 加载前端资源后防止缓存
   */
  const fileHash = getHash();

  /**
   * 前端资源host
   */
  // 开发环境
  const feDevHost = 'http://127.0.0.1:9538/';
  // 生产环境
  const feProdHost = 'https://assets.zirupay.com/assets/rich-pc/0.0.1/';

  /**
   * 前端资源的配置，全环境
   */
  const assetsConfig = {
    [ENV_ENUM.production.code]: {
      // 全局css资源
      cssAssets: [
        `${feProdHost}common.css?${fileHash}`,
        `${feProdHost}vendors.css?${fileHash}`,
      ],
      // 全局js资源
      jsAssets: [
        `${feProdHost}common.js?${fileHash}`,
        `${feProdHost}vendors.js?${fileHash}`,
      ],
      // webpack publicPath
      publicPath: feProdHost,
      // 当前服务端环境
      serverEnv: ENV_ENUM.production.code,
    },
    [ENV_ENUM.development.code]: {
      cssAssets: [],
      jsAssets: [
        `${feDevHost}common.js?${fileHash}`,
        `${feDevHost}vendors.js?${fileHash}`,
      ],
      publicPath: feDevHost,
      serverEnv: ENV_ENUM.development.code,
    },
  };

  // 取出对应环境的配置
  return assetsConfig[NOW_ENV_CONST.NODE_ENV];
}

module.exports = {
  getNowEnvConst,
  initNowEnvConst,
  ENV_ENUM,
  authWhiteList,
  getAssets,
};
