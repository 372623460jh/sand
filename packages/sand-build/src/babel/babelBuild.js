/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const vfs = require('vinyl-fs');
const lodash = require('lodash');
const through = require('through2');
const slash = require('slash2');
const chokidar = require('chokidar');
const gulpTs = require('gulp-typescript');
const gulpLess = require('gulp-less');
const gulpIf = require('gulp-if');
const chalk = require('chalk');
const { join, extname } = require('path');
const { existsSync, readFileSync, statSync } = require('fs');
const babel = require('@babel/core');
const ts = require('typescript');
const { getBabelConfig } = require('../common/getBabelConfig');
const { delDirSync } = require('../utils');
const { buildTypeEnum, moduleTypeEnum } = require('../constant');

/**
 * 使用babel处理单个文件内容
 * @param {*} opts
 */
function transform(opts) {
  const {
    file, // 单个文件路径
    moduleType, // 文件类型
    nodeVersion, // node
    babelConfig, // 替换的babel配置
    pkgPath, // 包路径
    targetPath, // 输出路径
    babelRuntime,
  } = opts;

  // 获取babael配置
  let bConfig = getBabelConfig({
    // 构建方式rollup | babel
    buildType: buildTypeEnum.babel,
    // 构建类型esm | cjs | umd
    moduleType,
    // 要构建的文件路径，只有babel模式下才有
    filePath: slash(file.path),
    // node的版本号，只有cjs模式下支持此参数
    nodeVersion,
    // 是否开启babelruntime
    babelRuntime,
  });

  if (babelConfig) {
    // 外部扩展babel
    bConfig = babelConfig(bConfig);
  }

  const { presets = [], plugins = [] } = bConfig;

  const babelOpts = {
    presets,
    plugins,
  };

  // 文件输出日志
  const relFile = slash(file.path).replace(`${pkgPath}/src`, `${targetPath}`);
  console.log(`[BUILD:BABEL] -> ${chalk.yellow(relFile)}`);

  const { code } = babel.transform(file.contents, {
    ...babelOpts,
    filename: file.path,
    // 不读取babel配置文件，全采用babelOpts中的配置
    configFile: false,
  });

  return code;
}

/**
 * 使用babel构建项目的方法
 */
