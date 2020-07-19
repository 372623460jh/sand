import { addListen, autoViewPort } from '@jianghe/sand-moco';
import './index.less';

// 设置视口
autoViewPort(100, 1, 7.5);

// eslint-disable-next-line
// __webpack_public_path__ = 'https://dev.g.alicdn.com/ltao-fe/ranch-jianhe-test/0.0.1/';

// 引入pages下所有的router-config.js文件，
// 第一个参数是相对路径
// 第二个参数是是否包含子目录
// 第三个参数是匹配文件的正则
const webpackRouteConfig = require.context(
  './src/pages',
  true,
  /router-config\.ts$/
);

// 添加路由监听
addListen({
  webpackRouteConfig,
  defaultRoute: '/index',
  rootEle: '#moco-root',
});
