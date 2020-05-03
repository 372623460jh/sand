// import React, { Component } from 'react';

// /**
//  * 该方法用于包装一个组件，该组件用于动态路由时加载
//  * @param {*} importComponent 引用组件的方法
//  */
// export function init(importComponent) {
//   class AsyncComponent extends Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         RouteComponent: null,
//       };
//     }

//     // 在componentDidMount生命周期方法里动态引入组件
//     async componentDidMount() {
//       // 执行传入的引入组件方法，动态引入组件
//       const { default: RouteComponent } = await importComponent();
//       this.setState({
//         RouteComponent,
//       });
//     }

//     render() {
//       const { RouteComponent } = this.state;
//       return RouteComponent ? <RouteComponent {...this.props} /> : null;
//     }
//   }
//   return AsyncComponent;
// }
import Loadable from 'react-loadable';

const DefaultLoading = function() {
  return null;
};

// 动态加载组件的方法
export function init(
  module,
  { loading = DefaultLoading, ...rest } = {},
) {
  return Loadable({
    delay: 0,
    ...rest,
    loader: module,
    loading,
  });
}
