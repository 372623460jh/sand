// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  // 是否收集测试时的覆盖率信息
  collectCoverage: true,
  // Jest输出覆盖信息文件的目录。
  coverageDirectory: 'coverage',
  // 排除出coverage的文件列表
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/'],
};
