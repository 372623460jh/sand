const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { getBrowsersList } = require('../../../../utils');

/**
 * 获取style的loader
 * @param {*} isProd 是否生产环境
 * @param {*} enableModule css module
 * @param {*} enableLess 是否是less
 */
function getStyleLoader(isProd, enableModule = false, enableLess = false) {
  const result = [
    // 生产环境压缩css
    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
    // css-loader
    {
      loader: 'css-loader',
      options: {
        // css-loader 前还有几个loader
        importLoaders: enableLess ? 2 : 1,
        modules: enableModule,
        camelCase: 'dashesOnly',
        localIdentName: '[local]___[hash:base64:5]',
      },
    },
    // postcss-loader
    {
      loader: 'postcss-loader',
      options: {
        plugins: [autoprefixer(getBrowsersList(isProd))],
      },
    },
  ];
  if (enableLess) {
    // 如果是less要使用less-loader
    result.push({
      loader: 'less-loader',
      options: {
        javascriptEnabled: true,
      },
    });
  }
  return result;
}

/**
 * 获取公共的loader
 * @param {*} isProd 是否生产环境
 */
function getCommonStyleLoader(isProd) {
  return [
    {
      // css
      test: function test(filePath) {
        return /\.css$/.test(filePath) && !/\.module\.css$/.test(filePath);
      },
      use: getStyleLoader(isProd, false, false),
    },
    {
      // less
      test: function test(filePath) {
        return /\.less$/.test(filePath) && !/\.module\.less$/.test(filePath);
      },
      use: getStyleLoader(isProd, false, true),
    },
    {
      // css(css module)
      test: /\.(module).css$/,
      use: getStyleLoader(isProd, true, false),
    },
    {
      // less(less module)
      test: /\.(module).less$/,
      use: getStyleLoader(isProd, true, true),
    },
  ];
}

module.exports = {
  getCommonStyleLoader,
};
