import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import CONSTANTS from '../common/constants';
import Page from '../model/Page';
import './index.less';

const { PAGE_ROOT_ELE } = CONSTANTS;

/**
 * 将页面组件渲染至sand-main-box,并返回真实dom
 */
function getPageDom(page: Page): HTMLDivElement {
  const { component: Component, moco } = page;
  // 生成页面根节点
  const div = document.createElement('div');
  // 设置页面类名
  div.setAttribute('class', PAGE_ROOT_ELE);
  // 渲染界面
  ReactDOM.render(
    <Provider store={moco.dvaApp.getStore()}>
      <Component mocoPage={page} />
    </Provider>,
    div
  );
  return div;
}

export { getPageDom };
