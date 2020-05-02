/* eslint-disable no-console */
const inquirer = require('inquirer');
const chalk = require('chalk');
const path = require('path');
const editJsonFile = require('edit-json-file');
const copyDir = require('copy-dir');
const fs = require('fs');
const childProcess = require('child_process');

// 脚手架名字
const stagingName = 'sand-lib-staging';

/**
 * 创建sand-lib的脚手架
 */
async function createLib() {
  // 对应模板所在位置
  const sourcePath = path.resolve(__dirname, `../staging/${stagingName}`);
  // 当前文件路径
  const targetPath = process.cwd();

  // 用户输入项目详细（package.json中的内容）
  const steps = [
    {
      type: 'input',
      name: 'name',
      default: path.basename(targetPath),
      message: '项目名:',
    },
    {
      type: 'input',
      name: 'version',
      default: '1.0.0',
      message: '版本:',
    },
    {
      type: 'input',
      name: 'description',
      message: '项目描述: ',
    },
    {
      type: 'input',
      name: 'author',
      message: '作者:',
    },
    {
      type: 'input',
      name: 'license',
      default: 'ISC',
      message: '协议: ',
    },
  ];

  /**
   * 用户输入的脚手架基本信息
   */
  const {
    name,
    version,
    description,
    author,
    license,
  } = await inquirer.prompt(steps);

  // 基于模板的package.json去修改相关属性
  const file = editJsonFile(path.resolve(sourcePath, './package.json'));
  file.set('name', name);
  file.set('version', version);
  file.set('description', description);
  file.set('author', author);
  file.set('license', license);

  // 输出package.json
  console.log('');
  console.log(file.get());
  console.log('');

  // 提示用户是否确认创建
  const {
    confirmed,
  } = await inquirer.prompt([{
    type: 'confirm',
    name: 'confirmed',
    default: true,
    message: '确认创建?',
  }]);

  if (!confirmed) {
    console.log(chalk.red('已退出。'));
    return;
  }

  console.log('');

  // 根据修改生成package.json文件
  const targetPkgPath = path.join(targetPath, 'package.json');
  fs.writeFileSync(targetPkgPath, JSON.stringify(file.get(), null, 2));

  // 非根目录下的package.json
  const packageJsonArr = [];

  // 拷贝其他模板文件到当前目录中
  copyDir.sync(
    sourcePath,
    targetPath,
    (stat, fileFullPath, filePath, fileName) => {
      if (
        stat === 'file'
        && fileName === 'package.json'
        // 只有脚手架根目录下的package.json不拷贝
        && path.basename(filePath) === stagingName
      ) {
        // 不拷贝package.json，package.json使用编辑后生成的文件
        return false;
      }
      if (stat === 'file' && fileName === 'package-backup.json') {
        // package-backup.json
        packageJsonArr.push(filePath);
      }
      const realPath = fileFullPath.replace(sourcePath, '');
      console.log(chalk.magenta('生成: '), `${path.join(targetPath, realPath)}`);
      return true;
    },
  );

  // 将package-backup.json处理成package.json
  packageJsonArr.forEach((filePath) => {
    fs.renameSync(path.join(filePath, 'package-backup.json'), path.join(targetPath, 'package.json'));
  });

  // 安装依赖
  console.log();
  console.log(chalk.magenta('npm run init 初始化项目'));

  try {
    childProcess.execSync('npm run init', {
      cwd: process.cwd(),
      stdio: 'inherit', // 在当前输出
    });
  } catch (ex) {
    //
  }

  // 完成
  console.log();
  console.log(chalk.magenta('安装完成, 请执行 `npm run start` 运行项目'));
}

module.exports = createLib;
