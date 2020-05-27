const { ENV_ENUM, getHash } = require('./env');

/**
 * 服务配置
 */
const serverConfig = {
  port: 9539, // 服务启动端口
};

/**
 * 根据环境获取
 * @param {h} env 环境
 */
const getAssets = (env) => {
  const hash = getHash();
  const host = 'http://127.0.0.1:9538/';
  const assetsConfig = {
    [ENV_ENUM.PROD]: {
      cssAssets: [`${host}common.css?${hash}`, `${host}vendors.css?${hash}`],
      jsAssets: [`${host}common.js?${hash}`, `${host}vendors.js?${hash}`],
      publicPath: host,
    },
    [ENV_ENUM.DEV]: {
      cssAssets: [],
      jsAssets: [`${host}common.js?${hash}`, `${host}vendors.js?${hash}`],
      publicPath: host,
    },
  };
  return assetsConfig[env];
};

module.exports = {
  serverConfig,
  getAssets,
};
