/* eslint-disable no-console */
const webpack = require('webpack');
const chalk = require('chalk');
const { logError } = require('../../../utils');
const getProdWebpackConfig = require('../config/prodConfig');
const { getPath, getSandBuildConfig } = require('../../../utils');

/**
 * 启动应用 build命令都是env都是production
 * obj: {
 *    env: production/development
 *    type: pc/mob/demo
 *    sandbuildrcPath
 * }
 */
function buildApp(obj) {
  console.log(chalk.green('[build] Webpack pro环境，开始编译，构建。'));

  const { env, type, sandbuildrcPath = '' } = obj;

  // 动态读取sandbuildrc.js配置
  const opts = getSandBuildConfig(
    sandbuildrcPath || getPath(process.cwd(), './.sandbuildrc.js')
  );

  // 使用webpack处理webpack_dev_config
  const compiler = webpack(
    getProdWebpackConfig({
      ...opts,
      env,
      type,
    })
  );

  // 编译回调方法
  function callBack(err, stats) {
    if (err) {
      logError('[build] Webpack 编译失败。');
      process.exit(1);
    } else {
      // spinner.stop()
      process.stdout.write(
        stats.toString({
          colors: true,
          modules: false,
          children: false,
          chunks: false,
          chunkModules: false,
          hash: false,
          version: false,
        })
      );
      console.log(chalk.green('[build] Webpack 编译成功，详细看/dist目录。'));
      process.exit(0);
    }
  }

  // 执行编译
  compiler.run(callBack);
}

module.exports = buildApp;
