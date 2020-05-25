const cors = require('koa2-cors');

/**
 * 用于校验请求地址是否在域名白名单内，在的化才允许跨域请求
 * @param {*} ct 上下文
 */
function checkCorsOrigin(ctx) {
  // 用于匹配zirupay的域名
  const zirupayTest = /^(https?:\/\/)([a-z]{2,4})(\.zirupay\.com)(:\d{2,5})?$/;
  // 获取请求来源的url
  const { referer } = ctx.header;
  if (referer) {
    // 请求服务器的host
    const host = referer.substr(0, referer.length - 1);
    if (zirupayTest.test(host)) {
      // 白名单内
      return host;
    }
  }
  return 'https://www.zirupay.com';
}

/**
 * 获取cors配置
 */
function getCors() {
  return cors({
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
  });
}

module.exports = {
  checkCorsOrigin,
  getCors,
};
