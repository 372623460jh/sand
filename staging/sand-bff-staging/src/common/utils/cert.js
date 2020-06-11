import JSEncrypt from 'jsencrypt';
import CryptoJS from 'crypto-js';

/**
 * 非对称加密方法
 * @param {*} value 加密值
 * @param {*} publicKey 公钥
 */
const encrypt = (value, publicKey) => {
  const jsEncrypt = new JSEncrypt();
  jsEncrypt.setPublicKey(publicKey);
  return jsEncrypt.encrypt(value);
};

/**
 * 加密登录信息
 * @param {*} loginInfo 登录信息
 * @param {*} publicKey 公约
 */
const encryptLoginInfo = (loginInfo, publicKey) => {
  const timestamp = new Date().getTime();
  const { password } = loginInfo;
  // 将密码MD5
  loginInfo.password = CryptoJS.MD5(password).toString();
  // 拼接加密串
  const decryptStr = `${timestamp}$$sand$$${JSON.stringify(loginInfo)}`;
  // 使用公钥加密
  return encrypt(decryptStr, publicKey);
};

export { encrypt, encryptLoginInfo };
