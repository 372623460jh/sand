/**
 * eslint配置
 */
module.exports = {
  extends: require.resolve('@jianghe/sand-lint/typescript/prettier'),
  globals: {
    Phaser: false,
  },
  settings: {
    // 忽略别名导致的找不到模块报错
    'import/resolver': {
      alias: {
        map: [['@', './src']],
      },
    },
  },
  rules: {
    'no-console': [0],
    '@typescript-eslint/indent': [0], // 忽略eslint的缩进校验，使用prettier
    '@typescript-eslint/no-explicit-any': [0], // 可以使用any
    '@typescript-eslint/no-empty-function': [0], // 可以使用空的箭头函数
  },
};
