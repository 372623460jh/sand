### 调试 @jianghe/sand-build 库时.

文档：https://sand.zirupay.com/

由于 lerna 安装是将依赖安装至/packages/sand-build 目录下，导致在项目根目录下执行 sand-build 找不到依赖，可以将 sand-build 下的依赖在根目录中安装一遍，来解决这个问题,或者使用 lerna bootstrap --hoist 来提升依赖的安装位置。使用 npm 方式安装 sand-build 工具没有此问题。

### 调试方式

```
node ./packages/sand-build/bin/sand-build.js build --env production --watch --link
```
