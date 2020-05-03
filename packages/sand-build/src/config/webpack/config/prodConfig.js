const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const getCommonConfig = require('./commonConfig');
const utils = require('./utils');
const { typeEnum } = require('../../../constant');

/**
 * 获取入口
 * @param {*} opts
 */
function getEntry(opts) {
  const { type = typeEnum.pc } = opts;
  if (type === typeEnum.demo) {
    // 解析examples目录生成入口map
    const entryMap = utils.getEntryMap(opts);
    // 根据entryMap生成webpack entryMap
    return utils.getWebpackEntry(entryMap, opts);
  }
  if (type === typeEnum.pc) {
    return utils.getSandPcEntry(opts);
  }
  return {};
}

/**
 * 获取插件
 * @param {*} opts
 */
function getPlugins(opts) {
  const { webpackOptions = {} } = opts;
  const { showBundleAnalyzer = false } = webpackOptions;
  return showBundleAnalyzer ? [
    // chunks可视化
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerHost: '127.0.0.1',
      analyzerPort: 8889,
      reportFilename: 'report.html',
      defaultSizes: 'parsed',
      openAnalyzer: true,
      generateStatsFile: false,
      statsFilename: 'stats.json',
      statsOptions: null,
      logLevel: 'info',
    }),
  ] : [];
}

/**
 * 获取webpack配置的方法
 * @param {*} env
 */
function getProdWebpackConfig(opts) {
  const {
    alias, // 别名
    output, // 输出
    rules,
    splitChunks,
    commonPlugin, // 公共插件
  } = getCommonConfig(opts);

  return {
    // 生产环境
    mode: 'production',
    // 入口
    entry: getEntry(opts),
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
    // 插件
    plugins: commonPlugin
      .concat([
        /**
         * 1、在生产环境中的配置中，DefinePlugin 可以减少冗余，缩减 bundle 大小；
         * 2、还要注意，任何位于 /src 的本地代码都可以关联到 process.env.NODE_ENV 环境变量，使用process.env.NODE_ENV也是有效的。
         */
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        // 将css单独输出
        new MiniCssExtractPlugin({
          filename: '[name].css',
          chunkFilename: '[name].css',
        }),
        // 用于优化css文件
        new OptimizeCssAssetsPlugin({
          cssProcessorOptions: {
            safe: true,
            autoprefixer: { disable: true }, // 忽略autoprefixer加的前缀
            mergeLonghand: false,
            discardComments: {
              removeAll: true, // 移除注释
            },
          },
          canPrint: true,
        }),
      ])
      .concat(getPlugins(opts)),
    // 代码分离，公共js打包
    optimization: {
      noEmitOnErrors: true,
      concatenateModules: false,
      minimizer: [
        // 自定义压缩混淆代码，将会覆盖默认配置
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
          terserOptions: {
            output: {
              ascii_only: true,
            },
          },
        }),
      ],
      splitChunks,
    },
  };
}

module.exports = getProdWebpackConfig;
