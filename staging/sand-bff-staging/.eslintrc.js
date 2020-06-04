module.exports = {
  extends: require.resolve('@jianghe/sand-lint/react'),
  env: {
    // 忽略jest报错
    jest: true,
  },
  rules: {
    'no-restricted-syntax': [0], // 支持for in，for of
    'no-console': [0], // 允许console
    'class-methods-use-this': [0], // class里的方法可以不使用this
  },
};
