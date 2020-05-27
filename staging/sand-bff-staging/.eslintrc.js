// /**
//  * eslint配置
//  */
// module.exports = {
//   extends: [
//     'eslint-config-airbnb-base',
//   ].map(require.resolve),
//   parser: require.resolve('babel-eslint'),
//   env: {
//     // 忽略jest报错
//     jest: true,
//     // 启动node环境
//     node: true
//   },
//   rules: {
//     'no-console': 0, // 允许console
//     'no-restricted-syntax': 0, // 允许for in
//   },
// };
module.exports = {
  extends: require.resolve('@jianghe/sand-lint/react'),
  env: {
    // 忽略jest报错
    jest: true,
  },
  rules: {
    'no-restricted-syntax': [0], // 支持for in，for of
    'no-console': [0], // 允许console
  },
};
