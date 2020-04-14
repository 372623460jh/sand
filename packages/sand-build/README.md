### 命令行参数
- --env 环境，传prod时会进行umd构建
- --link 构建完成后在根目录下的node_modules下创建软链接链接到构建产物方便调试
- --watch 开启监听

### 调试sand-build库时
由于lerna安装是将依赖安装至/packages/sand-build目录下，导致在项目根目录下执行sand-build找不到依赖，可以将sand-build下的依赖在根目录中安装一遍，来解决这个问题,或者使用lerna bootstrap --hoist来提升依赖的安装位置。使用npm方式安装sand-build工具没有此问题。

### 调试方式
```
node ./packages/sand-build/bin/sand-build.js build --env prod --watch --link
```

### 一个完整的.sandbuildrc.js配置
```
import factory from './config/rollup';
import lib1 from './packages/lib1/package.json';
import path from 'path'

const configurations = [
  ...factory({
    // 需要构建的包的文件名
    // 只能对应./packages/${pathName}/src/index.js或index.ts
    // 具体加载index.js还是index.ts由isTs参数决定,必填
    pathName: 'lib1',
    // 构建出来的文件名,必填
    pkgName: 'module1'
    // 要构建的包的package.json ,必填
    // 用于生成依赖文件,会用作rollup external 判断在deps中的库不会被打入包中
    // 读取版本号
    pkg: lib1,
    // 是否是ts,默认false
    // ts会去加载./packages/${pkgName}/tsconfig.json
    isTs: false,
    // 别名,内置了@ -> src的别名
    // model -> ./packages/lib1/src/model/index.js
    alias: [
      {
        find: 'model', 
        replacement: path.resolve(__dirname, './packages/lib1/src/model/index.js')
      }
    ]
    // 全局模块，例如告诉Rollup jQuery 模块的id等同于 $ 变量最后生成umd代码时会是
    // var MyBundle = (function ($) {
    // }(window.jQuery));
    // umd打包时不需要将底线库,jquery打包
    umdGlobals: {
      'lodash': '_',
      'jQuery': '$',
    },
    // cjs的模块在umd打包时需要手动声明名称例如：
    // esrever是一个node模块在esm中使用
    // import { reverse } from 'esrever'; 
    // 在umd打包时会报错需要手动声明'esrever': ['reverse'],
    namedExports: {
      'esrever': ['reverse'],
      'react-dom': ['findDOMNode'],
      'react-dom/server': ['renderToStaticMarkup'],
    },
  }),
]

export default configurations;
```