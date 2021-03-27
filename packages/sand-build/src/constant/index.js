// webpack服务默认启动端口
const DEFAULT_PORT = 9538;

// 构建类型枚举
const typeEnum = {
  webpack: 'webpack',
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

// 构建配置文件名
const buildConfigFileName = 'sandbuildrc';

// 需要处理的文件
const extensions = ['.js', '.jsx', '.ts', '.tsx', '.es6', '.es', '.mjs'];

module.exports = {
  typeEnum,
  buildTypeEnum,
  DEFAULT_PORT,
  moduleTypeEnum,
  buildConfigFileName,
  extensions,
};
