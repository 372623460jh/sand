# sand-bff v1.0.0 

## 1. TODO:
- eslint-node

### 目录
├── dist # 页面构建产物
│   ├── common.js # react,react-dom相关资源
│   ├── vonder.js # 项目静态资源
│   └── pages # 动态路由文件
│       └── index # index页面
│           ├── index.js # 页面资源
│           └── index.css # 页面css资源
├── server
│   ├── db # 数据库相关
│   ├── controllers # 控制器
│   ├── middleWare # 中间件
│   ├── model # 模型
│   ├── common # 公共文件
│   │   ├── utils # 公共工具
│   │   └── config # 公共配置
│   ├── view # mob相关
│   │   ├── error.ejs # 公共错误页
│   │   └── index.ejs # 入口页面模板
│   ├── test # 单测文件
│   └── app.js # bff入口文件
├── src
│   ├── assets # 额外资源
│   ├── components # 通用组件
│   ├── common # 公共文件
│   │   ├── utils # 公共工具
│   │   └── fetch.js # 请求工具方法
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
│   ├── test # 单测文件
│   └── styles # 公共样式
│       └── common.less # 公共样式


