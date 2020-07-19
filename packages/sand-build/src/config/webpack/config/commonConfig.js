const { getPath } = require('../../../utils');
const { getCommonStyleLoader } = require('./rule/styleLoader');
const { getOtherLoader } = require('./rule/otherLoader');
const { getJsLoader } = require('./rule/jsLoader');
const { getTsLoader, getTsLoaderShouldBable } = require('./rule/tsLoader');
const { typeEnum } = require('../../../constant');
const { getCommonPlugin } = require('./plugin/commonPlugin');
const { logError } = require('../../../utils');

/**
 * 获取output配置
 * @param {*} opts
 */
function getOutputConfig(opts) {
  const { type = typeEnum.pc, webpackOptions = {}, env } = opts;
  const { basePath, outputPath, publicPath } = webpackOptions;
  const { prodPath = '/', devPath = '/' } = publicPath;
  const isProd = env === 'production';
  if (type === typeEnum.pc) {
    return {
      // 输出路径
      path: outputPath || getPath(basePath, './dist'),
      filename: '[name].js',
      chunkFilename: '[name].js',
      publicPath: isProd ? prodPath : devPath,
    };
  }
  if (type === typeEnum.demo) {
    return {
      // 输出路径
      path: outputPath || getPath(basePath, './dist'),
      filename: '[name].js',
      publicPath: isProd ? prodPath : devPath,
    };
  }
  if (type === typeEnum.mob) {
    return {
      // 输出路径
      path: outputPath || getPath(basePath, './dist'),
      filename: '[name].js',
      chunkFilename: '[name].js',
      publicPath: isProd ? prodPath : devPath,
    };
  }
  logError('传入的type不对，只允许传入pc/mob/demo');
  return {};
}

/**
 * 获取公共配置
 * @param {*} opts
 */
function getCommonConfig(opts) {
  const { env, webpackOptions = {} } = opts;
  const { otherRules = [], alias = {}, tsShouldBabel = false } = webpackOptions;
  const isProd = env === 'production';
  return {
    output: getOutputConfig(opts),
    rules: []
      // 获取处理js的loader
      .concat(getJsLoader(opts))
      // 获取处理ts的loader,根据是否需要babel来加载不同的loader
      .concat(tsShouldBabel ? getTsLoaderShouldBable(opts) : getTsLoader(opts))
      // 获取公共的style loader
      .concat(getCommonStyleLoader(isProd))
      // 获取图片，字体的loader
      .concat(getOtherLoader())
      // 加载opts中的其他rules
      .concat(otherRules),
    // 代码分离，公共js打包
    splitChunks: {
      cacheGroups: {
        // chunks
        //  all: 不管文件是动态还是非动态载入，统一将文件分离。当页面首次载入会引入所有的包
        //  async： 将异步加载的文件分离，首次一般不引入，到需要异步引入的组件才会引入。
        //  initial：将异步和非异步的文件分离，如果一个文件被异步引入也被非异步引入，那它会被打包两次（注意和all区别），用于分离页面首次需要加载的包。
        common: {
          // 项目基本框架等
          chunks: 'all',
          test: /(react|react-dom|react-router-dom|babel-polyfill|antd)/,
          priority: 100, // 打包优先级
          name: 'common',
        },
        // 项目静态部分资源
        vendors: {
          chunks: 'initial',
          priority: 90, // 打包优先级
          name: 'vendors',
        },
      },
    },
    // 公共插件
    commonPlugin: [].concat(getCommonPlugin(opts)),
    // 别名
    alias: {
      ...alias,
    },
  };
}

module.exports = getCommonConfig;
