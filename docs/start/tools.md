---
title: 工具库简介
# 菜单展示在哪，content在内容区域展示，menu左侧
toc: content
# 左侧菜单的顺序，越小越靠前
order: 2
---

# sand 工具库简介

一系列工具和类库，是 sand 的基石。

## 1. sand-build [![npm package](https://img.shields.io/npm/v/@jianghe/sand-build.svg?style=flat-square)](https://www.npmjs.org/package/@jianghe/sand-build)

集成了 webpack，rollup 的可扩展构建工具库。详细参考[sand-build](/libs/sand-build)文档。

可在`.sandbuildrc.js`中灵活配置 webpack 和 rollup 的构建配置。

具体使用 webpack 还是 rollup 分场景决定，大部分场景下其实需要混合使用，各司其职，各自负责相应部分的构建。一般来说类库推荐使用 rollup 这样构建出来的代码更清晰更可读，工程应用使用 webpack 进行构建。

#### 以下是 sand 中各个脚手架对于 sand-build 的依赖

1. sand-demo 的使用到了 sand-build webpack 来进行整个项目的构建。
2. sand-lib 中`./packages` 下的库构建相关使用 sand-build rollup 来构建出 cjs，esm，umd 规范的代码；`./examples` 使用 sand-build webpack 进行类库示例应用的构建；`./docs` 依赖于 sand-docs 进行文档输出。
3. sand-pc 中使用 sand-build webpack 进行整个应用的构建。
4. sand-bff 中依赖了 sand-build webpack 负责 bff 应用前端部分的构建。

> TODO:
>
> 1. sand-mob 计划依赖 sand-build webpack 进行整个应用的构建。 <br/>
> 2. sand-node 无需依赖 sand-build。

## 2. sand-lint [![npm package](https://img.shields.io/npm/v/@jianghe/sand-lint.svg?style=flat-square)](https://www.npmjs.org/package/@jianghe/sand-lint)

整个 sand 项目的通用 lint 配置方案。集成了主流的开源 lint 解决方案加以自定制，目前支持 react，node，style。

详细参考[sand-lint](/libs/sand-lint)文档

> TODO:
>
> 1. 对于 ts 的 lint 支持。

#### react lint 规范

依赖于 eslint-config-airbnb，并做了 prettier 兼容，处理了 eslint 和 prettier 的兼容问题。

#### node lint 规范

依赖于 eslint-config-airbnb-base，并做了 prettier 兼容，处理了 eslint 和 prettier 的兼容问题。

#### stylelint 规范

依赖于 stylelint-scss。

#### 以下是 sand 中各个脚手架对于 sand-lint 的依赖

1. sand-demo 依赖于 sand-lint react 和 style；
2. sand-lib 依赖于 sand-lint react 和 style；
3. sand-pc 依赖于 sand-lint react 和 style；
4. sand-bff 依赖于 sand-lint react 和 style；

> TODO:
>
> 1. sand-mob 计划依赖 sand-lint react 和 style <br/>
> 2. sand-node 计划依赖 sand-lint node

## 3. sand-core [![npm package](https://img.shields.io/npm/v/@jianghe/sand-core.svg?style=flat-square)](https://www.npmjs.org/package/@jianghe/sand-core)

sand 中和 pc 端相关 spa 应用的核心库，集成了 react，redux，router，dva（选用）。支持动态路由，支持 json 化配置路由和布局。

详细参考[sand-core](/libs/sand-core)文档

#### 特性

1. 只支持 history 路由不支持 hash 路由，这是出于 url 美观和 bff 应用 ssr 的考虑。

#### 以下是 sand 中各个脚手架对于 sand-core 的依赖

1. sand 中所有 react 栈的脚手架都依赖与 sand-core/react
2. sand-pc 依赖于 sand-core；
3. sand-bff 前端部分依赖于 sand-core；

## 4. sand-cli [![npm package](https://img.shields.io/npm/v/@jianghe/sand-cli.svg?style=flat-square)](https://www.npmjs.org/package/@jianghe/sand-cli)

整个 sand 项目的 cli 工具。用于快速搭建想要的应用。 详细参考[sand-cli](/libs/sand-cli)文档

#### sand-demo

最简单的脚手架，支持多入口多输出。在平常的学习工作中你会不会有想要了解一个开源库、框架时，上手实践时还得去搭建一套构建环境的痛？如果有可以试试这个脚手架。

#### sand-docs

基于 dumi 的文档站点搭建脚手架。后续视 dumi 发展来决定是否集成 dumi 还是集成 facebook/docusaurus，或是自己实现。

#### sand-pc

pc 端 spa 应用脚手架，适用于中台场景

#### sand-lib

如果你想把你的库、包推送至 npm，可使用该脚手架编写库，测试库，编写库文档。sand 就是依赖该脚手架进行维护的。

#### sand-bff

bff 是阿里前端提出的，由于本人在福报厂工作所以深受其影响。相对于新提出的 sff 应用，bff 应用对于个人开发者或者小团队更有价值。简单来讲该脚手架就是粘合了 sand-pc + node bff 层处理 ui model + ssr。

> TODO:
>
> 1. sand-mob 支持<br/>
> 2. sand-node 支持

## 5. sand-utils

> TODO: 纯 js 工具库，提供纯粹的常用方法。
