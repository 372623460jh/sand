/**
 * 获取ts tsx loader
 */
function getTsLoader() {
  return [
    {
      test: /\.ts(x?)$/,
      loader: 'ts-loader',
      exclude: '/node_modules/',
    },
  ];
}

module.exports = {
  getTsLoader,
};
