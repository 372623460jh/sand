/**
 * react eslint配置
 */
module.exports = {
  extends: ['eslint-config-airbnb', 'prettier'],
  parser: require.resolve('babel-eslint'),
  plugins: ['prettier'],
  globals: {
    document: false,
    window: false,
  },
  env: {
    // 忽略jest报错
    jest: true,
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
  },
  rules: {
    'prettier/prettier': 'error',
    'max-len': [
      'error',
      {
        // 最大长度规则
        ignoreComments: true, // 忽略注释
        ignoreStrings: true, // 忽略字符串
        ignoreUrls: true, // 忽略url
        ignoreRegExpLiterals: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'jsx-a11y/no-static-element-interactions': [0],
    'jsx-a11y/img-has-alt': [0],
    'jsx-a11y/anchor-is-valid': [0],
    'no-plusplus': [0], // 允许++ --
    'import/prefer-default-export': [0], // 允许没有default export
    'react/static-property-placement': [0], // 禁止propType放到class内部报错
    'react/state-in-constructor': [0], // 允许state不在constructor中定义
    'no-param-reassign': [0], // 允许对函数入参进行操作
    'react/forbid-prop-types': [0], // prop-types允许使用object，any等
    'react/jsx-wrap-multilines': [0], // 单个jsx元素外包裹括号
    'react/jsx-curly-newline': [0], // 花括号在新行
    'react/jsx-props-no-spreading': [0], // propsx允许结构
    // 允许'.js', '.jsx', '.tsx', '.ts'中有jsx语法
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.tsx', '.ts'] },
    ],
  },
};
