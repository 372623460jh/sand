/**
 * eslint配置
 */
module.exports = {
  extends: require.resolve('@jianghe/sand-lint/react/prettier'),
  settings: {
    // 忽略别名导致的找不到模块报错
    'import/resolver': {
      alias: {
        map: [['@', './packages/index/src']],
      },
    },
  },
  rules: {},
};
