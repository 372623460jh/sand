# sand v2.0.0

[中文文档](https://sand.zirupay.com/)

sand 相关工具包仓库

## 1. 库列表（packages 目录）

### sand-build

库构建工具，rollup，babel 库构建，webpack 工具构建，详细文档见./packages/sand-build/README.md

### sand-cli

sand 相关脚手架的 cli 工具。详细文档见./packages/sand-cli/README.md

### sand-core

pc 端脚手架核心框架。详细文档见./packages/sand-core/README.md

### sand-lint

统一的 lint 规范。详细文档见./packages/sand-lint/README.md

### sand-moco

sand-moco 移动端 spa 框架（mobile core 简称 moco）。

### sand-noco

sand-noco node 基于 koa 的扩展，增加了日志中间件，sso 中间件等。node 框架（node core 简称 noco）。

## 2. 脚手架列表（staging 目录）

脚手架文件目录，sand 工具构建时会将 staging 目录下的脚手架拷贝至 sand-cli/staging 中

1. sand-bff-staging bff 应用脚手架
2. sand-demo-staging 示例脚手架
3. sand-demo-ts-staging 示例脚手架(ts 版本)
4. sand-docs-staging 基于 dumi 的文档脚手架
5. sand-game-phaser-ts-staging 基于 phaser 的游戏 ts 脚手架
6. sand-lib-staging 库脚手架
7. sand-lib-ts-staging 库脚手架(ts 版本)
8. sand-mob-staging 移动端 spa 脚手架
9. sand-mob-ts-staging 移动端 spa 脚手架(ts 版本)
10. sand-pc-staging pc 端脚手架

## 3. 测试目录（debug 目录）

该文件夹下存放相关工具库的测试方法，直接 vscode node 调试各个文件夹下的 debug.js 即可。详见./debug/README.md

1. sand-cli 工具测试文件
2. sand-demo-debug sand-build demo 测试文件
3. sand-lib-debug sand-build lib 测试文件
4. sand-pc-debug sand-build pc 测试文件

## 4. 示例目录（example 目录）

该文件夹下存放所有 packages 下的库对应的示例

1. common 入口
2. sand-moco-demo @jianghe/sand-moco 测试文件

## 5. 文档目录（docs 目录）

基于 dumi 部署至 [中文文档](https://sand.zirupay.com/)

## 6. TODO:

### sand 项目

- ~~rollup 支持 babel 扩展~~
- ~~使用 jest 来支持 ci 命令~~
- ~~给每一个 package 增加单测用例~~
- ~~给每一个脚手架增加 jest 和单测用例~~
- ~~给每一个脚手架增加 jest 和单测用例~~
- ~~sand-bff 脚手架（基于 koa2）~~
- ~~给每一个域名申请 ssl 证书，并且完成每个子域名的 https 配置~~
- ~~完成 assets.zirupay.com，images.zirupay.com，resume.zirupay.com，www.zirupay.com~~
- ~~完成 resume apk~~
- ~~sand-lint 下增加 eslin-node 配置~~
- ~~sand-build 从 express 换成 koa2~~
- ~~自动生成 change log~~
- ~~sand-pc-staging 依赖的 sand-core 优化~~
- ~~history 中间件支持黑名单模式，只有某个路由下的才 302 到 index.html~~
- ~~sand-bff-staging bff 应用&微服务应用脚手架~~
- ~~sand-bff-staging log~~
- ~~基于 dumi 对文档进行支持~~
- ~~所有项目依赖升级为最新安全版本~~
- ~~prettier 和 eslint 格式冲突问题。~~
- ~~基于 dumi 进行 sand 配套文档编写~~
- ~~redis 安装~~
- ~~重复登录~~
- ~~node 应用间 session 同步~~
- ~~sand-lint babel-eslint 放 dependencies~~
- ~~登录接口非对称加密~~
- ~~sand-bff node 应用启动时可以区分环境，并把该环境写到前端。~~
- ~~sso 登录实现 按照 https://www.yuque.com/b121/sand/ha39k6~~
- ~~@ => src~~
- ~~node-bff 项目分层 service，model，controller。controller 处理入口，service 处理业务逻辑，model 领域模型，项目文件目录优化~~
- ~~单独抽离出 node-noco 基于 koa 的框架~~
- ~~husky 替换 pre-commit~~
- ~~eslint 6 升 7.2, 不升 7.3 的原因是 7.3 对 import/no-cycle 兼容有问题~~ 看：https://github.com/airbnb/javascript/issues/2227
- ~~@babel 升 7.10~~
- ~~node-bff 项目优化，通用错误处理中间件。通用日志处理方法~~
- ~~sand-build 增加 ts 的构建~~
- ~~sand-lint 丰富 prettier，commitlint，ts，完善 sand-lint 文档站点~~
- ~~增加 sand-game-phaser-ts 脚手架~~
- ~~sand.zirupay.com nginx 修改，解决刷新 404 问题~~
- ~~sand-build rollup 支持 ts~~
- ~~example 中增加 sand-mob 调试代码~~
- ~~sand-moco 开发~~
- ~~sand-build demo 部分入口检索支持 ts,tsx 入口检索~~
- ~~sand 工程升级为 ts 版本~~
- ~~sand-build 支持 ts 过 babel~~
- ~~sand-demo-ts-staging 脚手架支持 ts~~
- ~~sand-lib-ts-staging ts 脚手架~~
- ~~sand-mob-staging 依赖 sand-moco 的移动端单页应用库和脚手架~~
- ~~sand-mob-ts-staging ts 版本移动端单页应用库和脚手架~~
- ~~sand-core 库 ts 化~~
- ~~example 中增加 @jianghe/sand-core 调试代码~~
- ~~sand-build 支持生成 cjs，ejs，umd 的灵活配置~~
- ~~sand-build rollup 支持 replace 扩展~~
- ~~sand-build webpack 支持 DefinePlugin 扩展~~
- ~~sand-build webpack plugin 漏出区分环境~~
- ~~sand-build webpack externals 漏出~~
- ~~sand-build lib 增加纯 babel 编译方式~~
- ~~sand-build 优化 koa2+webpack 控制台输出~~
- ~~sand-build 重构（ts babel 构建）~~
- ~~配置方式重构 lib 构建分为 babel|rollup-esm，babel|rollup-cjs，babel-umd~~
- ~~对外暴露命令和可以直接调用的 node 方法一个模式支持一种编译方式。~~
- ~~sand-build babel 模式时和 rollup 混合时构建顺序会有问题。~~
- ~~同步 sand start -t lib 命令~~
- ~~rollup 升级 2.0~~
- ~~支持 babelruntime 开关配置~~
- ~~sand-build 单独提出文件~~
- ~~sand-build ts 化~~

- webpack 升 5
- ts 升 4
- 看 rollup 0.3 源码
- @zirupay/sand-build 支持库构建
- sand-core 优化不导出 react，react-dom
- webpack 插件来优化控制台输出
- example 中增加 @jianghe/sand-noco 调试代码
- sand 文档完善
- node-bff node-schedule 处理定时任务，定时任务通用方法
- 脚手架.gitignore 拷贝丢失问题，脚手架项目抽离，sand-cli init 时动态拉脚手架项目可以解决该问题
- package.json 中的依赖升级到最高额可靠版本，比如 rollup 升 2
- 考虑如何拆项目，如将脚手架从项目中移除，初始化脚手架时从线上拉取脚手架文件，将 debug 移入每一个库中
- sand-node 微服务应用脚手架，只提供服务，gRPC 框架

### 非 sand 项目

- sand-libs，基于 sand-lib 新建一个的工具库，里面包含
  - ~~sand-mystery 从 sand 项目中迁移出来~~
  - ~~sand-utils 基础方法：url 处理，encode，fetch~~
  - ~~sand-viewport 视口库~~
- ~~sand-slate，基于 sand-lib 新建一个 slate 库，目前已有但是需要维护~~
- sand-editor，基于 sand-lib 模仿 editor 新建一个 editor 库
- editor 项目，基于 sand-bff 的编辑器项目，并部署

## 7.bug

## 8. 学习，调研，提案

- ~~看 koa2 源码。~~
- 看 egg 源码。
- docker k8s 学习，服务器容器化

## 9. CHANGELOG

每次执行完 git commit 后 post-commit hook 生成 CHANGELOG.backup.md 文件。再手动将 diff 配置到 CHANGELOG.md

## 10. 项目

- 完成 login.zirupay.com 登录服务
  - 抽离登录前端组件，用于前端处理登录逻辑，获取公钥，发登录请求
  - 抽离 node 登录中间件
  - ~~申请 login.zirupay.com，img.zirupay.com，editor.zirupay.com 域名~~
  - ~~部署 login.zirupay.com 服务~~
  - 解决 win 下登录解密失败的报错，mac 下成功
- 完成 images.zirupay.com 图片上传管理
- ~~完成 editor.zirupay.com 文档编辑器项目~~
- 完善 sand.zirupay.com sand 项目文档
- rich 项目
