
import { create } from 'dva-core';

// dva-core实例(单例)
let app = null;

// 获取dva实例
export function getDva() {
  if (!app) {
    // 创建dva-core实例
    app = create({}, {});
    if (!app._store) {
      app.start.call(app);
    }
  }
  return app;
}

// 获取store
export function getStore() {
  return !app ? getDva()._store : app._store;
}

// 设置model
export function setModel(model) {
  return !app ? getDva().model(model) : app.model(model);
}
