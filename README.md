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
- ~~history中间件支持黑名单模式，只有某个路由下的才302到index.html~~
- ~~sand-bff-staging bff应用&微服务应用脚手架~~
- ~~sand-bff-staging log~~
- ~~基于dumi对文档进行支持~~

- 所有项目依赖升级为最新版本，eslint升7。
- sand-utils组件库，提供像fetch之类的方法
- 解决sand-mystery的jest报错
- 学习dumi源码，sand原生支持
- 完成images.zirupay.com图片上传管理
- ts学习，sand全部ts化
- docker学习，服务器容器化

## 4. 提案
- sand-mob脚手架开发
- sand-bff-staging node-schedule 处理定时任务
- sand-node-staging 微服务应用脚手架，只提供服务
- sand-build支持type:bff,koa2构建分为两种构建dev和prod。执行start，dev模式揉合webpackDevMiddle中间件和webpackHotMiddle中间件,可以考虑sand-build提供方法，返回webpack配置，再在app.js使用webpackDevMiddle中间件和webpackHotMiddle中间件来启动web服务
