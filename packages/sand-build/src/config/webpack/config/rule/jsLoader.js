const { getBaseBabelConfig } = require('./baseBabelConfig');

/**
 * 获取jsloader
 * @param {*} isProd 是否生产环境
 */
function getJsLoader(opts) {
  // 外部传入的babel配置
  const { webpackOptions = {} } = opts;
  const { babelConfig } = webpackOptions;
  return [
    {
      // js jsx
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      // @jianghe/sand-build 也需要过loader
      exclude: /node_modules(?!\/@jianghe\/sand-build)/,
      // 有babelConfig使用babelConfig,否则使用默认
      options: babelConfig || getBaseBabelConfig(),
    },
  ];
}

module.exports = {
  getJsLoader,
};
