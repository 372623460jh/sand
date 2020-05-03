// 异步加载组件的方法
// eslint-disable-next-line
import { init } from 'he-core';
import BaseLayout from '../../layout/BaseLayout';

// 配置book页的路由信息
export default {
  path: '/book', // 路由的完全路径
  layout: BaseLayout, // 对应的布局文件layout字段只能用在拆分字段的第一级
  routes: [
    {
      path: '/book',
      exact: true,
      redirect: { to: '/book/apple' }, // redirect标志表示重定向到/
    },
    {
      path: '/book/apple', // 路由的完全路径
      component: init(import('./page/Apple')), // 路由匹配时动态加载组件到父路由component中
    },
    {
      path: '/book/store',
      component: init(import('./page/Store')),
    },
  ],
};
