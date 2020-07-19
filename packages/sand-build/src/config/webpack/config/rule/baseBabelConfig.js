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
        'babel-plugin-path-chunk-name', // chunk命名：动态引入的chunks使用path作为名字
        {
          delay: true,
        },
      ],
      // antd 按需加载的逻辑
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
