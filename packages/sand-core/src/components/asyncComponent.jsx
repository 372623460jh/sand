/* eslint-disable react/jsx-props-no-spreading */
import React, {
  lazy,
  Suspense,
  Component,
} from 'react';

/**
 * 默认loading动画
 */
let DefaultLoading = () => null;

/**
 * 动态加载HOC组件
 * @param {*} module 组件path
 * @param {*} param1 opts
 */
function async(module, { loading = DefaultLoading } = {}) {
  // lazy加载模块
  const LazyComponent = lazy(module);
  // 加载时的组件
  const LoadingComponent = loading;

  return class LazyLoader extends Component {
    // 异步加载需要暴露一个接口去类同步获取真实内容
    static preload() {
      return module();
    }

    render() {
      return (
        <Suspense fallback={<LoadingComponent {...this.props} />}>
          <LazyComponent {...this.props} />
        </Suspense>
      );
    }
  };
}

async.setDefaultLoading = function setDefaultLoading(LoadingComponent) {
  DefaultLoading = LoadingComponent;
};

export default async;
