const { babelBuild } = require('./babelBuild');
const { moduleTypeEnum } = require('../constant');

/**
 * babel构建生产器
 * @param {*} opts
 */
function babelFactory(opts) {
  const { config } = opts;
  const {
    pkgPath,
    buildType,
    isTs,
    moduleType,
    babelConfig,
    nodeVersion,
  } = config;

  // babel构建factory的数组
  const babelBuildList = [];

  for (let index = 0; index < moduleType.length; index++) {
    const mt = moduleType[index];
    if (mt === moduleTypeEnum.umd) {
      // babel 模式下的umd丢弃
      continue;
    }
    babelBuildList.push(async (options) => {
      // 是否开启监听
      const { watch = false } = options;
      await babelBuild({
        pkgPath,
        watch,
        buildType,
        moduleType: mt,
        isTs,
        babelConfig,
        nodeVersion,
      });
    });
  }

  return babelBuildList;
}

module.exports = {
  babelFactory,
};
