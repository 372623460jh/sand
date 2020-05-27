# sand
sand-pc脚手架。

@jianghe 每次脚手架修改完后，记得保持脚手架项目的干净，执行下npm run clean即可。

## 指令
npm run init: 删除node_modules,dist，并重新安装，启动服务
npm run clean: 删除node_modules,dist
npm run build: 构建
npm run start: 启动pc调试服务
npm run ci: lint&&test

## 目录结构
├── dist # 页面构建产物
│   ├── common.js # react,react-dom相关资源
│   ├── vonder.js # 项目静态资源
│   └── pages # 动态路由文件
│       └── index # index页面
│           ├── index.js # 页面资源
│           └── index.css # 页面css资源
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
