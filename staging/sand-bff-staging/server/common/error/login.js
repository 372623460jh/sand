/**
 * 登录相关错误码枚举
 */
const loginErrorCodeEnum = {
  // 未登录
  L0001: {
    code: 'L0001',
    desc: '未登录',
  },
  // 设置redis中的session有效期失败
  L0002: {
    code: 'L0002',
    desc: '设置redis中的session有效期失败',
  },
  // 将session信息写入redis是失败
  L0003: {
    code: 'L0003',
    desc: '将session信息写入redis是失败',
  },
  // 登录账号密码有误
  L0004: {
    code: 'L0004',
    desc: '登录账号密码有误',
  },
  // cookie中没有sessionId，sessionId过去或未登录
  L0005: {
    code: 'L0005',
    desc: 'cookie中没有sessionId，sessionId过去或未登录',
  },
  // cookie中的sessionid不合法，可能被篡改
  L0006: {
    code: 'L0006',
    desc: 'cookie中的sessionid不合法，可能被篡改',
  },
  // 无法从redis中获取到session信息
  L0007: {
    code: 'L0007',
    desc: '无法从redis中获取到session信息',
  },
  // 删除redis中session异常
  L0008: {
    code: 'L0008',
    desc: '删除redis中session异常',
  },
  // 上下文中没有sessionId，无法检测登录状态
  L0009: {
    code: 'L0009',
    desc: '上下文中没有sessionId，无法检测登录状态',
  },
  // crypto私钥解密失败或登录有效时间校验失败
  L0010: {
    code: 'L0010',
    desc: 'crypto私钥解密失败或登录有效时间校验失败',
  },
};

module.exports = loginErrorCodeEnum;
