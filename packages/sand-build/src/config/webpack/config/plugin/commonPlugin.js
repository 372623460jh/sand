const CopyWebpackPlugin = require('copy-webpack-plugin');
const { typeEnum } = require('../../../../constant');
const { getPath } = require('../../../../utils');

/**
 * 获取基础的babel配置
 */
function getCommonPlugin(opts) {
  const { type = typeEnum.pc } = opts;
  if (type === typeEnum.pc) {
    // sand-pc 拷贝assets
    return [
      /**
       * copy插件将某个文件夹下的内容拷贝到指定目录下
       * ./src/assets拷贝到./dist/assets
       */
      new CopyWebpackPlugin([
        {
          from: getPath(process.cwd(), './src/assets'),
          to: getPath(process.cwd(), './dist/assets'),
          ignore: ['.*'],
        },
      ]),
    ];
  }
  return [];
}

module.exports = {
  getCommonPlugin,
};
