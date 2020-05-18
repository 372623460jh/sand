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

## 3. TODO:
- ~~rollup支持babel扩展~~
- ~~使用jtest来支持ci命令~~
- sand-pc-staging依赖的sand-core优化
- 支持react嵌入markdown
- sand-docs脚手架开发
- sand-mob脚手架开发
