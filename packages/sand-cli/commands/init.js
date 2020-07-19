/* eslint-disable no-console */
const inquirer = require('inquirer');
const emptyDir = require('empty-dir');
const chalk = require('chalk');
const { stagingEnum } = require('../config/constants');
/**
 * 创建sand-lib脚手架的方法
 */
const createStaging = require('../utils/createStaging');

/**
 * init 指令的回调方法
 */
async function init() {
  // 获取当前执行指令时的目录;
  const targetPath = process.cwd();

  if (!emptyDir.sync(targetPath)) {
    // 当前目录不为空
    console.log(chalk.yellow('当前目录不为空,建议请更换目录'));
    // return;
  }

  // 用户自主选择
  const { type } = await inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      default: 'lib',
      message: '请选择要初始化的项目类型:',
      choices: Object.keys(stagingEnum),
    },
  ]);

  switch (type) {
    case 'sand-pc':
    case 'sand-demo':
    case 'sand-demo-ts':
    case 'sand-lib':
    case 'sand-bff':
    case 'sand-docs':
    case 'sand-game-phaser-ts':
      // 选择项目脚手架
      createStaging({ type: stagingEnum[type].name });
      break;
    case 'sand-mob':
      // eslint-disable-next-line no-console
      console.log(chalk.red('暂未开发sand-mob，请选择其他项目'));
      break;
    default:
      // eslint-disable-next-line no-console
      console.log(chalk.red('暂未开发，请选择其他项目'));
  }
}

module.exports = init;
