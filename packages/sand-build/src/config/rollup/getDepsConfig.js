/**
 * 获取依赖配置
 * @param {*} param0
 */
function getDepsConfig({ pkg }) {
  return []
    .concat(pkg.dependencies ? Object.keys(pkg.dependencies) : [])
    .concat(pkg.peerDependencies ? Object.keys(pkg.peerDependencies) : []);
}

module.exports = {
  getDepsConfig,
};
