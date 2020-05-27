import React from '@jianghe/sand-core/react';
import { render } from '@jianghe/sand-core/react-dom';
import { HashRouter } from '@jianghe/sand-core/router';
import {
  Provider,
  sumRouter,
  getStore,
  renderRoutes,
  setRoutes,
} from '@jianghe/sand-core';
// 引入polyfill
import '@jianghe/sand-core/polyfill';
import './index.less';

// 为懒加载添加cdn支持
// eslint-disable-next-line
__webpack_public_path__ = window.__webpack_public_path__ || '/'; 

// 引入pages下所有的router-config.js文件，
// 第一个参数是相对路径
// 第二个参数是是否包含子目录
// 第三个参数是匹配文件的正则
const subRouteConfig = require.context('../pages', true, /router-config\.js$/);

// 将分割的路由合并
const routeConfig = sumRouter(subRouteConfig);

setRoutes(routeConfig);

// 没命中任何一个路由的话重定向到/
routeConfig.push({
  redirect: { to: '/' },
});

render((
  <Provider store={getStore()}>
    <HashRouter>
      {renderRoutes(routeConfig)}
    </HashRouter>
  </Provider>
), window.document.getElementById('root'));
