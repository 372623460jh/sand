# sand-bff v1.0.0 

## 1. TODO:
- ~~eslint-node 纯node基于airbnb-base， bff应用基于sand-lint/react~~
- ~~sand-core/react-dom 对外透出react-dom/server~~

### start命令
1. 对sand-pc执行start -watch 在/下生成监听的构建产物
2. 执行./server/app.js
3. .sandbuildrc.js中无需配置port

### build命令
1. 对sand-pc执行build 在./dist下生成构建产物
3. 这样可以直接将./dist,./server,./node_module拷贝至服务器，直接pm2运行./server/app.js即可

### 方案
最终确定的方案
- sand-pc和sand-bff各自独立分开部署
- 当sand-bff命中某个路由后会根据环境ssr出index.html模板，该模板中根据环境判断了前端需要加载的资源地址，以及publicPath的地址，以及一些其他的应用相关的参数
  - sand-bff start是设置node-env=development build时设置node-env=production
- sand-pc开发过程中可以根据start命令自己启动资源服务，这样sand-bff可以访问到对应服务
  - sand-pc生产环境时执行build命令生成dist文件夹，该文件夹中的文件可以扔到服务器自启服务或者扔到CDN，这样sand-bff也可以访问到

### 目录
- dist目录是构建产物目录
- server是bff项目目录
- src是sand-pc项目目录

├── dist # 页面构建产物
│   ├── common.js # react,react-dom相关资源
│   ├── vonder.js # 项目静态资源
│   └── pages # 动态路由文件
│       └── index # index页面
│           ├── index.js # 页面资源
│           └── index.css # 页面css资源
├── server
│   ├── common # 公共文件
│   │   ├── utils # 公共工具
│   │   └── config # 公共配置
│   ├── controllers # 控制器
│   ├── db # 数据库相关
│   ├── middleware # 中间件
│   ├── model # 模型
│   ├── test # 单测文件
│   ├── view # ejs模板
│   └── app.js # bff入口文件
├── src
│   ├── assets # 额外资源
│   ├── common # 公共文件
│   │   ├── utils # 公共工具
│   │   └── fetch.js # 请求工具方法
│   ├── components # 通用组件
│   ├── entry # 入口文件
│   │   ├── index.html # 入口html
│   │   ├── index.less # 入口less
│   │   └── index.jsx # 入口jsx
│   ├── layout # 布局文件
│   ├── pages # 页面
│   │   └── index # index页面
│   │   │   ├── components # 页面组件
│   │   │   ├── config # 页面配置
│   │   │   ├── model # 页面dva模型
│   │   │   ├── service # 请求相关
│   │   │   ├── page # 页面
│   │   │   └── router-config.js # 路由配置
│   ├── styles # 公共样式
│   │   └── common.less # 公共样式
│   └── test # 单测文件
├── .editorConfig # 编辑器区域配置
├── .eslintignore # eslint忽略
├── .eslintrc.js # eslint配置
├── .gitignore # git忽略
├── .prettierrc.js # 代码样式优化
├── .sandbuildrc.js # sand-build构建配置
├── .stylelintignore # stylelint忽略
├── .stylelintrc.js # stylelint配置
├── babel.config.js # jest babel对应的配置
├── commitlint.config.js # git commit校验配置
├── jest.config.js # jest配置
├── jsconfig.js
└── package.json
