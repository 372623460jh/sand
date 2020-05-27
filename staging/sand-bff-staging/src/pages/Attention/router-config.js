// 异步加载组件的方法
import { async } from '@jianghe/sand-core';
import BaseLayout from '../../layout/BaseLayout';

// 配置book页的路由信息
export default {
  path: '/attention', // 路由的完全路径
  layout: BaseLayout, // 对应的布局文件layout字段只能用在拆分字段的第一级
  routes: [
    {
      path: '/attention/index',
      exact: true,
      component: async(import('./page/Attention')),
    },
    {
      path: '/attention/test',
      redirect: { to: '/book/apple' }, // redirect标志表示重定向到/
    },
  ],
};
