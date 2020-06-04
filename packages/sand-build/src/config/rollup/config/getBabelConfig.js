const { getPath } = require('../../../utils');

/**
 * 获取bable配置
 * @param {*} param0
 */
function getBabelConfig({
  packagesPath, // packages文件目录，绝对路径
  pkgName,
  isUmd,
}) {
  return {
    runtimeHelpers: true,
    include: [`${getPath(packagesPath, `./${pkgName}/src/**`)}`],
    extensions: ['.js', '.ts', '.tsx', '.jsx'],
    presets: [
      '@babel/preset-typescript',
      [
        '@babel/preset-env',
        isUmd
          ? {
              modules: false,
            }
          : {
              exclude: [
                '@babel/plugin-transform-regenerator',
                '@babel/transform-async-to-generator',
              ],
              modules: false,
              targets: {
                esmodules: true,
              },
            },
      ],
      '@babel/preset-react',
    ],
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        isUmd
          ? {}
          : {
              regenerator: false,
              useESModules: true,
            },
      ],
      // 支持class
      '@babel/plugin-proposal-class-properties',
      // 支持注解
      [
        '@babel/plugin-proposal-decorators',
        {
          legacy: true,
        },
      ],
    ],
  };
}

module.exports = {
  getBabelConfig,
};
