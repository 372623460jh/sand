/**
 * 项目入口
 */
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const { serverConfig } = require('./config/serverConf');
// 加载控制器的中间件返回koa_router.routes对象
const cmw = require('./middleWare/controllerMiddleWare');
const { getCors } = require('./middleWare/cors');

// 端口
const { port } = serverConfig;

// 实例化
const app = new Koa();

// cors配置
app.use(getCors());

// bodyParser 将formdata解析为json
app.use(bodyParser());

// controller
app.use(cmw(`${__dirname}/controller`));

// listen
app.listen(port);

console.log(`在${port}监听`);
