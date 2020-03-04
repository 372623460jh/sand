const path = require("path");
const Mystery = require('../src/pojo/Mystery')

// /**
//  * 加密
//  * @param 图片路径
//  * @param 文件路径
//  * @param 输出路径
//  * @param 主密钥
//  */
// new Mystery().encrypt(
//   path.resolve(__dirname, './input/image/3.png'),
//   path.resolve(__dirname, './input/file/project'),
//   path.resolve(__dirname, './output/encrypt/ss.png'),
//   '1472583690zx'
// );

/**
 * 解密
 * @param 文件路径
 * @param 输出路径
 * @param 主密钥
 * @param 子密钥
 */
new Mystery().decrypt(
  path.resolve(__dirname, './output/encrypt/ss.png'),
  path.resolve(__dirname, './output/decrypt/'),
  '1472583690zx',
  '16110'
);