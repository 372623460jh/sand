import BookPage from './page/Index';
import testModel from './model/testModel';

// 配置index页的路由信息
export default {
  path: '/book',
  enable: true,
  component: BookPage,
  // 状态模型
  model: testModel,
};
