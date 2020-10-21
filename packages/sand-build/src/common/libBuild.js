const rollup = require('rollup');
const chalk = require('chalk');
const { factory } = require('../rollup');
const { babelFactory } = require('../babel/babelFactory');
const {
  buildTypeEnum,
  buildConfigFileName,
  moduleTypeEnum,
} = require('../constant');
const { createSymbolicLink, logError, getPath } = require('../utils');
const { getSandBuildConfig } = require('./stdConfig');

/**
 * 处理rc文件生成可用的配置文件
 * @param {*} env 环境，production还是development
 */
function handleConfig(props) {
  const { env, sandbuildrcPath } = props;

  // 读取sandbuildrc.js配置,并且标准化配置
  const { libsOptions = [] } = getSandBuildConfig(
    sandbuildrcPath || getPath(process.cwd(), `./.${buildConfigFileName}.js`)
  );

  // rollup配置
  let rollupConfigs = [];

  // babel配置
  let babelConfigs = [];

  libsOptions.forEach((config) => {
    const { esm, cjs, umd } = config;
    if (esm) {
      const { buildType = buildTypeEnum.rollup } = esm;
      if (buildType === buildTypeEnum.rollup) {
        // rollup esm
        rollupConfigs = rollupConfigs.concat([
          ...factory(config, env, moduleTypeEnum.esm),
        ]);
      } else {
        // babel esm
        babelConfigs = babelConfigs.concat([
          ...babelFactory(config, env, moduleTypeEnum.esm),
        ]);
      }
    }
    if (cjs) {
      const { buildType = buildTypeEnum.rollup } = cjs;
      if (buildType === buildTypeEnum.rollup) {
        // rollup cjs
        rollupConfigs = rollupConfigs.concat([
          ...factory(config, env, moduleTypeEnum.cjs),
        ]);
      } else {
        // babel cjs
        babelConfigs = babelConfigs.concat([
          ...babelFactory(config, env, moduleTypeEnum.cjs),
        ]);
      }
    }
    if (umd) {
      const { buildType = buildTypeEnum.rollup } = umd;
      const isProd = env === 'production';
      if (buildType === buildTypeEnum.rollup && isProd) {
        // 生产环境下构建 rollup umd
        rollupConfigs = rollupConfigs.concat([
          ...factory(config, env, moduleTypeEnum.umd),
        ]);
      }
    }
  });

  return {
    rollupConfigs,
    babelConfigs,
    packagesInfo: libsOptions,
  };
}

/**
 * 构建单个配置
 * @param {*} config 单个配置
 */
async function buildEntry(config) {
  const { output } = config;
  const bundle = await rollup.rollup(config);
  await bundle.generate(output);
  await bundle.write(output);
  console.log(
    chalk.green(`${chalk.yellow('[BUILD:ROLLUP]')} -> ${output.file}`)
  );
}

/**
 * 构建所有配置
 * @param {*} allConfig 全部配置数组
 */
function buildAll(allConfig) {
  let built = 0;
  // 配置项长度
  const total = allConfig.length;
  // 返回Promise用做同步
  return new Promise((resolve, reject) => {
    const next = () => {
      // 构建单个配置
      buildEntry(allConfig[built])
        .then(() => {
          built++;
          if (built < total) {
            next();
          } else {
            // 构建结束
            resolve();
          }
        })
        .catch((e) => {
          reject(e);
        });
    };
    next();
  });
}

/**
 * 构建监听模式
 * @param {*} configs rollup配置
 */
function watching(configs) {
  // 开启监听
  const watcher = rollup.watch(configs);
  watcher.on('event', (event) => {
    /**
     * event.code 会是下面其中一个：
     *  START        — 监听器正在启动（重启）
     *  BUNDLE_START — 构建单个文件束
     *  BUNDLE_END   — 完成文件束构建
     *  END          — 完成所有文件束构建
     *  ERROR        — 构建时遇到错误
     *  FATAL        — 遇到无可修复的错误
     */
    const { code, output, error } = event;
    if (code === 'BUNDLE_END') {
      // 构建完成
      console.log(chalk.green(`${chalk.yellow('[WATCHING]')} -> ${output[0]}`));
    }
    if (code === 'ERROR') {
      // 构建时遇到错误
      logError(error);
    }
    if (code === 'FATAL') {
      // 构建时遇到无可修复的错误，关闭构建
      logError(error);
      // 停止监听
      watcher.close();
    }
  });
}

/**
 * 根据配置文件创建软链接
 * @param {*} packagesInfo 配置文件
 */
function createLink(packagesInfo) {
  console.log(chalk.yellow('======== sand-build 开始创建软链（link）========'));
  for (let index = 0; index < packagesInfo.length; index++) {
    const { pkg = {}, pkgPath = '' } = packagesInfo[index];
    const { name = '' } = pkg;
    // node_modules下的根据包名创建的目录
    const nodeModulesPath = getPath(process.cwd(), `./node_modules/${name}`);
    // 创建软链接
    if (createSymbolicLink(nodeModulesPath, pkgPath)) {
      // 软连创建成功
      console.log(
        chalk.green(
          `${chalk.yellow(
            '[LINK]'
          )} 创建软链接 ${nodeModulesPath} -> ${pkgPath}`
        )
      );
    }
  }
  console.log(chalk.yellow('======== sand-build 软链创建完成（link）========'));
}

/**
 * 启动应用
 * options: {
 *    env: production/development
 *    type: pc/mob/demo
 * }
 */
async function buildLib(options) {
  const { link = false, watch = false } = options;
  const { packagesInfo, rollupConfigs, babelConfigs } = handleConfig(options);

  if (
    packagesInfo.length === 0 ||
    (rollupConfigs.length === 0 && babelConfigs.length === 0)
  ) {
    // 没有配置，直接return
    logError('没有库打包配置');
    return;
  }

  if (link) {
    // 需要在.sandbuildrc.js所在目录中的node_modules下创建软链，
    // 链接到packages中的对应包，方便调试packages中的应用
    createLink(packagesInfo);
  }

  console.log(
    chalk.yellow(
      `======== sand-build 开始构建（${watch ? 'watch' : 'build'}）========`
    )
  );

  // rollup 方式
  if (rollupConfigs.length > 0) {
    if (watch) {
      watching(rollupConfigs);
    } else {
      try {
        /**
         * 构建所有配置
         */
        await buildAll(rollupConfigs);
      } catch (error) {
        logError(error);
      }
    }
  }

  // babel 方式
  if (babelConfigs.length > 0) {
    for (let index = 0; index < babelConfigs.length; index++) {
      const babelFactoryFn = babelConfigs[index];
      // eslint-disable-next-line no-await-in-loop
      await babelFactoryFn({ watch });
    }
  }

  if (!watch) {
    console.log(
      chalk.yellow(
        `======== sand-build 构建结束（${watch ? 'watch' : 'build'}）========`
      )
    );
  }
}

module.exports = buildLib;