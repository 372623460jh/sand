#!/usr/bin/env node

const chalk = require('chalk');
const program = require('commander');
const { start, build } = require('../src/index');
const pkg = require('../package.json');

// 版本号指令
program.version(`${pkg.version}`, '-v, --version');

// sand-build build 命令
program
  .command('build')
  .description('sand-build build --watch --link --env <env>')
  // build的子命令
  .option('-w, --watch', '开启监听')
  .option('-t, --type <type>', '构建类型（lib||mob||pc||demo）')
  .option('-e, --env <env>', '构建方式（production||development')
  .option(
    '-l, --link',
    '构建完成后在根目录下的node_modules下创建软链接链接到构建产物方便调试'
  )
  .action(build); // 命中指令后指令build回调

// sand-build start 命令
program
  .command('start')
  .description('sand-build start --type <type>')
  // build的子命令
  .option('-t, --type <type>', '构建类型（mob||pc||demo）')
  .action(start); // 命中指令后指令build回调

// eslint-disable-next-line no-console
console.log(chalk.green(`${pkg.name}:  ${pkg.version}`));

program.parse(process.argv);
