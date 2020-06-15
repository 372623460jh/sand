// 将formdata转json
const bodyParser = require('koa-bodyparser');
const getKoaInstance = require('./utils/koaInstance');
const errorHandlerMiddleware = require('./middleware/errorHandlerMiddleware');
const loggerMiddleware = require('./middleware/loggerMiddleware');
const viewsMiddleware = require('./middleware/viewsMiddleware');
const corsMiddleware = require('./middleware/corsMiddleware');
const Controller = require('./controller/Controller');
const routerMiddleware = require('./middleware/routerMiddleware');
const controllerMiddleware = require('./middleware/controllerMiddleware');

/**
 * koa实例
 */
const app = getKoaInstance();

/**
 * bodyParser将formdata解析为json
 */
app.use(bodyParser());

module.exports = {
  /**
   * koa实例
   */
  app,

  /**
   * 通用的日志中间件
   */
  loggerMiddleware,

  /**
   * 模版引擎中间件
   */
  viewsMiddleware,

  /**
   * cors中间件
   */
  corsMiddleware,

  /**
   * 路由中间件
   */
  routerMiddleware,

  /**
   * 控制器中间件
   */
  controllerMiddleware,

  /**
   * 兜底的错误处理中间件，最先加载
   */
  errorHandlerMiddleware,

  /**
   * Controller父类
   */
  Controller,
};
