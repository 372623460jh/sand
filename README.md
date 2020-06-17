# sand v1.0.0

[中文文档](https://sand.zirupay.com/)

sand 相关工具包仓库

## 1. 项目列表

### sand-build

库构建工具，rollup 库构建，webpack 工具构建，详细文档见./packages/sand-build/README.md

### sand-mystery

加解密工具。详细文档见./packages/sand-mystery/README.md

### sand-lint

统一的 lint 规范。详细文档见./packages/sand-lint/README.md

### sand-core

pc 端脚手架核心框架。详细文档见./packages/sand-core/README.md

### sand-cli

sand 相关脚手架的 cli 工具。详细文档见./packages/sand-cli/README.md

## 2. 目录结构

### staging 目录

脚手架文件目录，sand 工具构建时会将 staging 目录下的脚手架拷贝至 sand-cli/staging 中

1. sand-lib-staging 库脚手架
2. sand-demo-staging 示例脚手架
3. sand-pc-staging pc 脚手架
4. sand-bff-staging bff 应用脚手架
5. sand-docs-staging 基于 dumi 的文档脚手架
6. sand-mob-staging 移动脚手架（TODO）

### debug 目录

该文件夹下存放相关工具库的测试方法，直接 vscode node 调试各个文件夹下的 debug.js 即可。详见./debug/README.md

1. sand-cli-staging sand-cli 工具测试文件
2. sand-demo-staging，sand-pc-stagingsand-lib-staging sand-build 测试文件

### CHANGELOG

每次执行完 git commit 后 post-commit hook 生成 CHANGELOG.backup.md 文件。再手动将 diff 配置到 CHANGELOG.md

## 3. TODO:

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
- node-bff 项目优化，通用错误处理中间件，node-schedule 处理定时任务，定时任务通用方法，通用日志处理方法
- sand-utils 纯 js 类库，提供像 fetch 之类的方法
- 脚手架.gitignore 拷贝丢失问题，脚手架项目抽离，sand-cli init 时动态拉脚手架项目可以解决该问题
- sand 文档完善
- eslint 升 7,rollup 升 2，@babel 升 7.10

## bug

- 登录，登出过程中报错，当做事务来处理
- 解决 sand-mystery 的 jest 报错

## 4. 学习，调研，提案

- 看 koa2 源码。
- 看 egg 思想。
- ts，sand 全部 ts 化
- node 微服务，sand-node-staging 微服务应用脚手架，只提供服务，gRPC 框架
- docker 学习，服务器容器化
- 学习 dumi 源码，sand 原生支持
- sand-mob 脚手架开发

## 5. 项目

- 完成 images.zirupay.com 图片上传管理
- rich 项目
