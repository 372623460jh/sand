/* eslint-disable no-console */
const webpack = require('webpack');
const Koa = require('koa');
const cors = require('koa2-cors');
const chalk = require('chalk');
// webpack dev config
const getDevWebpackConfig = require('../config/devConfig');
// koa2 devMiddleware
const koaDevMiddleware = require('../../../middleware/devMiddleware');
// koa2 hotMiddleware
const koaHotMiddleware = require('../../../middleware/hotMiddleware');
// koa2 historyApiMiddleware
const historyApiFallback = require('../../../middleware/historyApiMiddleware');
const { getSandBuildConfig, getPath } = require('../../../utils');

/**
 * 启动应用 start命令env都是development
 * obj: {
 *    env: production/development
 *    type: pc/mob/demo
 *    sandbuildrcPath
 * }
 */
function startApp(obj) {
  console.log(chalk.green('[start] Webpack dev环境启动服务'));

  const { env, type, sandbuildrcPath = '' } = obj;

  // 动态读取sandbuildrc.js配置
  const opts = getSandBuildConfig(
    sandbuildrcPath || getPath(process.cwd(), './.sandbuildrc.js')
  );

  const { port = 9531, webpackOptions = {} } = opts;

  const { historyApiOpts = {} } = webpackOptions;

  const { enable = false } = historyApiOpts;

  // 创建koa2实例
  const app = new Koa();

  // webpackConfig
  const webpackConfig = getDevWebpackConfig({
    ...opts,
    env,
    type,
  });

  // 使用webpack处理webpack_dev_config
  const compiler = webpack(webpackConfig);

  // 是否启用中间件
  if (enable) {
    // 使用koa2 historyApiMiddleware来解决history路由的问题使所有get请求都请求到index.html除了/api/* 路由
    app.use(historyApiFallback(historyApiOpts));
  }

  // 解决hml update.json跨域的问题
  app.use(
    cors({
      // 允许*访问
      origin: () => '*',
      // 接受的请求类型
      allowMethods: ['GET', 'POST'],
      // 设置获取其他自定义字段
      exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
      // 指定本次预检请求的有效期，单位为秒。
      maxAge: 5,
      // 开启接收cookie 如果客户端设置了withCredentials（fetch设置了credentials: "include"）origin不能设置为*,支持跨域带cookie
      credentials: true,
      // 接受的header参数
      allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
    })
  );

  // 使用devMiddleware包装compiler
  app.use(
    koaDevMiddleware(compiler, {
      publicPath: '/', // webpack 中publicPath定义相同的内容
      logLevel: 'info', // 如何控制台显示error, waring success,silent 将不再出现，减少构建界面日志
      stats: {
        // 编译期间和之后显示的格式化统计信息选项
        // 颜色
        colors: true,
        // 添加 chunk 信息（设置为 `false` 能允许较少的冗长输出）
        chunks: false,
        // 添加资源信息
        assets: true,
        // 添加构建日期和构建时间信息
        builtAt: true,
        hash: true,
        version: true,
      },
      quiet: true,
      noInfo: true,
    })
  );

  // 使用hotMiddleware包装compiler
  app.use(koaHotMiddleware(compiler, {}));

  app.listen(port, () => {
    console.log(chalk.green(`[start] Listening at http://127.0.0.1:${port}\n`));
  });
}

module.exports = startApp;
