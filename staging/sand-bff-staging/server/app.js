/**
 * 项目入口
 */
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const views = require('koa-views');
const path = require('path');
const { serverConfig } = require('./common/config/serverConf');
// 加载控制器的中间件返回koa_router.routes对象
const controllerMiddleWare = require('./middleWare/controllerMiddleWare');
const { getCors } = require('./middleWare/corsMiddleWare');

// 端口
const { port } = serverConfig;

// 实例化
const app = new Koa();

// cors配置
app.use(cors(getCors()));

// 配置模版引擎中间件,这样配置不修改html后缀
app.use(views(
  path.resolve(__dirname, './views'), // 设置视图根目录
  {
    map: {
      html: 'ejs', // 模板为ejs
    },
  },
));

// bodyParser 将formdata解析为json
app.use(bodyParser());

// 加载controller
app.use(controllerMiddleWare());

// listen
app.listen(port);

console.log(`在${port}监听`);
