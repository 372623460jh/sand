import Loadable from 'react-loadable';

/**
 * 默认loading动画
 */
function DefaultLoading() {
  return null;
}

/**
 * 动态加载组件的方法
 * @param {*} module react组件
 * @param {*} param1
 */
function async(module, { loading = DefaultLoading, ...rest } = {}) {
  return Loadable({
    delay: 0,
    ...rest,
    loader: module,
    loading,
  });
}

export {
  async,
};
