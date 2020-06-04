#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
// 加密指令
const encrypt = require('../commands/encrypt');
// 解密指令
const decrypt = require('../commands/decrypt');
const pkg = require('../package.json');

// 版本号指令
program.version(`${pkg.version}`, '-v, --version');

// sand-mystery encrypt 命令
program
  .command('encrypt <picPath> <filePath> <outputPath> <mainKey>')
  .description('`sand-mystery encrypt` 加密')
  // encrypt的子命令
  .option('-n, --name <name>', '子命令名字用于签名')
  .action(encrypt); // 命中指令后指令encrypt回调

// sand-mystery decrypt 命令
program
  .command('decrypt <filePath> <outputFilePath> <mainKey> <subKey>')
  .description('`sand-mystery decrypt` 解密')
  // 子命令
  .option('-n, --name <name>', '子命令名字用于签名')
  .action(decrypt); // 命中指令后指令decrypt回调

// eslint-disable-next-line no-console
console.log(chalk.green(`${pkg.name}:  ${pkg.version}`));

program.parse(process.argv);
