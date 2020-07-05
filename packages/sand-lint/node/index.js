/**
 * eslint-node配置
 */
module.exports = {
  extends: ['eslint-config-airbnb-base'],
  parser: require.resolve('babel-eslint'),
  env: {
    // 忽略jest报错
    jest: true,
    // 启动node环境
    node: true,
  },
  rules: {
    'no-console': 0, // 允许console
    'no-restricted-syntax': 0, // 允许for in
  },
};
