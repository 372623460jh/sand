/* eslint-disable react/jsx-props-no-spreading */
import React, {
  lazy,
  Suspense,
  Component,
} from 'react';

/**
 * 默认loading动画
 */
// eslint-disable-next-line func-names
let DefaultLoading = function () {
  return null;
};

function async(module, { loading = DefaultLoading } = {}) {
  const LazyComponent = lazy(module);
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

export {
  async,
};
