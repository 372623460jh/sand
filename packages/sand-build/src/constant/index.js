// webpack服务默认启动端口
const DEFAULT_PORT = 9538;

// 构建类型枚举
const typeEnum = {
  pc: 'pc',
  mob: 'mob',
  lib: 'lib',
  demo: 'demo',
};

// 产物类型枚举
const moduleTypeEnum = {
  cjs: 'cjs',
  esm: 'esm',
  umd: 'umd',
};

// 构建方式类型
const buildTypeEnum = {
  webpack: 'webpack',
  rollup: 'rollup',
  babel: 'babel',
};

module.exports = {
  typeEnum,
  buildTypeEnum,
  DEFAULT_PORT,
  moduleTypeEnum,
};
