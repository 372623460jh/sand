/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const {
  getFileBaseInfo,
  mergeStreamSync,
  splitStreamSync,
  reduceFolderSync,
} = require('../common/utils');

class Mystery {
  /**
   * 加密
   * @param {*} stream 流
   * @param {*} mainKey 主秘钥
   */
  _cryptoEncrypt(stream, mainKey) {
    let enStream;
    try {
      const encryptStream = crypto.createCipher('aes-256-cbc', mainKey);
      // 加密
      enStream = stream.pipe(encryptStream);
    } catch (error) {
      //
    }
    return enStream;
  }

  /**
   * 解密
   * @param {*} stream 流
   * @param {*} mainKey 主秘钥
   */
  _cryptoDecrypt(stream, mainKey) {
    let deStream;
    try {
      const decryptStream = crypto.createDecipher('aes-256-cbc', mainKey);
      // 解密
      deStream = stream.pipe(decryptStream);
    } catch (error) {
      //
    }
    return deStream;
  }

  /**
   * 加密
   * @param {*} picPath 图片绝对路径
   * @param {*} filePath 文件绝对路径
   * @param {*} outputPath 输出路径
   * @param {*} mainKey 主密码
   */
  async encrypt(picPath, filePath, outputPath, mainKey) {
    // 读取图片基本信息
    const {
      fileSize: imageSize,
      fileStream: imageFileStream,
    } = getFileBaseInfo(picPath, 'file');

    // 压缩文件夹生成中间文件
    const { outputFilePath } = await reduceFolderSync(filePath);

    // 读取中间压缩文件
    const { fileStream: gzStream } = getFileBaseInfo(outputFilePath, 'file');

    // 加密中间文件流
    const gzEncryptStream = this._cryptoEncrypt(gzStream, mainKey);

    // 合并流数组
    const mergeStreamArr = [imageFileStream, gzEncryptStream];

    // 写流
    const writeStream = fs.createWriteStream(outputPath);

    // 合并
    const { stat } = await mergeStreamSync(mergeStreamArr, writeStream);

    // 删除中间文件
    fs.unlinkSync(outputFilePath);

    // eslint-disable-next-line no-console
    console.log(
      '加密状态：',
      stat,
      ' 副密钥：',
      imageSize,
      ' 输出文件：',
      outputPath
    );
  }

  /**
   * 解密
   * @param {*} filePath 文件路径
   * @param {*} outputFilePath 输出文件夹路径
   * @param {*} mainKey 主密钥
   * @param {*} subKey 子密钥
   */
  async decrypt(filePath, outputFilePath, mainKey, subKey) {
    // 根据subKey拆分流
    const [picStream, mainEncryptStream] = splitStreamSync(filePath, subKey);

    // 第二段流解密
    const mainStream = this._cryptoDecrypt(mainEncryptStream, mainKey);

    // 输入出路径
    const outputPath = path.resolve(outputFilePath, './mystery.gz');
    const outputPicPath = path.resolve(outputFilePath, './mystery.png');

    // 输出成gz文件
    const writeStream = fs.createWriteStream(outputPath);
    // 输出成图片
    const picWriteStream = fs.createWriteStream(outputPicPath);

    // 写流
    picStream.pipe(picWriteStream);
    mainStream.pipe(writeStream);

    // eslint-disable-next-line no-console
    console.log('文件路径：', outputPath, '图片路径：', outputPicPath);
  }
}

module.exports = Mystery;
