const path = require('path');

/**
 * 获取绝对路径
 * @param {*} p
 */
function getPath(absPath, p) {
  return path.resolve(absPath, p);
}

module.exports = {
  getPath,
};
