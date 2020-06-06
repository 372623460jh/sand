---
title: 快速开始
# 菜单展示在哪，content在内容区域展示，menu左侧
toc: content
# 左侧菜单的顺序，越小越靠前
order: 1
# 导航栏配置
nav:
  # 分组名
  title: 快速开始
  # 文档显示顺序越小越靠左
  order: 1
---

# sand 是啥？

sand 其实是一系列脚手架、类库、工具集的个人最佳实践沉淀。

### 安装

> 确保自己已安装 node 环境（>=8.0.0）。

```shell
npm install @jianghe/sand-cli -g
```

### 新建空文件夹

```shell
mkdir sand-demo
cd ./sand-demo
```

### 初始化脚手架

执行 sand-cli init 选择脚手架中最简单的 `sand-demo` 脚手架进行上手

```shell
sand-cli init
```

### 确定脚手架配置

- 项目名（默认：上级目录名）
- 版本（默认：1.0.0）
- 项目描述（默认：空）
- 作者（默认：空）
- 协议（默认：ISC）

### 访问

浏览器访问http://127.0.0.1:9897