const babelBuild = async (opts) => {
  const {
    // 包绝对路径
    pkgPath,
    // 是否开启监听
    watch,
    // 模块类型cjs | esm ；babel模式下不会有umd模式
    moduleType,
    // 是否是ts
    isTs,
    // babel配置扩展
    babelConfig,
    // cjs模式可以指定node版本 默认6。其他模式下不生效
    nodeVersion,
    // 是否开启babelruntime
    babelRuntime,
  } = opts;

  // 要构建的目录
  const srcPath = join(pkgPath, 'src');

  // 输出目录
  const targetDir = moduleType === moduleTypeEnum.esm ? 'es' : 'lib';
  const targetPath = join(pkgPath, targetDir);

  // 删除文件
  delDirSync(targetPath);

  /**
   * tsconfig.json is not valid json file
   */
  function parseTsconfig(tsconfigPath) {
    const readFile = (tsPath) => readFileSync(tsPath, 'utf-8');
    const result = ts.readConfigFile(tsconfigPath, readFile);
    if (result.error) {
      return;
    }
    return result.config;
  }

  /**
   * 读取tsconfig.json 中的compilerOptions
   * @param {*} path
   */
  function getTsconfigCompilerOptions(path) {
    const config = parseTsconfig(path);
    return config ? config.compilerOptions : undefined;
  }

  /**
   * 获取tsconfig的配置
   */
  function getTSConfig() {
    // tsconfig位置
    const tsconfigPath = join(pkgPath, 'tsconfig.json');
    if (existsSync(tsconfigPath)) {
      return getTsconfigCompilerOptions(tsconfigPath) || {};
    }
    console.error(`需要构建的项目是ts工程，但未找到${tsconfigPath}配置文件`);
    return {};
  }

  /**
   * 创建流处理文件
   * @param {*} src
   */
  function createStream(src) {
    let tsConfig = null;
    if (isTs) {
      // 读取tsconfig，如果构建目录
      tsConfig = getTSConfig();
    }

    // 是不是tsx | ts文件 排除.d.ts
    function isTsFile(path) {
      return /\.tsx?$/.test(path) && !path.endsWith('.d.ts');
      // 不忽略d.ts
      // return /\.tsx?$/.test(path);
    }

    // 是不是less文件
    function isLessFile(path) {
      return /\.less$/.test(path);
    }

    // 文件是否需要变换（js jsx ts tsx需要变换）排除.d.ts
    function isTransform(path) {
      return /\.(t|j)sx?$/.test(path) && !path.endsWith('.d.ts');
    }

    // 通过gulp处理文件
    return vfs
      .src(src, {
        allowEmpty: true,
        base: srcPath,
      })
      .pipe(
        // 是ts | tsx文件，使用tsConfig配置构建ts文件
        gulpIf((f) => isTsFile(f.path), gulpTs(tsConfig))
      )
      .pipe(
        // 如果是less文件,通过gulpLess处理less文件
        gulpIf((f) => isLessFile(f.path), gulpLess(true))
      )
      .pipe(
        // 处理js jsx ts tsx文件
        gulpIf(
          (f) => isTransform(f.path),
          // 使用through2处理流
          through.obj((file, env, cb) => {
            try {
              // 文件内容 通过transform方法改变
              file.contents = Buffer.from(
                transform({
                  file, // 文件路径
                  moduleType, // cjs | esm ；babel模式下不会有umd模式
                  nodeVersion, // cjs模式下node的版本号
                  babelConfig,
                  pkgPath, // 包路径
                  targetPath, // 输出路径
                  babelRuntime,
                })
              );
              // 文件名替换 js jsx ts tsx -> js
              file.path = file.path.replace(extname(file.path), '.js');
              cb(null, file);
            } catch (e) {
              console.log(e);
              console.error(`babel编译失败: ${file.path}`);
              cb(null);
            }
          })
        )
      )
      .pipe(
        // 输出到哪
        vfs.dest(targetPath)
      );
  }

  return new Promise((resolve) => {
    // 需要把哪些文件进行babel构建，以及要排除哪些文件
    const patterns = [
      join(srcPath, '**/*'),
      `!${join(srcPath, '**/fixtures{,/**}')}`,
      `!${join(srcPath, '**/demos{,/**}')}`,
      `!${join(srcPath, '**/__test__{,/**}')}`,
      `!${join(srcPath, '**/*.mdx')}`,
      `!${join(srcPath, '**/*.md')}`,
      `!${join(srcPath, '**/*.+(test|e2e|spec).+(js|jsx|ts|tsx)')}`,
    ];

    createStream(patterns).on('end', () => {
      if (watch) {
        console.log(chalk.magenta(`[WATCHING:BABEL] -> ${slash(srcPath)}`));
        const watcher = chokidar.watch(patterns, {
          ignoreInitial: true,
        });

        const files = [];

        // eslint-disable-next-line no-inner-declarations
        function compileFiles() {
          while (files.length) {
            createStream(files.pop());
          }
        }

        const debouncedCompileFiles = lodash.debounce(compileFiles, 1000);
        watcher.on('all', (event, fullPath) => {
          const relPath = fullPath.replace(srcPath, '');

          console.log(
            `[WATCHING:BABEL:${event}] ${slash(join(srcPath, relPath))}`
          );

          if (!existsSync(fullPath)) return;
          if (statSync(fullPath).isFile()) {
            if (!files.includes(fullPath)) files.push(fullPath);
            debouncedCompileFiles();
          }
        });
        process.once('SIGINT', () => {
          watcher.close();
        });
      }
      resolve();
    });
  });
};

module.exports = {
  babelBuild,
};
