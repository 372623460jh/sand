## 命令行参数
### build
type === lib时env，link，watch参数才生效
type === pc/mob/demo时env，link，watch参数不生效
- --type 构建类型 pc/mob/lib/demo必填
- --env 环境，传prod时会进行umd构建
- --link 构建完成后在根目录下的node_modules下创建软链接链接到构建产物方便调试
- --watch 开启监听

### start
start使用webpack启动服务，只有mob||pc||demo有start模式，start没有env参数，都是env===dev
- --type 构建类型 pc/mob/demo必填

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

{
  // 服务启动端口
  port: 9538,
  // webpack补充配置
  webpackOptions: {
    // 入口html（必填）
    entryHtml: '',
    // 入口文件（必填）
    entry: '',
    // 项目跟目录（非必填，默认process.cwd()）
    basePath: '',
    // bable配置用于替换内置babel配置（非必填，默认：内置babel配置）
    babelConfig: {},
    // webpack要扩展的其他rules（非必填，默认：[]）
    otherRules: [
      {
        test,
        use,
      }
    ],
    // 别名,非必填
    alias: {},
  }
  // rollup 配置
  // 用于生成依赖文件,会用作rollup external 判断在deps中的库不会被打入包中
  // 读取版本号
  configurations: [
    {
      // 入口文件，绝对路径
      entry: '',
      // 需要构建库的入口文件，绝对路径./packages/包名
      pkgPath: '',
      // 构建出来的文件名,必填
      bundleName: 'module1'
      // 是否是ts,默认false
      // ts会去加载 ${pkgPath}/tsconfig.json
      isTs: false,
      // 是否单独提取css文件，默认是false
      cssExtract: false,
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
      // sand-build umd构建时默认会将peerDependencies中的依赖添加到umdGlobals中，不打进bundle包中
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
    },
  ]
}

export default configurations;
```