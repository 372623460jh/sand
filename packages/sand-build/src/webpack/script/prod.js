/* eslint-disable no-console */
const webpack = require('webpack');
const chalk = require('chalk');
const getProdWebpackConfig = require('../config/prodConfig');
const { getPath, logError } = require('../../utils');
const { getSandBuildConfig } = require('../../common/stdConfig');
const { buildConfigFileName } = require('../../constant');

/**
 * 启动应用 build命令都是env都是production
 * obj: {
 *    env: production/development
 *    type: webpack/demo
 *    sandbuildrcPath
 * }
 */
function buildApp(obj) {
  console.log(chalk.green('[build] sand-build pro环境，开始编译，构建。'));

  const { env, type, sandbuildrcPath = '' } = obj;

  // 动态读取sandbuildrc.js配置
  const opts = getSandBuildConfig(
    sandbuildrcPath || getPath(process.cwd(), `./.${buildConfigFileName}.js`)
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
      logError('[build] sand-build 编译失败。');
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
      console.log(chalk.green('\n[build] sand-build 编译成功。'));
      process.exit(0);
    }
  }

  // compiler 报错 hook
  compiler.hooks.failed.tap('failed', (err) => {
    logError(`compiler报错:${err}`);
    process.exit(0);
  });

  // 执行编译
  compiler.run(callBack);
}

module.exports = buildApp;
