const { getBaseBabelConfig } = require('./baseBabelConfig');

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
 * 获取ts tsx loader
 */
function getTsLoaderShouldBable(opts) {
  const { webpackOptions = {} } = opts;
  const { babelConfig } = webpackOptions;
  return [
    {
      test: /\.ts(x?)$/,
      // 先ts转es6再使用babel
      use: [
        {
          loader: 'babel-loader',
          options: babelConfig || getBaseBabelConfig(),
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
  getTsLoader,
  getTsLoaderShouldBable,
};
