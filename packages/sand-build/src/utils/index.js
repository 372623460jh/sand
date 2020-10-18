/* eslint-disable no-console */
const fs = require('fs');
const chalk = require('chalk');
const path = require('path');
const childProcess = require('child_process');

/**
 * 错误处理
 * @param {*} e
 */
function logError(e) {
  console.log(chalk.red(e));
}

/**
 * 获取require的default
 * @param {*} obj
 */
function getDefault(obj) {
  return obj.default || obj;
}

/**
 * 获取绝对路径
 * @param {*} p
 */
function getPath(absPath, p) {
  return path.resolve(absPath, p);
}

/**
 * 创建软链接 linkPath -> sourcePath
 * @param {*} linkPath 软链接起始位置
 * @param {*} sourcePath 被指向的路径
 */
function createSymbolicLink(linkPath, sourcePath) {
  // 校验sourcePath是否存在
  if (!fs.existsSync(sourcePath)) {
    // 不存在
    logError(`软链接目标路径${sourcePath}不存在`);
    return false;
  }

  // 软链接起始已经存在，先删除
  if (fs.existsSync(linkPath)) {
    console.log(
      chalk.green(`${chalk.yellow('[LINK]')} 删除原始软链接 ${linkPath}`)
    );
    fs.unlinkSync(linkPath);
  }

  // 生成起始位置文件的上一级文件夹
  if (mkdirsSync(path.dirname(linkPath))) {
    // 创建软链接
    if (process.platform === 'win32') {
      // windows环境
      childProcess.execSync(`mklink ${linkPath} ${sourcePath}`, {
        cwd: process.cwd(),
      });
    } else if (process.platform === 'darwin' || process.platform === 'linux') {
      // linux或mac os
      childProcess.execSync(`ln -s ${sourcePath} ${linkPath}`, {
        cwd: process.cwd(),
      });
    } else {
      logError(`${process.platform}该操作系统不支持创建软链接`);
      return false;
    }
    return true;
  }

  logError(`文件创建失败: ${path.dirname(linkPath)}`);
  return false;
}

/**
 * 同步递归创建目录
 * @param {*} dirname 目录
 */
// eslint-disable-next-line consistent-return
function mkdirsSync(dirname) {
  if (fs.existsSync(dirname)) {
    // 文件以及存在
    return true;
  }
  // 创建上一级目录
  if (mkdirsSync(path.dirname(dirname))) {
    // 上一级存在创建下一级目录
    fs.mkdirSync(dirname);
    return true;
  }
}

/**
 * 同步删除文件夹
 * @param {*} path
 */
function delDirSync(filePath) {
  let files = [];
  if (fs.existsSync(filePath)) {
    files = fs.readdirSync(filePath);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    files.forEach((file, index) => {
      const curPath = `${filePath}/${file}`;
      if (fs.statSync(curPath).isDirectory()) {
        delDirSync(curPath); // 递归删除文件夹
      } else {
        fs.unlinkSync(curPath); // 删除文件
      }
    });
    fs.rmdirSync(filePath);
  }
}

module.exports = {
  mkdirsSync,
  createSymbolicLink,
  getPath,
  getDefault,
  logError,
  delDirSync,
};
