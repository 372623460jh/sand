/**
 * eslint-node配置 支持prettier
 */
module.exports = {
  extends: ['eslint-config-airbnb-base', 'prettier'],
  parser: require.resolve('babel-eslint'),
  plugins: ['prettier'],
  env: {
    // 忽略jest报错
    jest: true,
    // 启动node环境
    node: true,
  },
  rules: {
    'prettier/prettier': 'error',
    'no-console': 0, // 允许console
    'no-restricted-syntax': 0, // 允许for in
  },
};
