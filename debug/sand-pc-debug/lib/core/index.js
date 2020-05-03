import { getDva, getStore, setModel } from './createDva';
import { init } from './initComponent';
import { matchRoutes, renderRoutes, sumRouter } from './reactRouterConfig';
import { setRoutes, getRoutes } from './he'

export {
  getDva, // 获取dva实例
  getStore, // 获取store
  setModel, // 设置model
  init, // 动态初始组件的方法
  matchRoutes,
  renderRoutes, // 将路由配置转换为react-router4组件的方法
  sumRouter, // 将分割路由合并的方法
  setRoutes, // 设置路由配置
  getRoutes, // 获取路由配置
};
