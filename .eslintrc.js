/**
 * eslint配置
 */
module.exports = {
  extends: require.resolve('@jianghe/sand-lint/react'),
  rules: {},
  settings: {
    // 忽略别名导致的找不到模块报错
    'import/resolver': {
      alias: {
        map: [
          ['@', './packages/lib1/src'],
        ],
      },
    },
  },
};