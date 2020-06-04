/* eslint-disable no-console */
const chalk = require('chalk');
const Mystery = require('../src/pojo/Mystery');

/**
 * 加密指令回调
 */
async function encrypt(picPath, filePath, outputPath, mainKey, options) {
  console.log(chalk.green('加密中...'));
  // 输入图片路径
  console.log(chalk.green(`输入图片路径：${picPath}`));
  // 输入文件路径
  console.log(chalk.green(`输入文件路径：${filePath}`));
  // 输出路径
  console.log(chalk.green(`输出路径：${outputPath}`));
  // 子命令中的签名名字
  const name = typeof options.name === 'string' ? options.name : '';
  if (name) {
    console.log(chalk.green(`子命令中的签名：${name}`));
  }

  if (!picPath || !filePath || !outputPath || !mainKey) {
    console.log(chalk.red('入参有误'));
  } else {
    // 加密
    new Mystery().encrypt(picPath, filePath, outputPath, mainKey);
  }
}

module.exports = encrypt;
