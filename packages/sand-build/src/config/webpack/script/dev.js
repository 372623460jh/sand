/* eslint-disable no-console */
const webpack = require('webpack');
const webpackDevMiddle = require('webpack-dev-middleware');
const apiFallback = require('connect-history-api-fallback')();
const webpackHotMiddle = require('webpack-hot-middleware');
const express = require('express');
// webpack dev config
const chalk = require('chalk');
const getDevWebpackConfig = require('../config/devConfig');
const { getDefault, getPath } = require('../../../utils');

/**
 * 启动应用
 * obj: {
 *    env: prod/dev
 *    type: pc/mob/demo
 * }
 */
function startApp(obj) {
  console.log(chalk.green('[start] Webpack dev环境启动服务'));

  const { env, type, sandbuildrcPath = '' } = obj;
  // 动态读取sandbuildrc.js配置
  const opts = getDefault(
    // eslint-disable-next-line
    require(sandbuildrcPath || getPath(process.cwd(), './.sandbuildrc.js')),
  );
  const { port = 9531 } = opts;

  // 使用webpack处理webpack_dev_config
  const compiler = webpack(getDevWebpackConfig({
    ...opts,
    env,
    type,
  }));

  // 创建express实例
  const app = express();
  // 使用webpack-dev-middleware包装compiler
  const devMiddleware = webpackDevMiddle(compiler, {
    publicPath: '/', // webpack 中publicPath定义相同的内容
    logLevel: 'info', // 如何控制台显示error, waring success,silent 将不再出现，减少构建界面日志
    stats: { // 编译期间和之后显示的格式化统计信息选项
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
  });
  // 使用webpack-hot-middleware包装compiler
  const hotMiddleware = webpackHotMiddle(compiler, {});
  // 使用connect-history-api-fallback中间件
  app.use(apiFallback);
  app.use(devMiddleware);
  app.use(hotMiddleware);

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`[start] Listening at http://127.0.0.1:${port}\n`);
  });
}

module.exports = startApp;
