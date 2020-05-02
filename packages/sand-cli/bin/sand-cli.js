#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');

const init = require('../commands/init');
const pkg = require('../package.json');

program
  .version(`${pkg.version}`, '-v, --version');

// sand-cli init 命令
program
  .command('init')
  .description('`sand-cli init` 用于初始化不同类型的项目脚手架。')
  .action(init); // 命中指令后指令init回调

// eslint-disable-next-line no-console
console.log(chalk.green(`${pkg.name}:  ${pkg.version}`));

program.parse(process.argv);
