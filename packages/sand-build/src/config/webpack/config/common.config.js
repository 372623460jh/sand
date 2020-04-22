const babelConfig = require('./babel.config');
const { getPath } = require('../../../utils');
const { getCommonLoader } = require('./styleLoader');

function getCommonConfig(env) {
  const isDev = env === 'dev';
  return {
    output: {
      // 输出路径
      path: getPath(process.cwd(), './examples/dist'),
      filename: '[name].js',
      publicPath: '/',
    },
    rules: [{
      // js jsx
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      // @jianghe/sand-build 也需要过loader
      exclude: /node_modules(?!\/@jianghe\/sand-build)/,
      // 使用babelConfig
      options: babelConfig,
    }].concat(getCommonLoader(!isDev)),
    // 代码分离，公共js打包
    splitChunks: {},
    // 公共插件
    commonPlugin: [],
    // 别名
    alias: {},
  };
}
// postcss的规则
module.exports = getCommonConfig;
