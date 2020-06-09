const fs = require('fs');
const path = require('path');
const KoaRouter = require('koa-router');

/**
 * 将控制器根据key添加到router中
 * @param router koa_router对象
 * @param ctrArr 控制器数组
 */
function addArray(kRouter, ctrArr) {
  for (let n = 0; n < ctrArr.length; n++) {
    const { method, route, controller } = ctrArr[n];
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
}

/**
 * 利用fs自动扫描添加控制器
 * @param kRouter koa_router对象
 * @param dir 扫描路径
 */
function addControllers(kRouter, dir) {
  const files = fs.readdirSync(dir);
  // 过滤出controllers下的所有*.js文件
  const jsFiles = files.filter((f) => f.endsWith('.js'));
  for (const file of jsFiles) {
    console.log(`解析 ${file} 下的所有controller...`);
    // 读取controller数组
    // eslint-disable-next-line
    const ctrArr = require(`${dir}/${file}`);
    addArray(kRouter, ctrArr);
  }
}

/**
 * 导出一个扫描方法
 * @returns {*} 返回koa_router中间件
 */
function controllerMiddleWare() {
  // 扫描controllers
  const controllersDir = path.resolve(__dirname, '../controllers');
  // 实例化koaRouter
  const kRouter = new KoaRouter();
  // 解析controllers下的所有控制器添加路由
  addControllers(kRouter, controllersDir);
  return kRouter.routes();
}

module.exports = controllerMiddleWare;
