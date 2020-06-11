const { getAssets, ENV_ENUM, getNowEnvConst } = require('../common/utils/env');

// routerPrefix
const routerPrefix = '/spa';

class EntryController {
  /**
   * 入口页面控制器
   */
  async entryIndex(ctx) {
    // 根据环境 获取css和js的资源
    const {
      cssAssets = [],
      jsAssets = [],
      publicPath = '',
      serverEnv = ENV_ENUM.production.code,
    } = getAssets();
    // 渲染模板（./views/index.html）
    await ctx.render('index', {
      cssAssets,
      jsAssets,
      publicPath,
      serverEnv,
      // 公钥
      publicKey: getNowEnvConst().PUBLIC_KEY,
    });
  }
}

const entryController = new EntryController();

module.exports = [
  {
    method: 'GET',
    route: '/',
    controller: entryController.entryIndex,
  },
  {
    method: 'GET',
    route: new RegExp(`^${routerPrefix}(?:/|$)`),
    controller: entryController.entryIndex,
  },
];
