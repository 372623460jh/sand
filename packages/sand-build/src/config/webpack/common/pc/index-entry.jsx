/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import '../core/polyfill'; // 引入polyfill
import {
  sumRouter, getStore, renderRoutes, setRoutes,
} from '../core';
import './index-entry.less';

// 将分割的路由合并
const routeConfig = sumRouter([]);

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
