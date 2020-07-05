const CopyWebpackPlugin = require('copy-webpack-plugin');

/**
 * 获取基础的babel配置
 */
function getCommonPlugin(opts) {
  const { webpackOptions = {} } = opts;
  const { copyPlugin = [] } = webpackOptions;
  // sand-pc 拷贝assets
  if (copyPlugin.length > 0) {
    return [
      /**
       * copy插件将某个文件夹下的内容拷贝到指定目录下
       *默认是空可从sandbuildrc中传入
       */
      new CopyWebpackPlugin({
        patterns: copyPlugin,
      }),
    ];
  }
  return [];
}

module.exports = {
  getCommonPlugin,
};
