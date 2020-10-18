const webpack = require('webpack');
const getCommonConfig = require('./commonConfig');
const utils = require('./utils');
const { typeEnum } = require('../../constant');

/**
 * 获取入口
 * @param {*} opts
 */
function getEntryAndPlugins(opts) {
  const { type = typeEnum.webpack } = opts;
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
  if (type === typeEnum.webpack) {
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
  const { type = typeEnum.webpack, webpackOptions = {} } = opts;
  const {
    // 哪些库不需要打进bundle中
    externals,
    // 扩展的插件
    extendPlugin,
    // 外部传入的扩展变量
    replaceConfig,
  } = webpackOptions;

  // dev环境的扩展插件
  const { devExtendPlugin } = extendPlugin;

  const {
    // 别名
    alias,
    // 输出
    output,
    rules,
    splitChunks,
    // 公共插件
    commonPlugin,
  } = getCommonConfig(opts);

  // 获取入口文件和html插件
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
          // 外部扩展的替换配置
          ...replaceConfig,
        }),
        new webpack.HotModuleReplacementPlugin(), // 热替换插件
      ])
      .concat(plugins)
      .concat(devExtendPlugin),
    // 代码分离，公共js打包
    optimization: {
      noEmitOnErrors: true,
      namedModules: true,
      splitChunks,
    },
    // 哪些包不打入bundle中
    externals: {
      ...externals,
    },
  };
}

module.exports = getDevWebpackConfig;
