/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'dva-core';

/**
 * 基于dva-core封装的类 挂载到moco实例上
 */
class DvaApp {
  public dva: any = null;

  constructor() {
    this.dva = this.getDvaApp();
  }

  /**
   * 获取dva实例
   */
  getDvaApp = (): any => {
    if (!this.dva) {
      // 创建dva-core实例
      this.dva = create({}, {});
      if (!this.dva._store) {
        this.dva.start.call(this.dva);
      }
    }
    return this.dva;
  };

  /**
   * 获取store
   */
  getStore = (): any => {
    return !this.dva ? this.getDvaApp()._store : this.dva._store;
  };

  /**
   * 注册dva model 使用replaceModel方法如果存在直接替换
   * @param {*} model
   */
  setModel = (model: any): any => {
    return !this.dva
      ? this.getDvaApp().replaceModel(model)
      : this.dva.replaceModel(model);
  };

  /**
   * 注销dva model
   */
  unModel = (namespace: string): any => {
    if (!this.dva) {
      this.getDvaApp().unmodel(namespace);
    } else {
      this.dva.unmodel(namespace);
    }
  };
}

export default DvaApp;
