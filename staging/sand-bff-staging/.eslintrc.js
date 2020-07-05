module.exports = {
  extends: require.resolve('@jianghe/sand-lint/react/prettier'),
  rules: {
    'no-restricted-syntax': [0], // 支持for in，for of
    'no-console': [0], // 允许console
    'class-methods-use-this': [0], // class里的方法可以不使用this
    'import/no-unresolved': [0], // 可以不使用import，node项目用cjs
    'react/jsx-curly-newline': [0], // 花括号在新行
    'react/jsx-props-no-spreading': [0], // propsx允许结构
  },
};
