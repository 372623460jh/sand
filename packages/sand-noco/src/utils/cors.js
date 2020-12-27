/**
 * 用于校验请求地址是否在域名白名单内，在的化才允许跨域请求
 * @param {*} ct 上下文
 */
function checkCorsOrigin(ctx) {
  // 获取请求来源的url
  const { referer } = ctx.header;
  if (referer) {
    // 请求服务器的host
    const host = referer.substr(0, referer.length - 1);
    return host;
  }
  return 'http://127.0.0.1:9539';
}

/**
 * 获取cors配置
 */
function getCors() {
  return {
    origin: checkCorsOrigin,
    // 设置获取其他自定义字段
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    // 指定本次预检请求的有效期，单位为秒。
    maxAge: 5,
    // 开启接收cookie 如果客户端设置了withCredentials（fetch设置了credentials: "include"）origin不能设置为*,支持跨域带cookie
    credentials: true,
    // 接受的请求类型
    allowMethods: ['GET', 'POST'],
    // 接受的header参数
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  };
}

module.exports = {
  getCors,
  checkCorsOrigin,
};
