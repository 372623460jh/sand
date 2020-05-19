import {
  setRoutes,
  getRoutes,
  getStore,
  setModel,
  getDva,
} from '../src/SandPc/SandPc';

describe('SandPc.js', () => {
  test('set/get routes', () => {
    const testRoute = {
      test: '111',
    };
    // 设置路由
    setRoutes(testRoute);
    // 读取路由
    expect(getRoutes()).toEqual(testRoute);
  });

  // dva 相关测试
  test('dva', () => {
    const testModel = {
      namespace: 'jestTestNamespace',
      state: {},
    };
    // 获取dva实例
    expect(getDva()).not.toBeUndefined();
    // 获取store
    expect(getStore()).not.toBeUndefined();
    // 设置model
    expect(setModel(testModel)).toBeUndefined();
  });
});
