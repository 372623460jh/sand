import handleRoutes from './router/handleRoutes';
import async from './components/asyncComponent';
import redirect from './components/redirect';
import RouteLoader from './components/RouteLoader';
import {
  setRoutes, getRoutes, getDva, getStore, setModel,
} from './SandPc/SandPc';

export {
  getDva, // 获取dva实例
  getStore, // 获取store
  setModel, // 设置model
  async, // 动态初始组件的方法
  handleRoutes, // 控制路由
  setRoutes, // 设置路由配置
  getRoutes, // 获取路由配置
  redirect, // 重定向
  RouteLoader, // 加载Route的组件
};
