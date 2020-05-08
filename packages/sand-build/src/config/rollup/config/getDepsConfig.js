/**
 * 获取依赖配置
 * @param {*} param0
 */
function getDepsConfig({ pkg }) {
  return []
    .concat(pkg.dependencies ? Object.keys(pkg.dependencies) : [])
    .concat(pkg.peerDependencies ? Object.keys(pkg.peerDependencies) : []);
}

/**
 * 获取依赖配置,生成
 * {
 *   "antd": "antd",
 * }
 * 之类的配置map
 * @param {*} param0
 */
function getDepsMap({ pkg }) {
  const { peerDependencies = {}, dependencies = {} } = pkg;
  const peerArr = []
    .concat(Object.keys(dependencies))
    .concat(Object.keys(peerDependencies));
  const peerObj = {};
  peerArr.forEach((item) => {
    peerObj[item] = item;
  });
  return peerObj;
}

module.exports = {
  getDepsConfig,
  getDepsMap,
};
