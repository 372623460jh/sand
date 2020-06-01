// 异步加载组件的方法
import { async, redirect } from '@jianghe/sand-core/';

// 配置book页的路由信息
export default {
  path: '/', // 路由的完全路径
  component: async(import('./page/Index')),
  routes: [
    {
      component: redirect({ to: '/spa' }),
    },
  ],
};
