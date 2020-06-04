/* eslint-disable no-console */
const chalk = require('chalk');
const Mystery = require('../src/pojo/Mystery');

/**
 * 解密指令回调
 */
async function decrypt(filePath, outputFilePath, mainKey, subKey, options) {
  console.log(chalk.green('解密中...'));
  // 输入文件路径
  console.log(chalk.green(`输入文件路径：${filePath}`));
  // 输出文件夹路径
  console.log(chalk.green(`输出文件夹路径：${outputFilePath}`));

  // 子命令中的签名名字
  const name = typeof options.name === 'string' ? options.name : '';
  if (name) {
    console.log(chalk.green(`子命令中的签名：${name}`));
  }

  if (!filePath || !outputFilePath || !mainKey || !subKey) {
    console.log(chalk.red('入参有误'));
  } else {
    // 解密
    new Mystery().decrypt(filePath, outputFilePath, mainKey, subKey);
  }
}

module.exports = decrypt;
