---
title: sand-core
# 菜单展示在哪，content在内容区域展示，menu左侧
toc: content
# 左侧菜单的顺序，越小越靠前
order: 4
---

# sand-core

react 栈应用的核心，将 react，react-dom，react-redux，router，prop-types 等集中管理

## sand-core 下额外引入的类库

sand-pc 脚手架核心功能,对外暴露

- @jianghe/sand-core/react
- @jianghe/sand-core/server
- @jianghe/sand-core/react-dom
- @jianghe/sand-core/react-redux
- @jianghe/sand-core/router-dom
- @jianghe/sand-core/router-config
- @jianghe/sand-core/prop-types
- @jianghe/sand-core/history

## sand-core 包含的能力

```
import {
  getDva, // 获取 dva 实例
  getStore, // 获取 store
  setModel, // 设置 model
  async, // 动态初始组件的方法
  renderRoutes, // 将路由配置转换为 react-router4 组件的方法
  sumRouter, // 将分割路由合并的方法
  setRoutes, // 设置路由配置
  getRoutes, // 获取路由配置
  matchRoutes,
  PropTypes,
  connect,
  Provider,
} from '@jianghe/sand-core'
```
