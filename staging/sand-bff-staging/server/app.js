/**
 * 项目入口
 */
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
// 加载控制器的中间件返回koa_router.routes对象
const ctrMiddleware = require('./middleware/controllerMiddleware');
// cors中间件
const { getCors } = require('./middleware/corsMiddleware');
// 控制器日志输出中间件
const ctrLogMiddleware = require('./middleware/ctrLogMiddleware');
// 模版引擎中间件用于ssr前端spa页面
const viewMiddleware = require('./middleware/viewMiddleware');
// 登录模块中间件
const authMiddleware = require('./middleware/authMiddleware');
// 控制台日志
const { defaultLog } = require('./common/utils/log');
// 登录中间件白名单配置
const { authWhiteList, initNowEnvConst } = require('./common/utils/env');

// 初始化当前环境信息
const { PORT } = initNowEnvConst();

// 实例化
const app = new Koa();

// cors中间件
app.use(cors(getCors()));

// 配置模版引擎中间件,这样配置不修改html后缀
app.use(viewMiddleware());

// bodyParser将formdata解析为json
app.use(bodyParser());

// controller日志输出中间件
app.use(ctrLogMiddleware());

// 登录模块中间件
app.use(authMiddleware(authWhiteList));

// 加载controller中间件
app.use(ctrMiddleware());

// listen
app.listen(PORT);

defaultLog.info(`sand-bff监听 http://127.0.0.1:${PORT}`);
