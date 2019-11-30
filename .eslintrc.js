/**
 * eslint配置
 */
module.exports = {
  extends: [
    'eslint-config-airbnb',
  ].map(require.resolve),
  parser: require.resolve('babel-eslint'),
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
  },
  rules: {
    'max-len': ['error', { // 最大长度规则
      ignoreComments: true,
      ignoreStrings: true,
      ignoreUrls: true,
      ignoreRegExpLiterals: true,
      ignoreTemplateLiterals: true,
    }],
    "react/forbid-prop-types": [0], // 忽略prop-types的警告
    'no-param-reassign': [0],
    'implicit-arrow-linebreak': [0],
    'react/jsx-one-expression-per-line': [0],
    'operator-linebreak': ['error', 'before', { overrides: { '?': 'after', ':': 'after' } }],
    'func-names': [0],
    'no-unused-expressions': [0],
    'no-new': [0],
    'no-nested-ternary': [0],
    'no-underscore-dangle': [0],
    'no-console': [0],
    'prefer-const': ['error', { destructuring: 'all' }],
    'space-before-function-paren': ['error', 'never'],
    'react/no-string-refs': ['warn'],
    'jsx-a11y/no-static-element-interactions': [0],
    'jsx-a11y/img-has-alt': [0],
    'jsx-a11y/anchor-is-valid': [0],
    'class-methods-use-this': [0],
    'linebreak-style': [0],
    'import/prefer-default-export': [0],
    'no-plusplus': [0],
    'function-paren-newline': [0],
    'object-curly-newline': [0],
    'import/no-useless-path-segments': [0],
  },
};