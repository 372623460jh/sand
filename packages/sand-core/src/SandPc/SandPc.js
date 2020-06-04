/* eslint-disable no-underscore-dangle */
import { create } from 'dva-core';

/**
 * 管理sandpc对面暴露的属性
 * routerConfig: 项目的路由配置
 */
function SandPc() {
  // 路由配置
  this.routerConfig = {};
  // dva-core实例(单例)
  this.app = null;
}

const sandPc = new SandPc();

window.$sandPc = sandPc;

/**
 * 设置路由配置
 * @param {*} routerConfig
 */
function setRoutes(routerConfig) {
  sandPc.routerConfig = routerConfig;
}

/**
 * 获取路由配置
 */
function getRoutes() {
  return sandPc.routerConfig;
}

/**
 * 获取dva实例
 */
function getDva() {
  if (!sandPc.app) {
    // 创建dva-core实例
    sandPc.app = create({}, {});
    if (!sandPc.app._store) {
      sandPc.app.start.call(sandPc.app);
    }
  }
  return sandPc.app;
}

/**
 * 获取store
 */
function getStore() {
  return !sandPc.app ? getDva()._store : sandPc.app._store;
}

/**
 * 设置model
 * @param {*} model
 */
function setModel(model) {
  return !sandPc.app ? getDva().model(model) : sandPc.app.model(model);
}

export {
  setRoutes, getRoutes, getStore, setModel, getDva,
};
