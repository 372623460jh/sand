/**
 * 获取基础的babel配置
 */
function getBaseBabelConfig() {
  return {
    presets: ['@babel/react', '@babel/env'],
    plugins: [
      '@babel/transform-runtime',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-syntax-dynamic-import', // 动态引入
      [
        '@babel/plugin-proposal-decorators',
        {
          legacy: true,
        },
      ],
      [
        'path-chunk-name', // 动态引入的chunks使用path作为没名字
        {
          delay: true,
        },
      ],
      [
        'import',
        {
          libraryName: 'antd',
          libraryDirectory: 'lib',
          style: 'css',
        },
        'ant',
      ],
    ],
  };
}

module.exports = {
  getBaseBabelConfig,
};
