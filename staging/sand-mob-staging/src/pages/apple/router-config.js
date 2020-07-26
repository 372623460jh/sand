// 异步加载组件的方法
import ApplePage from './page/Index';

// 配置index页的路由信息
export default {
  // 路由
  path: '/apple',
  // 是否有效
  enable: true,
  // 路由命中时加载哪个组件
  component: ApplePage,
};
