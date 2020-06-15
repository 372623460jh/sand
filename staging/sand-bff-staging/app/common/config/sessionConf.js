const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

/**
 * 用于sessionId加密签名的key
 */
const signKey = 'jianghe.jh';

/**
 * cookie中sessionId的名字
 */
const SESSION_ID = 'sessionid';

/**
 * session超时时间ms, 30分钟有效期
 */
const sessionTTL = 30 * 60 * 1000;

/**
 * cookie数据格式
 */
const CookieDateEpoch = 'Thu, 01 Jan 1970 00:00:00 GMT';

/**
 * 利用secret加密val
 * @param {String} val 加密值
 * @param {String} secret 秘钥
 * @return {String} 加密串
 * @api private
 */
const sign = (val, secret) => {
  if (typeof val !== 'string') {
    throw new TypeError('加密串必须是一个字符串');
  }
  if (typeof secret !== 'string') {
    throw new TypeError('秘钥必须是一个字符串');
  }
  return `${val}.${crypto
    .createHmac('sha256', secret)
    .update(val)
    .digest('base64')
    // eslint-disable-next-line no-useless-escape
    .replace(/\=+$/, '')}`;
};

/**
 * 校验sessionId
 * @param {String} val cookie中的sessionId
 * @return {String|Boolean} 校验通过返回sessionid 校验不通过返回false
 * @api private
 */
const unsign = (val) => {
  if (typeof val !== 'string') {
    throw new TypeError('加密串必须是一个字符串');
  }
  if (typeof signKey !== 'string') {
    throw new TypeError('秘钥必须是一个字符串');
  }
  // 截取sessionid
  const str = val.slice(0, val.lastIndexOf('.'));
  // 加密cookie中的sessionid
  const mac = sign(str, signKey);
  const macBuffer = Buffer.from(mac);
  const valBuffer = Buffer.alloc(macBuffer.length);
  valBuffer.write(val);
  // 比对想个秘钥是否相同
  return crypto.timingSafeEqual(macBuffer, valBuffer) ? str : false;
};

/**
 * 获取唯一的sessionId和
 * @param {*} prefix 前缀
 */
const getSessionId = (prefix = '') => {
  const sessionId = `${prefix}${uuidv4()}`;
  const signSessionId = sign(sessionId, signKey);
  return {
    sessionId,
    signSessionId,
  };
};

/**
 * cookie配置
 */
const getCookieConfig = () => {
  return {
    // 写cookie所在的域名
    domain: '127.0.0.1',
    // 写cookie所在的路径
    path: '/',
    // cookie有效时长 ms
    maxAge: sessionTTL,
    // 是否只用于http请求中获取,不允许js获取
    httpOnly: true,
    // 生产环境为true
    // secure: true,
    // 失效时间格式
    expires: new Date(CookieDateEpoch),
    // 一个布尔值，表示是否覆盖以前设置的同名的 cookie (默认是 false)
    overwrite: true,
  };
};

module.exports = {
  // session超时时间
  sessionTTL,
  // 获取唯一的sessionid，和签名后的sessionid
  getSessionId,
  // 校验，验签session
  unsign,
  // cookie中sessionId的名字
  SESSION_ID,
  // cookie配置
  getCookieConfig,
};
