const {
  getAssets,
  ENV_ENUM,
  getNowEnvConst,
} = require('../../common/utils/env');

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

module.exports = EntryController;
