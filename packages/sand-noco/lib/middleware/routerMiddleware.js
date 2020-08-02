/* eslint-disable no-console */
const path = require('path');
const KoaRouter = require('koa-router');
const getKoaInstance = require('../utils/koaInstance');

/**
 * 将控制器根据key添加到router中
 * @param {*} routerArray 路由配置
 * @param {*} kRouter koa-router实例
 */
function getRoutes(routerArray, kRouter) {
  for (let n = 0; n < routerArray.length; n++) {
    const { method, route, controller } = routerArray[n];
    if (!method || !route || !controller) {
      console.log('controller配置不合法');
      return;
    }
    if (method === 'GET') {
      // 将get添加到router
      kRouter.get(route, controller);
      console.log(`注册URL: GET ${route}`);
    } else if (method === 'POST') {
      // 将post添加到router
      kRouter.post(route, controller);
      console.log(`注册URL: POST ${route}`);
    } else {
      console.log(`无效URL: ${route}`);
    }
  }
  // eslint-disable-next-line consistent-return
  return kRouter.routes();
}

/**
 * 兜底的错误处理中间件，最先加载
 * @param {*} routerPath 控制器所在文件夹
 */
function routerMiddleware(routerPath = '') {
  /**
   * ctr所在的根目录
   */
  const baseRouterPath =
    routerPath || path.resolve(process.cwd(), './app/router/index.js');

  /**
   * 实例化的koaRouter
   */
  const kRouter = new KoaRouter();

  /**
   * koa实例
   */
  const app = getKoaInstance();

  /**
   * 路由数组
   */
  // eslint-disable-next-line
  const router = require(`${baseRouterPath}`);

  /**
   * 读取路由配置
   */
  const routerArray = router(app);

  /**
   * 将控制器根据key添加到router中
   */
  return getRoutes(routerArray, kRouter);
}

module.exports = routerMiddleware;
