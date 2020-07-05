<a name="1.2.2"></a>

## 1.2.2 (2020-07-05)

### Bug Fixes

- 修复 sand-cli 初始化 sand-lib 时拷贝 packages 目录下的 package.json 没有重命名的问题 ([88cb75f](https://github.com/372623460jh/sand/commit/88cb75f))
- 用 husky 替代 pre-commit 解决 commitlint 失效的问题 ([0929ccc](https://github.com/372623460jh/sand/commit/0929ccc))

### Features

- sand-bff 增加 session cookie 中间件 ([10426d0](https://github.com/372623460jh/sand/commit/10426d0))
- sand-bff 接口支持非对称加密,完善 sand-bff 项目启动时可以区分环境，并把该环境写到前端 ([05b0380](https://github.com/372623460jh/sand/commit/05b0380))
- sand-bff 支持 sso,通过 redis 解决 session 共享问题,解决重复登录问题,解决 sand-lint@1.0.3 的问题 ([3f31109](https://github.com/372623460jh/sand/commit/3f31109))
- 修改[@jianghe](https://github.com/jianghe)/sand-lint 支持 ts,commitlint,prettier,并且更合理的分类;[@jianghe](https://github.com/jianghe)/sand-build 支持 webpack ts 构建 ([5c85a86](https://github.com/372623460jh/sand/commit/5c85a86))
- 修改 sand 整体项目版本号至 1.2.0,原因是 sand-core 有一个老的 1.1.5 的废弃版本导致默认拉取新包时报错 ([5980821](https://github.com/372623460jh/sand/commit/5980821))
- 修改项目依赖,升级为最新版本 ([2c1e290](https://github.com/372623460jh/sand/commit/2c1e290))
- 修改项目依赖,升级为最新版本 ([9a70092](https://github.com/372623460jh/sand/commit/9a70092))
- 回归每一个脚手架,修复发现的问题,增加 phaser game ts 脚手架 ([c0fc01e](https://github.com/372623460jh/sand/commit/c0fc01e))
- 增加 prettier ([6611f74](https://github.com/372623460jh/sand/commit/6611f74))
- 完成应用的依赖升级 babal 升 7.10,eslint 升 7.2(7.3 有问题),css-loader less-loader 升为最新版本,并进行了回归 ([c371115](https://github.com/372623460jh/sand/commit/c371115))

<a name="1.0.0-7"></a>

# 1.0.0-7 (2020-07-05)

### Bug Fixes

- 修复 sand-cli 初始化 sand-lib 时拷贝 packages 目录下的 package.json 没有重命名的问题 ([88cb75f](https://github.com/372623460jh/sand/commit/88cb75f))
- 用 husky 替代 pre-commit 解决 commitlint 失效的问题 ([0929ccc](https://github.com/372623460jh/sand/commit/0929ccc))
- 提取 sand-noco 并在 sand-bff 中应用,sand-bff 应用增加登录弹窗 ([12e9a0a](https://github.com/372623460jh/sand/commit/12e9a0a))
- 将项目中的 pre-commit 替换成 husky 用来支持 commitlint ([7c256bd](https://github.com/372623460jh/sand/commit/7c256bd))

### Features

# 1.0.0-6 (2020-06-04)

### Bug Fixes

- 修复 sand-cli 初始化 sand-lib 时拷贝 packages 目录下的 package.json 没有重命名的问题 ([88cb75f](https://github.com/372623460jh/sand/commit/88cb75f))

### Features

- 完成 sand 文档的搭建,解决项目 prettier 和 eslint 的兼容问题 ([0aff922](https://github.com/372623460jh/sand/commit/0aff922))

<a name="1.0.0-5"></a>

# 1.0.0-5 (2020-06-03)

### Features

- sand-bff 增加 log4j 日志模块,编写日志中间件;基于 dumi 编写文档系统,给 sand-lib 脚手架增加文档目录,给 sand 增加文档目录,增加 sand-docs 脚手架 ([be71c39](https://github.com/372623460jh/sand/commit/be71c39))

<a name="1.0.0-4"></a>

# 1.0.0-4 (2020-06-01)

### Features

- history 中间件支持黑名单模式,bff 应用脚手架完善,pc 应用脚手架完善,增加公共 fetch 方法 ([2d36cd4](https://github.com/372623460jh/sand/commit/2d36cd4))

<a name="1.0.0-3"></a>

# 1.0.0-3 (2020-05-31)

### Features

- 完善优化[@jianghe](https://github.com/jianghe)/sand-core 路由部分的功能, ([d9f539f](https://github.com/372623460jh/sand/commit/d9f539f))

<a name="1.0.0-2"></a>

# 1.0.0-2 (2020-05-30)

### Features

- [@jianghe](https://github.com/jianghe)/sand-lint 增加 eslint-node, [@jianghe](https://github.com/jianghe)/sand-build 构建从服务从 express 切 koa2 ([c124462](https://github.com/372623460jh/sand/commit/c124462))
- CHANGELOG ([887340c](https://github.com/372623460jh/sand/commit/887340c))
- CHANGELOG ([779b1d1](https://github.com/372623460jh/sand/commit/779b1d1))
- 第一版 changelog ([a9198c0](https://github.com/372623460jh/sand/commit/a9198c0))

<a name="1.0.0-1"></a>

# 1.0.0-1 (2020-05-30)

### Features

- 20200422 ([12cb173](https://github.com/372623460jh/sand/commit/12cb173))
- 20200423 ([c33eb6e](https://github.com/372623460jh/sand/commit/c33eb6e))
- 20200425 ([c95eef1](https://github.com/372623460jh/sand/commit/c95eef1))
- 20200430 ([182e82d](https://github.com/372623460jh/sand/commit/182e82d))
- 20200430 ([7addab5](https://github.com/372623460jh/sand/commit/7addab5))
- 20200430test ([7646515](https://github.com/372623460jh/sand/commit/7646515))
- 20200501 ([3c52617](https://github.com/372623460jh/sand/commit/3c52617))
- 20200517 ([ffe44c5](https://github.com/372623460jh/sand/commit/ffe44c5))
- 20200518 ([8db9fc8](https://github.com/372623460jh/sand/commit/8db9fc8))
- 20200518 ([4f29898](https://github.com/372623460jh/sand/commit/4f29898))
- 20200522 ([7be556c](https://github.com/372623460jh/sand/commit/7be556c))
- sand 改用 sand-build 构建 ([bfdd07c](https://github.com/372623460jh/sand/commit/bfdd07c))
- sand-build 初始化 ([afb8a33](https://github.com/372623460jh/sand/commit/afb8a33))
- sand-cli 支持 pc 和 demo,升级 antd4.\*,优化代码,debug 编写 ([752f4ab](https://github.com/372623460jh/sand/commit/752f4ab))
- todo 调整 ([453be53](https://github.com/372623460jh/sand/commit/453be53))
- update config ([aa3741c](https://github.com/372623460jh/sand/commit/aa3741c))
- update config ([9bea04b](https://github.com/372623460jh/sand/commit/9bea04b))
- webpack 相关 ([1ac3e14](https://github.com/372623460jh/sand/commit/1ac3e14))
- 修改 jest 配置 ([1ed8990](https://github.com/372623460jh/sand/commit/1ed8990))
- 修改 package.json 配置 ([80dcb44](https://github.com/372623460jh/sand/commit/80dcb44))
- 修改 readme ([cdd9991](https://github.com/372623460jh/sand/commit/cdd9991))
- 修改推包配置 ([b64f0b8](https://github.com/372623460jh/sand/commit/b64f0b8))
- 增加 bff 脚手架 ([94b4a9c](https://github.com/372623460jh/sand/commit/94b4a9c))
- 增加 jest ([f38c973](https://github.com/372623460jh/sand/commit/f38c973))
- 增加 jest,编写 getSandBuildConfig 的单侧用例,后续逐步补齐单侧 ([ea4b1ac](https://github.com/372623460jh/sand/commit/ea4b1ac))
- 增加 jest,编写 getSandBuildConfig 的单测用例,后续逐步补齐单测 ([47f00ac](https://github.com/372623460jh/sand/commit/47f00ac))
- 增加 sand-build 和 sand-core 测试代码,优化整体项目结构代码 ([1c11fe0](https://github.com/372623460jh/sand/commit/1c11fe0))
- 增加 sand-core,修改项目整体依赖,增加 sand-pc-staging ([2690549](https://github.com/372623460jh/sand/commit/2690549))
- 增加 sand-lint 模块 ([69be709](https://github.com/372623460jh/sand/commit/69be709))
- 增加 todolist ([94e32bb](https://github.com/372623460jh/sand/commit/94e32bb))
- 增加规划 ([736d710](https://github.com/372623460jh/sand/commit/736d710))
- 增加规划 ([2eafc0e](https://github.com/372623460jh/sand/commit/2eafc0e))
- 完善 sand-bff 应用 ([4b17bcd](https://github.com/372623460jh/sand/commit/4b17bcd))
- 完善 sand-build 的功能,支持 lib,demo development/production 的构建 ([5f87ebd](https://github.com/372623460jh/sand/commit/5f87ebd))
- 完成 sand-cli 的开发,支持 sand-lib-staging ([bdeb4e3](https://github.com/372623460jh/sand/commit/bdeb4e3))
- 文档修改和 rollup 支持 babel 替换 ([ded20ab](https://github.com/372623460jh/sand/commit/ded20ab))
- 梳理 sand-bff 应用目录结构 ([a362b92](https://github.com/372623460jh/sand/commit/a362b92))
- 添加 mystery 功能 ([4e2b31a](https://github.com/372623460jh/sand/commit/4e2b31a))
- 给每一个脚手架增加 jest 和单测用例 ([4b0e312](https://github.com/372623460jh/sand/commit/4b0e312))
