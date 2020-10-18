/**
 * 获取基础的babel配置
 */
function getWebpackBabelConfig() {
  return {
    presets: ['@babel/react', '@babel/env'],
    plugins: [
      '@babel/transform-runtime',
      '@babel/plugin-proposal-class-properties',
      // 动态引入
      '@babel/plugin-syntax-dynamic-import',
      [
        '@babel/plugin-proposal-decorators',
        {
          legacy: true,
        },
      ],
      // chunk命名：动态引入的chunks使用path作为名字
      [
        'babel-plugin-path-chunk-name',
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
  getWebpackBabelConfig,
};
