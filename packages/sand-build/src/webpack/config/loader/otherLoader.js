/**
 * 获取其他loader
 * @param {*} isProd 是否生产环境
 */
function getOtherLoader() {
  return [
    {
      // 图片 字体
      test: /\.(png|jpg|svg|gif|jpeg|woff2?|eot|ttf|otf)(\?.*)?$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      ],
    },
  ];
}

module.exports = {
  getOtherLoader,
};
