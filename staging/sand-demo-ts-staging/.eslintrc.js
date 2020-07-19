/**
 * eslint配置
 */
module.exports = {
  extends: require.resolve('@jianghe/sand-lint/typescript/prettier'),
  rules: {
    '@typescript-eslint/ban-ts-comment': [0],
  },
};
