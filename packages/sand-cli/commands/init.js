const inquirer = require('inquirer');
const emptyDir = require('empty-dir');
const chalk = require('chalk');

/**
 * 创建sand-lib脚手架的方法
 */
const createLib = require('../utils/createLib');

/**
 * init 指令的回调方法
 */
async function init() {
  // 获取当前执行指令时的目录
  const targetPath = process.cwd();

  if (!emptyDir.sync(targetPath)) {
    // 当前目录不为空
    // eslint-disable-next-line no-console
    console.log(chalk.red('当前目录不为空,请更换目录'));
    return;
  }

  // 用户自主选择
  const { type } = await inquirer.prompt([{
    type: 'list',
    name: 'type',
    default: 'lib',
    message: '请选择将要创建的项目类型:',
    choices: [
      'sand-lib',
      'sand-pc',
      'sand-mob',
    ],
  }]);

  switch (type) {
    case 'sand-lib': {
      // 选择库项目脚手架
      createLib();
      break;
    }
    case 'sand-mob': {
      // eslint-disable-next-line no-console
      console.log(chalk.red('暂未开发sand-mob，请选择其他项目'));
      break;
    }
    case 'sand-pc': {
      // eslint-disable-next-line no-console
      console.log(chalk.red('暂未开发sand-pc，请选择其他项目'));
      break;
    }
    default: {
      // eslint-disable-next-line no-console
      console.log(chalk.red('暂未开发，请选择其他项目'));
    }
  }
}

module.exports = init;
