const webpack = require('webpack');
const getCommonConfig = require('./common.config');
const utils = require('./utils');

/**
 * 解析examples目录生成入口map
 */
const entryMap = utils.getEntryMap('examples');
/**
 * 根据entryMap生成webpack entryMap
 */
const webpackEntryMap = utils.getWebpackEntry(entryMap);
/**
 * 根据entryMap获取htmlWebpackPlugin配置
 */
const htmlWebpackPluginArr = utils.getHtmlWebpackPlugin(entryMap);

/**
 * 获取webpack配置的方法
 * @param {*} env
 */
function getWebpackConfig(env) {
  const {
    alias,
    output,
    rules,
    splitChunks,
    commonPlugin,
  } = getCommonConfig(env);

  return {
  // 开发模式
    mode: 'development',
    // 入口
    entry: webpackEntryMap,
    // 出口
    output,
    // 解析
    resolve: {
    // 文件引入时支持以下类型不加后缀
      extensions: ['.js', '.jsx', '.json'],
      mainFields: ['browser', 'module', 'main'],
      // 别名
      alias,
    },
    module: {
      rules,
    },
    devtool: 'source-map',
    // 插件
    plugins: commonPlugin.concat([
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env),
        // 将代码中__entryMap__替换成entryMap
        __entryMap__: JSON.stringify(entryMap),
      }),
      new webpack.HotModuleReplacementPlugin(), // 热替换插件
    ]).concat(htmlWebpackPluginArr),
    // 代码分离，公共js打包
    optimization: {
      noEmitOnErrors: true,
      namedModules: true,
      splitChunks,
    },
  };
}

module.exports = getWebpackConfig;
