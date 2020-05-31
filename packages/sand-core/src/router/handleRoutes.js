import BaseLayout from '../components/BaseLayout';
import WrapBaseComponent from '../components/WrapBaseComponent';

/**
 * 拼接路径
 * @param {*} path1
 * @param {*} path2
 */
function joinPath(path1, path2) {
  let result = path1 + path2;
  // 替换 // 为 /
  result = result.replace(/\/\//g, '/');
  return result;
}

/**
 * 用于拼接路由path的方法;
 * @param {*} route 路由
 * @param {*} parentPath 父路径
 */
function handleRoute(route, parentPath) {
  if (!route.component) {
    // 没有component设置BaseLayout（直接render children）
    route.component = BaseLayout;
  }

  // 用于包装每一个路由对应组件
  route.component = WrapBaseComponent(route.component);

  if (route.path && parentPath) {
    // 拼接主子路由
    route.path = joinPath(parentPath, route.path);
  }

  if (Array.isArray(route.routes)) {
    // 子路由
    route.routes.forEach(
      (childRoute) => handleRoute(childRoute, route.path),
    );
  }
}

/**
 * 该方法用于将分割的路由配置汇总，
 * 用于查找某个文件下下的所有router-config.js
 * @param {*} subRouteConfig 路由配置
 */
function handleRoutes(routes) {
  routes.forEach((route) => {
    handleRoute(route);
  });
  return routes;
}

export default handleRoutes;
