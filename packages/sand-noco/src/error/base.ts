/**
 * 登录相关错误码枚举
 */
const baseErrorCodeEnum = {
  // 请求方式不合法只支持get和post
  NOCO0001: {
    code: 'NOCO0001',
    desc: '请求方式不合法只支持get和post',
  },
  // 根据错误码未找到对应错误
  NOCO0002: {
    code: 'NOCO0002',
    desc: '根据错误码未找到对应错误',
  },
};

module.exports = baseErrorCodeEnum;
