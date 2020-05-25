const fs = require('fs');

/**
 * 将控制器根据key添加到router中
 * @param router koa_router对象
 * @param mapping 控制器文件
 */
function addMapping(router, mapping) {
  for (const url in mapping) {
    if (url.startsWith('GET ')) {
      const path = url.substring(4);
      router.get(path, mapping[url]);
      console.log(`register URL mapping: GET ${path}`);
    } else if (url.startsWith('POST ')) {
      const path = url.substring(5);
      router.post(path, mapping[url]);
      console.log(`register URL mapping: POST ${path}`);
    } else {
      console.log(`invalid URL: ${url}`);
    }
  }
}

/**
 * 利用fs自动扫描添加控制器
 * @param router koa_router对象
 * @param dir 扫描路径
 */
function addControllers(router, dir) {
  const files = fs.readdirSync(dir);
  const jsFiles = files.filter((f) => f.endsWith('.js'));

  for (const f of jsFiles) {
    console.log(`process controller: ${f}...`);
    // eslint-disable-next-line
    const mapping = require(`${dir}/${f}`);
    addMapping(router, mapping);
  }
}

/**
 * 导出一个扫描方法
 * @param dir 扫描路径
 * @returns {*} 返回koa_router中间件
 */
module.exports = (dir) => {
  const controllersDir = dir || '/controller'; // 如果不传参数，扫描目录默认为'controllers'
  // eslint-disable-next-line
  const router = require('koa-router')();
  addControllers(router, controllersDir);
  return router.routes();
};
