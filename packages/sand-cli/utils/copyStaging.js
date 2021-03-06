/* eslint-disable no-console */
const copyDir = require('copy-dir');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const { stagingEnum } = require('../config/constants');

/**
 * 删除文件夹
 * @param {*} path
 */
function delDir(filePath) {
  let files = [];
  if (fs.existsSync(filePath)) {
    files = fs.readdirSync(filePath);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    files.forEach((file, index) => {
      const curPath = `${filePath}/${file}`;
      if (fs.statSync(curPath).isDirectory()) {
        delDir(curPath); // 递归删除文件夹
      } else {
        fs.unlinkSync(curPath); // 删除文件
      }
    });
    fs.rmdirSync(filePath);
  }
}

/**
 * 拷贝staging文件夹下的教授架到template中
 */
async function copyStaging() {
  /**
   * 校验sand-cli目录下的staging文件夹是否存在
   */
  const cliStaging = path.resolve(__dirname, '../staging');
  if (fs.existsSync(cliStaging)) {
    console.log(chalk.green(`[初始化脚手架] 文件已存在，先删除${cliStaging}`));
    delDir(cliStaging);
  }

  // 指令执行的根目录
  const targetPath = process.cwd();
  // 根目录下的staging文件夹
  const stagingPath = path.resolve(targetPath, './staging');
  // 拷贝到哪
  const sourcePath = path.resolve(__dirname, '../staging');

  console.log(
    chalk.green(`[初始化脚手架] 拷贝: ${stagingPath} 到 ${sourcePath}`)
  );

  // 非根目录下的package.json
  const packageJsonArr = [];

  // 脚手架名字数组
  const stagingNameArr = [];
  Object.keys(stagingEnum).forEach((item) => {
    stagingNameArr.push(stagingEnum[item].fileName);
  });

  /**
   * 拷贝sand/staging -> sand/packages/sand-cli/staging
   */
  copyDir.sync(stagingPath, sourcePath, (stat, fileFullPath, fileName) => {
    // fileFullPath: 拷贝源带名字路径
    // filePath: 上级路径
    const filePath = path.resolve(fileFullPath, '..');
    if (
      stat === 'file' &&
      fileName === 'package.json' &&
      // 文件的目录名是不是在stagingNameArr
      !stagingNameArr.includes(path.basename(filePath))
    ) {
      // 非根目录下的package.json改成package-backup.json
      packageJsonArr.push(
        path.join(sourcePath, filePath.replace(stagingPath, ''))
      );
    }
    const realPath = fileFullPath.replace(sourcePath, '');
    console.log(
      chalk.magenta('[初始化脚手架]'),
      `拷贝: ${path.join(targetPath, realPath)}`
    );
    return true;
  });

  // 将package.json处理成package-backup.json
  packageJsonArr.forEach((filePath) => {
    console.log(
      `${chalk.magenta('[初始化脚手架]')} 重命名: ${path.join(
        filePath,
        'package.json'
      )} -> ${path.join(filePath, 'package-backup.json')}`
    );
    fs.renameSync(
      path.join(filePath, 'package.json'),
      path.join(filePath, 'package-backup.json')
    );
  });
}

module.exports = {
  copyStaging,
};
