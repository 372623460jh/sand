// 异步加载组件的方法
// eslint-disable-next-line
import { init } from 'he-core';

// 配置book页的路由信息
export default {
  path: '/', // 路由的完全路径
  exact: true,
  layout: init(import('./page/Index')),
};
