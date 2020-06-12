// const NodeRSA = require('node-rsa');
const fs = require('fs');
const crypto = require('crypto');
const { getPath } = require('./base');

/**
 * 读取秘钥
 * @param {*} certPath
 */
const getCertkey = (certPath) => {
  // 读取文件buffer
  const pem = fs.readFileSync(certPath);
  // 将buffer转为ascii 字符串
  const key = pem.toString('ascii');
  return key;
};

/**
 * 获取公钥
 */
const getPublicKey = () => {
  return getCertkey(
    getPath(__dirname, '../../app/assets/cert/rsa_public_key.pem')
  );
};

/**
 * 私钥
 */
let privateKey = '';

/**
 * 获取私钥
 */
const getPrivateKey = () => {
  if (privateKey) {
    return privateKey;
  }
  privateKey = getCertkey(
    getPath(__dirname, '../../app/assets/cert/rsa_private_key.pem')
  );
  return privateKey;
};

/**
 * 用私钥解密
 * @param {*} encryptStr 加密串
 */
const decryptByPrivateKey = (encryptStr) => {
  const decryptBuffer = crypto.privateDecrypt(
    {
      key: getPrivateKey(),
      padding: crypto.constants.RSA_PKCS1_PADDING,
    },
    Buffer.from(encryptStr, 'base64')
  );
  return decryptBuffer.toString('ascii');
};

module.exports = {
  getPublicKey,
  getPrivateKey,
  decryptByPrivateKey,
};
