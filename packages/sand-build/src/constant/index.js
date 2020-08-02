// webpack服务默认启动端口
const DEFAULT_PORT = 9538;

// 构建类型枚举
const typeEnum = {
  pc: 'pc',
  mob: 'mob',
  lib: 'lib',
  demo: 'demo',
};

// 构建类型枚举
const moduleTypeEnum = {
  cjs: 'cjs',
  esm: 'esm',
  umd: 'umd',
};

module.exports = {
  typeEnum,
  DEFAULT_PORT,
  moduleTypeEnum,
};
