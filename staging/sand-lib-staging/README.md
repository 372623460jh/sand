# sand

sand-lib 脚手架。

@jianghe 每次脚手架修改完后，记得保持脚手架项目的干净，执行下 npm run clean 即可。

## 指令

npm run init: 删除 node_modules,和 lib 的构建产物，并重新安装，构建
npm run clean: 删除 node_modules,和 lib 的构建产物
npm run build: 构建
npm run build:watch: 构建(监听)
npm run build:production: 构建(生产环境)
npm run start: 启动 lib 调试服务
npm run publish: 推包到 npm
npm run ci: lint&&test
