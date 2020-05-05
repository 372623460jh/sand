@jianghe/sand-core

sand-pc脚手架核心功能,对外暴露
@jianghe/sand-core/react 
@jianghe/sand-core/react-dom 
@jianghe/sand-core/react-router-dom

import {
  getDva, // 获取dva实例
  getStore, // 获取store
  setModel, // 设置model
  async, // 动态初始组件的方法
  renderRoutes, // 将路由配置转换为react-router4组件的方法
  sumRouter, // 将分割路由合并的方法
  setRoutes, // 设置路由配置
  getRoutes, // 获取路由配置
  matchRoutes,
  PropTypes,
  connect,
  Provider,
} from '@jianghe/sand-core'

