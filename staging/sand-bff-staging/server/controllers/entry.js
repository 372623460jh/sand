/* eslint-disable class-methods-use-this */
const { getAssets } = require('../common/config/serverConf');
const { ENV_ENUM } = require('../common/config/env');

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
    } = getAssets(ENV_ENUM.PROD);
    // 渲染模板（./views/index.html）
    await ctx.render('index', {
      cssAssets,
      jsAssets,
      publicPath,
    });
  }

  /**
   * 登录控制器
   */
  async login(ctx) {
    ctx.cookies.set(
      'userId',
      'jianghe',
      {
        domain: 'localhost', // 写cookie所在的域名
        path: '/', // 写cookie所在的路径
        maxAge: 10 * 60 * 1000, // cookie有效时长
        expires: new Date('2018-02-15'), // cookie失效时间
        httpOnly: false, // 是否只用于http请求中获取
        overwrite: false, // 是否允许重写
      },
    );
  }
}

const entryController = new EntryController();

module.exports = {
  // 网站入口控制器
  'GET /': entryController.entryIndex,
  // 登录接口
  'POST /login': entryController.login,
};
