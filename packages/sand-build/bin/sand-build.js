#!/usr/bin/env node
const yParser = require('yargs-parser');
const chalk = require('chalk');
const signale = require('signale');
const path = require('path');

// 获取默认选项
function testDefault(obj) {
  return obj.default || obj;
}

// 读取项目跟目录下的配置
// eslint-disable-next-line
const { sandConfigs } = require(path.join(__dirname, './sandBuild.config.js'));

// father-build
const fatherBuild = testDefault(require('father-build'));

// 将命令行入参转化为对象
const args = yParser(process.argv.slice(2));

const cwd = process.cwd();

/**
 * build 命令
 */
function build() {
  for (let index = 0; index < sandConfigs.length; index++) {
    const config = sandConfigs[index];
    console.log('config', config);
    fatherBuild({
      cwd,
      watch: args.w || args.watch,
      buildArgs: config,
    }).catch(
      // eslint-disable-next-line no-loop-func
      (e) => {
        signale.error(e);
        process.exit(1);
      },
    );
  }
}

switch (args._[0]) {
  case 'build':
    build();
    break;
  default:
    console.error(chalk.red(`未知指令： ${args._[0]}`));
    process.exit(1);
}
