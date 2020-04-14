/**
 * 获取bable配置
 * @param {*} param0
 */
function getBabelConfig({
  pathName,
  isUmd,
}) {
  return {
    runtimeHelpers: true,
    include: [`packages/${pathName}/src/**`],
    extensions: ['.js', '.ts', '.tsx'],
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
      '@babel/plugin-proposal-class-properties',
    ],
  };
}

module.exports = {
  getBabelConfig,
};
