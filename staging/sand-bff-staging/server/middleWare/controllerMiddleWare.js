const fs = require('fs');
const path = require('path');
const koaRouter = require('koa-router');

/**
 * 将控制器根据key添加到router中
 * @param router koa_router对象
 * @param mapping 控制器文件
 */
function addMapping(kRouter, mapping) {
  for (const url in mapping) {
    if (url.startsWith('GET ')) {
      // 将get添加到router
      const urlPath = url.substring(4);
      kRouter.get(urlPath, mapping[url]);
      console.log(`注册URL: GET ${urlPath}`);
    } else if (url.startsWith('POST ')) {
      // 将post添加到router
      const urlPath = url.substring(5);
      kRouter.post(urlPath, mapping[url]);
      console.log(`注册URL: POST ${urlPath}`);
    } else {
      console.log(`无效URL: ${url}`);
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
    // eslint-disable-next-line
    const mapping = require(`${dir}/${file}`);
    addMapping(kRouter, mapping);
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
  const kRouter = koaRouter();
  // 解析controllers下的所有控制器添加路由
  addControllers(kRouter, controllersDir);
  return kRouter.routes();
}

module.exports = controllerMiddleWare;
