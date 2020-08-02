/**
 * 系统错误码集合
 */

const baseErrorCodeEnum = require('./base');

/**
 * 错误码枚举
 */
const errorCodeEnum = {
  ...baseErrorCodeEnum,
};

/**
 * 根据错误码返回错误实例
 * @param {*} errorCode
 * @param {*} msg
 */
function getError(errorCode, msg = '') {
  if (errorCodeEnum[errorCode]) {
    const { code, desc } = errorCodeEnum[errorCode];
    return new Error(`错误码：${code} || 错误详情：${desc}。${msg}`);
  }
  return new Error(
    `错误码：${errorCodeEnum.NOCO0002.code} || 错误详情：${errorCodeEnum.NOCO0002.desc}。${msg}`
  );
}

module.exports = {
  errorCodeEnum,
  getError,
};
