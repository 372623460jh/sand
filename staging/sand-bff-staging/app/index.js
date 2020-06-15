const {
  // koa实例
  app,
  // 加载控制器中间件
  controllerMiddleware,
  // cors中间件
  corsMiddleware,
  // 日志中间件
  loggerMiddleware,
  // 路由中间件
  routerMiddleware,
  // 模版引擎中间件 用于ssr前端spa页面
  viewsMiddleware,
  // 兜底的错误处理中间件
  errorHandlerMiddleware,
} = require('@jianghe/sand-noco');
// 登录模块中间件
const authMiddleware = require('./middleware/authMiddleware');
// cors中间件
const { getCors } = require('./common/utils/cors');
// 获取绝对路径
const { getPath } = require('./common/utils/base');
// 登录中间件白名单配置
const { authWhiteList, initNowEnvConst } = require('./common/utils/env');

// 初始化当前环境信息
const { PORT } = initNowEnvConst();

// 通用的日志中间件
app.use(loggerMiddleware(getPath(__dirname, '../logs')));

// 兜底的错误处理中间件
app.use(errorHandlerMiddleware());

// cors中间件
app.use(corsMiddleware(getCors()));

// 配置模版引擎中间件,这样配置不修改html后缀
app.use(viewsMiddleware(getPath(__dirname, './views')));

// 登录模块中间件
app.use(authMiddleware(authWhiteList));

// 加载controller中间件
app.use(controllerMiddleware(getPath(__dirname, './controller')));

// router中间件
app.use(routerMiddleware(getPath(__dirname, './router/index.js')));

// listen
app.listen(PORT);

console.log(`sand-bff监听 http://127.0.0.1:${PORT}`);
