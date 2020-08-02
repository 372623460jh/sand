import { addListen } from '@jianghe/sand-moco';
import setViewport from '@jianghe/sand-viewport';

import './index.less';

// 设置视口
setViewport(7.5);

// eslint-disable-next-line
// __webpack_public_path__ = 'https://assets.zirupay.com/assets/xxxx/0.0.1/';

// 引入pages下所有的router-config.js文件，
// 第一个参数是相对路径
// 第二个参数是是否包含子目录
// 第三个参数是匹配文件的正则
const webpackRouteConfig = require.context(
  '../pages',
  true,
  /router-config\.js$/
);

// 添加路由监听
addListen({
  webpackRouteConfig,
  defaultRoute: '/index',
  rootEle: '#moco-root',
});
