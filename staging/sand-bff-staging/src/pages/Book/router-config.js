// 异步加载组件的方法
import { async } from '@jianghe/sand-core/';
import BaseLayout from '../../layout/BaseLayout';

// 配置book页的路由信息
export default {
  path: '/book', // 路由的完全路径
  layout: BaseLayout, // 对应的布局文件layout字段只能用在拆分字段的第一级
  routes: [
    {
      path: '/book/apple', // 路由的完全路径
      exact: true,
      component: async(import('./page/Apple')), // 路由匹配时动态加载组件到父路由component中
    },
    {
      path: '/book/store',
      exact: true,
      component: async(import('./page/Store')),
    },
    {
      path: '/book/test',
      exact: true,
      redirect: { to: '/book/Apple' }, // redirect标志表示重定向到/
    },
  ],
};
