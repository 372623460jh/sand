/**
 * 该方法用于将分割的路由配置汇总，
 * 用于查找某个文件下下的所有router-config.js
 * @param {*} subRouteConfig 路由配置
 */
function sumRouter(subRouteConfig) {
  const route = [];
  // subRouteConfig.keys()返回的是按照条件匹配到的路径数组
  subRouteConfig.keys().forEach((key) => {
    let config = subRouteConfig(key);
    // 取出拆分的路由配置
    config = config.default || config;
    // 将布局字段改成component
    config.component = config.layout;
    // 合并到主路由中
    route.push(config);
  });
  return route;
}

export {
  sumRouter,
};
