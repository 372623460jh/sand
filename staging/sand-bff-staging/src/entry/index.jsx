import React from '@jianghe/sand-core/react';
import ReactDOM from '@jianghe/sand-core/react-dom';
import { Router } from '@jianghe/sand-core/router-dom';
import { createBrowserHistory } from '@jianghe/sand-core/history';
import { Provider } from '@jianghe/sand-core/react-redux';
import {
  handleRoutes,
  getStore,
  setRoutes,
  redirect,
  RouteLoader,
} from '@jianghe/sand-core';
// 引入polyfill
import '@jianghe/sand-core/polyfill';
import './index.less';

// react渲染到哪
const elementId = '#root';
// routerPrefix
const routerPrefix = '/spa';

// 为懒加载添加cdn支持
// eslint-disable-next-line
__webpack_public_path__ = window.__webpack_public_path__ || '/';

/**
 * 获取路由配置的方法
 */
function getRoutes(prefix) {
  // 子路由
  const routes = [];
  // 引入pages下所有的router-config.js文件，
  // 第一个参数是相对路径
  // 第二个参数是是否包含子目录
  // 第三个参数是匹配文件的正则
  const subRouteConfig = require.context(
    '../pages',
    true,
    /router-config\.js$/
  );
  // 遍历配置
  subRouteConfig.keys().forEach((key) => {
    let config = subRouteConfig(key);
    // 取出拆分的路由配置
    config = config.default || config;
    // 合并到主路由中
    routes.push(config);
  });
  // 完整路由
  return [
    {
      path: prefix,
      routes,
    },
    {
      path: '/',
      routes: [
        {
          component: redirect({ to: prefix }),
        },
      ],
    },
  ];
}

// 处理路由配置成react-route-config接受的格式
const routeConfig = handleRoutes(getRoutes(routerPrefix));

// 设置配置
setRoutes(routeConfig);

// history
const history = createBrowserHistory({});

// 渲染界面
ReactDOM.render(
  <Provider store={getStore()}>
    <Router history={history}>
      <RouteLoader routes={routeConfig} />
    </Router>
  </Provider>,
  window.document.querySelector(elementId)
);
