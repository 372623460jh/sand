# sand-bff v1.0.0

## 依赖

1. 开发环境依赖于 nodemon，需先 npm i nodemon -g
1. 生产环境依赖于 pm2，需先 npm i pm2 -g

## 1. TODO:

- ~~eslint-node 纯 node 基于 airbnb-base， bff 应用基于 sand-lint/react~~
- ~~sand-core/react-dom 对外透出 react-dom/server~~

### start 命令

1. 对 sand-pc 执行 start -watch 在/下生成监听的构建产物
2. 执行./app/index.js
3. .sandbuildrc.js 中无需配置 port

### build 命令

1. 对 sand-pc 执行 build 在./dist 下生成构建产物

### 关于调试部署

1. 开发环境调试直接执行 npm run start 即可
2. 单独启动前端资源服务 npm run dev:pc
3. 单独启动 node 服务 npm run start:bff
4. 生产环境前端资源构建 npm run build:bc
5. 生成环境建议用 pm2,执行 npm run prod:bff 相当于执行 pm2 start ecosystem.config.js --env production 根据配置启动 pm2

### 方案

最终确定的方案

- sand-pc 和 sand-bff 各自独立分开部署
- 当 sand-bff 命中某个路由后会根据环境 ssr 出 index.html 模板，该模板中根据环境判断了前端需要加载的资源地址，以及 publicPath 的地址，以及一些其他的应用相关的参数
  - sand-bff start 是设置 node-env=development build 时设置 node-env=production
- sand-pc 开发过程中可以根据 start 命令自己启动资源服务，这样 sand-bff 可以访问到对应服务
  - sand-pc 生产环境时执行 build 命令生成 dist 文件夹，该文件夹中的文件可以扔到服务器自启服务或者扔到 CDN，这样 sand-bff 也可以访问到

### 目录

- dist 目录是构建产物目录
- server 是 bff 项目目录
- src 是 sand-pc 项目目录

├── dist # 页面构建产物
│ ├── common.js # react,react-dom 相关资源
│ ├── vonder.js # 项目静态资源
│ ├── pages # 动态路由文件
│ ├── index.html # index 页面
│ ├── index.js # 页面资源
│ └── index.css # 页面 css 资源
├── app
│ ├── controller # 控制器
│ ├── db # 数据库
│ ├── middleware # 中间件
│ ├── model # 领域模型
│ ├── view # ejs 模板
│ ├── assets # 静态资源
│ ├── schedule # 定时任务
│ ├── service # 业务逻辑
│ ├── router # 路由配置
│ │ └── index.js
│ ├── common # 公共文件
│ │ ├── utils # 公共工具
│ │ ├── error # 错误码
│ │ └── config # 公共配置
│ ├── test # 单测文件
│ └── index.js # bff 入口文件
├── src
│ ├── assets # 额外资源
│ ├── common # 公共文件
│ │ ├── utils # 公共工具
│ │ └── fetch.js # 请求工具方法
│ ├── components # 通用组件
│ ├── entry # 入口文件
│ │ ├── index.html # 入口 html
│ │ ├── index.less # 入口 less
│ │ └── index.jsx # 入口 jsx
│ ├── layout # 布局文件
│ ├── pages # 页面
│ │ └── index # index 页面
│ │ │ ├── components # 页面组件
│ │ │ ├── config # 页面配置
│ │ │ ├── model # 页面 dva 模型
│ │ │ ├── service # 请求相关
│ │ │ ├── page # 页面
│ │ │ └── router-config.js # 路由配置
│ ├── styles # 公共样式
│ │ └── common.less # 公共样式
│ └── test # 单测文件
├── .editorConfig # 编辑器区域配置
├── .eslintignore # eslint 忽略
├── .eslintrc.js # eslint 配置
├── .gitignore # git 忽略
├── .sandbuildrc.js # sand-build 构建配置
├── .stylelintignore # stylelint 忽略
├── .stylelintrc.js # stylelint 配置
├── babel.config.js # jest babel 对应的配置
├── commitlint.config.js # git commit 校验配置
├── jest.config.js # jest 配置
├── ecosystem.config # pm2 启动配置文件
├── jsconfig.js
└── package.json
