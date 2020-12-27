// 异步加载组件的方法
import { async, redirect } from '@jianghe/sand-core/es/sand-core';
import BaseLayout from '../../layout/BaseLayout';

// 配置book页的路由信息
export default {
  path: '/attention', // 路由的完全路径
  component: BaseLayout, // 对应的布局文件layout字段只能用在拆分字段的第一级
  routes: [
    {
      path: '/index',
      component: async(import('./page/Attention')),
    },
    {
      component: redirect({ to: '/spa/attention/index' }),
    },
  ],
};
