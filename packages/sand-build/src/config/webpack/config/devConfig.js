const webpack = require('webpack');
const getCommonConfig = require('./commonConfig');
const utils = require('./utils');
const { typeEnum } = require('../../../constant');

/**
 * 获取入口
 * @param {*} opts
 */
function getEntryAndPlugins(opts) {
  const { type = typeEnum.pc } = opts;
  const {
    getEntryMap,
    getSandEntry,
    getSandWebpackPlugin,
    getWebpackEntry,
    getHtmlWebpackPlugin,
  } = utils;
  if (type === typeEnum.demo) {
    // 解析examples目录生成入口map
    const entryMap = getEntryMap(opts);
    // 根据entryMap生成webpack entryMap
    return {
      entry: getWebpackEntry(entryMap, opts),
      plugins: getHtmlWebpackPlugin(entryMap, opts),
    };
  }
  if (type === typeEnum.pc || type === typeEnum.mob) {
    return {
      entry: getSandEntry(opts),
      plugins: getSandWebpackPlugin(opts),
    };
  }
  return { entry: {}, plugins: [] };
}

/**
 * 获取webpack配置的方法
 * @param {*} env
 */
function getDevWebpackConfig(opts) {
  const { type = typeEnum.pc } = opts;

  const {
    alias, // 别名
    output, // 输出
    rules,
    splitChunks,
    commonPlugin, // 公共插件
  } = getCommonConfig(opts);

  const { entry = {}, plugins = [] } = getEntryAndPlugins(opts);

  return {
    // 开发模式
    mode: 'development',
    // 入口
    entry,
    // 出口
    output,
    // 解析
    resolve: {
      // 文件引入时支持以下类型不加后缀
      extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
      mainFields: ['browser', 'module', 'main'],
      // 别名
      alias,
    },
    module: {
      rules,
    },
    devtool: 'source-map',
    // 插件
    plugins: commonPlugin
      .concat([
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('development'),
          // 将代码中__entryMap__替换成entryMap
          __entryMap__:
            type === typeEnum.demo
              ? JSON.stringify(utils.getEntryMap(opts))
              : {},
        }),
        new webpack.HotModuleReplacementPlugin(), // 热替换插件
      ])
      .concat(plugins),
    // 代码分离，公共js打包
    optimization: {
      noEmitOnErrors: true,
      namedModules: true,
      splitChunks,
    },
  };
}

module.exports = getDevWebpackConfig;
