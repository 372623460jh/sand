## sand 的自测调试文件

sand 项目不需要依赖@jianghe/sand-core,因为@jianghe/sand-core build 时会创建软连，并且所有的依赖会安装到根目录 node_modules 里

### debug sand-core

sand-build 构建 sand-core 时会在根目录 node_modules 下创建软链接，所以想要调试 sand-core 只需要 sand-build 构建 sand-core 带上-w 参数，再在./debug/sand-pc-debug 项目中直接引入@jianghe/sand-core 即可

### debug sand-build

#### debug sand-build -t lib

执行./debug/sand-lib-debug/debug.js 会调用./packages/sand-build 的构建脚本

#### debug sand-build -t demo

执行./debug/sand-demo-debug/debug.js 会调用./packages/sand-build 的构建脚本

#### debug sand-build -t pc

执行./debug/sand-pc-debug/debug.js 会调用./packages/sand-build 的构建脚本

### debug sand-cli

#### debug copystaging

执行./debug/sand-cli-debug/debug.js 会调用 copy 方法把./staging/\*拷贝至./packages/sand-cli/staging

#### debug init

执行./debug/sand-cli-debug/debug.js 会调用 init 方法初始化脚手架
