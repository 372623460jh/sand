/**
 * 用于sessionId加密签名的key
 */
const sessionKey = ['jianghe.jh'];

/**
 * session 配置
 */
const sessionConfig = {
  // cookie的key。 (通过该cookie key可以确定session上下文)
  key: 'AUTH_SESSION_ID',
  // session，session 过期时间，以毫秒ms为单位计算
  maxAge: 30 * 60 * 1000,
  // 自动提交到响应头。(默认是 true)
  autoCommit: true,
  // 是否允许重写 。(默认是 true)
  overwrite: true,
  // 是否设置HttpOnly，如果在Cookie中设置了"HttpOnly"属性，那么通过程序(JS脚本、Applet等)将无法读取到Cookie信息，这样能有效的防止XSS攻击。  (默认 true)
  httpOnly: true,
  // 是否签名。(默认是 true)
  signed: true,
  // 是否每次响应时刷新Session的有效期。(默认是 false)
  rolling: true,
  // 是否在Session快过期时刷新Session的有效期。(默认是 false)
  renew: false,
};

module.exports = {
  sessionKey,
  sessionConfig,
};
