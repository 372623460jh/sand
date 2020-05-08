## sand的自测调试文件
sand项目不需要依赖@jianghe/sand-core,因为@jianghe/sand-core build时会创建软连，并且所有的依赖会安装到根目录node_modules里

### debug sand-core
sand-build构建sand-core时会在根目录node_modules下创建软链接，所以想要调试sand-core只需要sand-build构建sand-core带上-w参数，再在./debug/sand-pc-debug项目中直接引入@jianghe/sand-core即可

### debug sand-build

#### debug sand-build -t lib
执行./debug/sand-lib-debug/debug.js会调用./packages/sand-build的构建脚本

#### debug sand-build -t demo
执行./debug/sand-demo-debug/debug.js会调用./packages/sand-build的构建脚本

#### debug sand-build -t pc
执行./debug/sand-pc-debug/debug.js会调用./packages/sand-build的构建脚本
