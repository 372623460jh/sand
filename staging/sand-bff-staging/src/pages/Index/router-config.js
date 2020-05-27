// 异步加载组件的方法
import { async } from '@jianghe/sand-core/';

// 配置book页的路由信息
export default {
  path: '/', // 路由的完全路径
  exact: true,
  layout: async(import('./page/Index')),
};
