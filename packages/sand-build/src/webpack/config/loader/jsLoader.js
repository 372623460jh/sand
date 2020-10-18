const {
  getWebpackBabelConfig,
} = require('../../../common/getWebpackBabelConfig');

/**
 * 获取jsloader
 * @param {*} isProd 是否生产环境
 */
function getJsLoader(opts) {
  // 外部传入的babel配置
  const { webpackOptions = {} } = opts;
  const { babelConfig } = webpackOptions;

  let baseBabelConfig = getWebpackBabelConfig();
  if (babelConfig) {
    baseBabelConfig = babelConfig(baseBabelConfig);
  }

  return [
    {
      // js jsx
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      // @jianghe/sand-build 也需要过loader
      exclude: /node_modules(?!\/@jianghe\/sand-build)/,
      // 有babelConfig使用babelConfig,否则使用默认
      options: baseBabelConfig,
    },
  ];
}

/**
 * 获取ts tsx loader
 */
function getTsLoader() {
  return [
    {
      test: /\.ts(x?)$/,
      // 先ts转es6再使用babel
      use: [
        {
          loader: 'ts-loader',
        },
      ],
      exclude: '/node_modules/',
    },
  ];
}

/**
 * 获取ts tsx需要过babel
 */
function getTsLoaderShouldBable(opts) {
  const { webpackOptions = {} } = opts;
  const { babelConfig } = webpackOptions;

  let baseBabelConfig = getWebpackBabelConfig();
  if (babelConfig) {
    baseBabelConfig = babelConfig(baseBabelConfig);
  }

  return [
    {
      test: /\.ts(x?)$/,
      // 先ts转es6再使用babel
      use: [
        {
          loader: 'babel-loader',
          options: baseBabelConfig,
        },
        {
          loader: 'ts-loader',
        },
      ],
      exclude: '/node_modules/',
    },
  ];
}

module.exports = {
  getJsLoader,
  getTsLoader,
  getTsLoaderShouldBable,
};
