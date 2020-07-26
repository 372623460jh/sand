# sand

sand-mob 脚手架。

@jianghe 每次脚手架修改完后，记得保持脚手架项目的干净，执行下 npm run clean 即可。

## 指令

npm run init: 删除 node_modules,dist，并重新安装，启动服务
npm run clean: 删除 node_modules,dist
npm run build: 构建
npm run start: 启动 mob 调试服务
npm run ci: lint&&test

## 目录结构

├── dist # 页面构建产物
│ ├── common.js # react,react-dom 相关资源
│ ├── vonder.js # 项目静态资源
│ ├── vonder.css # 页面 css 资源
│ └── index.html # index 页面
├── src
│ ├── assets # 额外资源
│ ├── common # 公共文件
│ │ ├── utils # 公共工具
│ │ └── fetch.js # 请求工具方法
│ ├── components # 通用组件
│ ├── entry # 入口文件
│ │ ├── index.html # 入口 html
│ │ ├── index.less # 入口 less
│ │ └── index.ts # 入口 ts
│ ├── pages # 页面
│ │ └── index # index 页面
│ │ │ ├── components # 页面组件
│ │ │ ├── config # 页面配置
│ │ │ ├── model # 页面 dva 模型
│ │ │ ├── service # 请求相关
│ │ │ ├── page # 页面
│ │ │ └── router-config.ts # 路由配置
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
├── jsconfig.json
└── package.json
