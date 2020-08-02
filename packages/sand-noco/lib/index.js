// 将formdata转json
const bodyParser = require('koa-bodyparser');
const getKoaInstance = require('./utils/koaInstance');

/**
 * koa实例
 */
const app = getKoaInstance();

/**
 * bodyParser将formdata解析为json
 */
app.use(bodyParser());

/**
 * koa实例
 */
exports.app = app;

/**
 * 通用的日志中间件
 */
exports.loggerMiddleware = require('./middleware/loggerMiddleware');

/**
 * 模版引擎中间件
 */
exports.viewsMiddleware = require('./middleware/viewsMiddleware');

/**
 * cors中间件
 */
exports.corsMiddleware = require('./middleware/corsMiddleware');

/**
 * 路由中间件
 */
exports.routerMiddleware = require('./middleware/routerMiddleware');

/**
 * 控制器中间件
 */
exports.controllerMiddleware = require('./middleware/controllerMiddleware');

/**
 * 兜底的错误处理中间件，最先加载
 */
exports.errorHandlerMiddleware = require('./middleware/errorHandlerMiddleware');

/**
 * Controller父类
 */
exports.Controller = require('./controller/Controller');
