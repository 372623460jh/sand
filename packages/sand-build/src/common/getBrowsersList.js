/**
 * 获取支持的浏览器列表，用于autoprefixer来自动增加前缀
 * @param {*} isProd 是否生产环境
 */
function getBrowsersList(isProd) {
  return {
    // https://github.com/postcss/autoprefixer/issues/776
    remove: false,
    overrideBrowserslist: isProd
      ? ['last 2 versions', 'ios >= 9', 'android >= 4']
      : [
          'last 2 Chrome versions', // 开发环境，默认只支持Chrome最新的2个版本
        ],
  };
}

module.exports = {
  getBrowsersList,
};
