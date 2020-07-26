/**
 * eslint配置
 */
module.exports = {
  extends: require.resolve('@jianghe/sand-lint/react/prettier'),
  settings: {
    // 忽略别名导致的找不到模块报错
    'import/resolver': {
      alias: {
        map: [['@', './src']],
      },
    },
  },
  rules: {
    'jsx-a11y/click-events-have-key-events': [0],
  },
};
