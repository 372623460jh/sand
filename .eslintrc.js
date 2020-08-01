/**
 * eslint配置
 */
module.exports = {
  extends: require.resolve('@jianghe/sand-lint/typescript/prettier'),
  settings: {
    // // 忽略别名导致的找不到模块报错
    // 'import/resolver': {
    //   alias: {
    //     map: [['@', './packages/index/src']],
    //   },
    // },
  },
  rules: {
    // 不考虑遍历定义顺序
    'no-use-before-define': [0],
    // 允许console
    'no-console': [0],
    // 因为sand项目中有node工程所以允许require，后续node项目改ts
    '@typescript-eslint/no-var-requires': [0],
    // 允许使用@ts-nocheck 不校验ts文件
    '@typescript-eslint/ban-ts-comment': [0],
    // 允许ts中方法实体为空
    '@typescript-eslint/no-empty-function': [0],
    // 允许any
    '@typescript-eslint/no-explicit-any': [0],
  },
};
