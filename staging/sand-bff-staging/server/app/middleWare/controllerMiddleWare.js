const KoaRouter = require('koa-router');
const routerArray = require('../router');

/**
 * 将控制器根据key添加到router中
 * @param router koa_router对象
 */
function controllerMiddleWare() {
  // 实例化koaRouter
  const kRouter = new KoaRouter();
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

module.exports = controllerMiddleWare;
