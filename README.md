# sand v1.0.0 
sand相关工具包仓库

## 1. 项目列表
### sand-build
库构建工具，rollup库构建，webpack工具构建，详细文档见./packages/sand-build/README.md
### sand-mystery
加解密工具。详细文档见./packages/sand-mystery/README.md
### sand-lint
统一的lint规范。详细文档见./packages/sand-lint/README.md
### sand-core
pc端脚手架核心框架。详细文档见./packages/sand-core/README.md
### sand-cli
sand相关脚手架的cli工具。详细文档见./packages/sand-cli/README.md

## 2. 目录结构
### staging目录
脚手架文件目录，sand工具构建时会将staging目录下的脚手架拷贝至sand-cli/staging中
1. sand-lib-staging 库脚手架
2. sand-demo-staging 示例脚手架
3. sand-pc-staging pc脚手架
4. sand-mob-staging 移动脚手架（TODO）
### debug目录
该文件夹下存放相关工具库的测试方法，直接vscode node调试各个文件夹下的debug.js即可。详见./debug/README.md
1. sand-cli-staging sand-cli工具测试文件
2. sand-demo-staging，sand-pc-stagingsand-lib-staging sand-build测试文件

### CHANGELOG
每次执行完git commit后post-commit hook生成CHANGELOG.backup.md文件。

## 3. TODO:
- ~~rollup支持babel扩展~~
- ~~使用jest来支持ci命令~~
- ~~给每一个package增加单测用例~~
- ~~给每一个脚手架增加jest和单测用例~~
- ~~给每一个脚手架增加jest和单测用例~~
- ~~sand-bff脚手架（基于koa2）~~
- ~~给每一个域名申请ssl证书，并且完成每个子域名的https配置~~
- ~~完成assets.zirupay.com，images.zirupay.com，resume.zirupay.com，www.zirupay.com~~
- ~~完成resume apk~~
- ~~sand-lint下增加eslin-node配置~~
- ~~sand-build从express换成koa2~~
- ~~自动生成change log~~
- ~~sand-pc-staging依赖的sand-core优化~~

- sand-node-staging 微服务应用脚手架
- sand-bff-staging bff应用&微服务应用脚手架
- 解决sand-mystery的jest报错
- sand-docs脚手架支持，集成https://github.com/facebook/docusaurus
- sand-mob脚手架开发
- 完成images.zirupay.com图片上传管理

## 4. 提案
- sand-build支持type:bff,koa2构建分为两种构建dev和prod。执行start，dev模式揉合webpackDevMiddle中间件和webpackHotMiddle中间件,可以考虑sand-build提供方法，返回webpack配置，再在app.js使用webpackDevMiddle中间件和webpackHotMiddle中间件来启动web服务


sand-pc-staging 只支持history路由，默认的路由routerPrefix = '/spa' 可配置
sand-bff-staging 前端部分也只支持history路由，遇到127.0.0.1:8080/spa/* 将被路由至ssr  handler，如127.0.0.1:8080/api/* 路由至api handler


history
react-router-dom
react-router-config