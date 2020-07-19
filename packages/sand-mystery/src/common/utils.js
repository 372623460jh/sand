const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const tar = require('tar');
const fstream = require('fstream');
const stream = require('stream');

/**
 * 读取文件基本信息
 * @param {*} fileDir 文件绝对路径
 * @param {*} mode 模式 dir目录模式， file文件模式
 *  dir: 目录 取该目录下的第一个文件
 *  file: 文件
 */
function getFileBaseInfo(fileDir, mode) {
  // 绝对路径
  const filePath = fileDir;
  // 文件名/文件夹名
  let fileName = '';
  // 扩展名
  let extName = '';
  // 文件流
  let fileStream = '';
  // 文件状态
  const fileStat = fs.statSync(filePath);
  // 是不是文件
  const isFile = fileStat.isFile();
  // 文件大小
  const fileSize = fileStat.size;
  if (isFile && mode === 'file') {
    // 文件名
    fileName = path.basename(filePath);
    // 扩展名
    extName = path.extname(filePath);
    // 文件流
    fileStream = fs.createReadStream(filePath);
  }
  return {
    filePath, // 文件绝对路径
    fileName, // 文件名
    fileSize, // 文件大小
    isFile, // 是不是文件
    extName, // 扩展名
    fileStream, // 文件流
  };
}

/**
 * 同步压缩文件夹的方法
 * @param {*} inputPath 文件夹绝对路径
 * @param {*} outPath 输出路径
 * @param {*} fileName 压缩包名字
 * @return promise
 */
function reduceFolderSync(inputPath) {
  // 临时文件名
  const fileName = Math.random().toString(36).slice(2);
  // 压缩包路径
  const outputFilePath = path.resolve(__dirname, `../temp/${fileName}.gz`);
  // 创建一个gzip转换流，是一个可读可写流。
  const gzip = zlib.createGzip();
  // 返回一个promise
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return new Promise((resolve, reject) => {
    // 读操作
    const r = fstream.Reader({
      path: inputPath, // 入口文件夹
      type: 'Directory',
    });
    // 写操作
    const w = fstream.Writer({
      path: outputFilePath, // 输出文件
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    w.on('close', (e) => {
      // 同步写完回调
      resolve({
        outputFilePath,
      });
    });
    // 打包 压缩 写文件
    r.pipe(tar.Pack()).pipe(gzip).pipe(w);
  });
}

/**
 * 合并流
 * @param {*} streamArr 需要合并的流数组
 * @param {*} writeStream 写入流
 * @param {*} resolve 处理同步
 * @param {*} reject  处理同步报错
 */
function mergeStream(streamArr = [], writeStream, resolve, reject) {
  if (streamArr.length === 0) {
    // 数组为空，终止写入,合并完成
    writeStream.end();
    if (resolve) {
      // 用于处理同步
      resolve({
        stat: 'ok',
      });
    }
  } else {
    // 取出第一个流
    const firstStream = streamArr.shift();
    // 写入
    firstStream.pipe(writeStream, {
      end: false,
    });
    // 监听写入是否完毕
    firstStream.on('end', () => {
      mergeStream(streamArr, writeStream, resolve, reject);
    });
  }
}

/**
 * 同步合并流方法
 * @param {*} streamArr 需要合并的流数组
 * @param {*} writeStream 写入流
 */
function mergeStreamSync(streamArr = [], writeStream) {
  return new Promise((resolve, reject) => {
    mergeStream(streamArr, writeStream, resolve, reject);
  });
}

/**
 * buffer转stream
 * @param {*} buffer
 */
function bufferToStream(buffer) {
  // 创建一个bufferstream
  const bufferStream = new stream.PassThrough();
  // 将Buffer写入
  bufferStream.end(buffer);
  return bufferStream;
}

/**
 * 拆分流
 * @param {*} filePath 文件绝对路径
 * @param {*} size 拆分位置
 */
function splitStreamSync(filePath, subKey) {
  // 字符串转数字
  const size = +subKey;

  // 读取文件
  const { filePath: decryptFilePath, fileSize } = getFileBaseInfo(
    filePath,
    'file'
  );

  // 主文件大小
  const mainFileSize = fileSize - size;

  // 图片buffer
  const picBuffer = Buffer.alloc(size);
  // 主文件buffer
  const mainFileBuffer = Buffer.alloc(mainFileSize);

  // 读模式打开文件
  const fd = fs.openSync(decryptFilePath, 'r');

  /**
   * 从 fd 指定的文件中读取图片数据。
   * picBuffer 是图片数据将写入的缓冲区。
   * offset 是 buffer 中开始写入的偏移量。
   * length 是一个整数，指定要读取的字节数。
   * position 参数指定从文件中开始读取的位置。null表示从头开始读
   */
  const picNum = fs.readSync(fd, picBuffer, 0, picBuffer.length, null);

  /**
   * 从 fd 指定的文件中读取主文件数据。
   */
  const mainNum = fs.readSync(
    fd,
    mainFileBuffer, // 主文件数据将写入的缓冲区。
    0, // buffer 中开始写入的偏移量。
    mainFileBuffer.length, // 是一个整数，指定要读取的字节数。
    size // 参数指定从文件中开始读取的位置。null表示从头开始读
  );

  if (picNum !== size || mainNum !== mainFileSize) {
    // 读取的buffer大小有问题
    throw new Error(
      `读取的buffer大小有问题: ${picNum} !== ${size} || ${mainNum} !== ${mainFileSize}`
    );
  }

  // 转成stream
  const picStream = bufferToStream(picBuffer);
  const mainFileStream = bufferToStream(mainFileBuffer);

  return [picStream, mainFileStream];
}

module.exports = {
  getFileBaseInfo,
  mergeStreamSync,
  splitStreamSync,
  reduceFolderSync,
};
