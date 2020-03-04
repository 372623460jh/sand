const utils = require('./utils');

const { isArray, isObject } = utils;

/**
 * father-build 配置文档https://github.com/umijs/father
 * 关于 dependencies、peerDependencies 和 external
 * cjs 和 esm 格式打包方式选 rollup 时有个约定，dependencies 和 peerDependencies 里的内容会被 external
 * esm.mjs 和 umd 格式，只有 peerDenendencies 会被 external
 * 打包方式 babel 时无需考虑 external，因为是文件到文件的编译，不处理文件合并
 */
const defaultConfig = {
  /**
   * 入口
   */
  entry: '',

  /**
   * 输出类型配置, cjs 和 esm 支持 rollup 和 babel 两种打包方式，
   * rollup 是跟进 entry 把项目依赖打包在一起输出一个文件，
   * babel 是把 src 目录转化成 lib（cjs） 或 es（esm）
   */
  // 输出esm
  esm: {
    // 指定 esm 的打包类型.esm 为 rollup 或 babel 时，等同于配置了 { type: "rollup" | "babel" }。
    type: 'babel',
  },
  // 输出cjs
  cjs: {
    // 指定 cjs 的打包类型
    type: 'babel',
  },
  // 输出umd
  umd: {
    // 输入文件名
    file: '',
    // 全局配置
    globals: {},
    // 是否压缩
    minFile: true,
    // 是否同步输出sourcemap。
    sourcemap: true,
  },

  /**
   * css 扩展
   */
  // 默认是 .module.css 走 css modules，.css 不走 css modules。配置 cssModules 为 true 后，全部 css 文件都走 css modules。（less 文件同理）
  cssModules: false,
  // 提取css为单独文件
  extractCSS: true,
  // 配置参数传给 autoprefixer 无需关心要为哪些浏览器加前缀
  autoprefixer: {
    browsers: [
      'not ie < 11',
      'last 2 versions',
      '> 1%',
      'ios >= 9',
      'android >= 4',
    ],
  },
  // 配置额外的 postcss plugin。
  extraPostCSSPlugins: [],

  // 配置是 node 库还是 browser 库，只作用于语法层。所有 .tsx 和 .jsx 文件始终走 browser target。
  target: 'browser',
  // 配置额外的 babel plugin。比如配置 babel-plugin-import 按需加载 antd，
  extraBabelPlugins: [],
  // 配置需要替换的内容，基于 rollup-plugin-replace。
  replace: {},
};

/**
 * 生产配置
 * @param {*} option 选项
 * @returns 新配置
 */
function factory(option) {
  const {
    entry = '',
    umd: { file = '', globals = {} },
    extraPostCSSPlugins = [],
    target = 'browser',
    extraBabelPlugins = [],
    replace = {},
  } = option;

  if (!entry || !file) {
    throw new Error('entry,umd.file必填');
  }

  if (
    (extraPostCSSPlugins && !isArray(extraPostCSSPlugins))
    || (extraBabelPlugins && !isArray(extraBabelPlugins))
  ) {
    throw new Error('extraPostCSSPlugins或extraBabelPlugins类型不对，必须是数组');
  }

  if ((globals && !isObject(globals)) || (replace && !isObject(replace))) {
    throw new Error('umd.globals或replace类型不对，必须是对象');
  }

  if (target && !['node', 'browser'].includes(target)) {
    throw new Error('target取值只能是node, browser');
  }

  // 新配置
  const newConfig = {
    ...defaultConfig,
    entry,
    umd: {
      ...defaultConfig.umd,
      file,
      globals,
    },
    extraPostCSSPlugins,
    extraBabelPlugins,
    replace,
    target,
  };

  return newConfig;
}

module.exports = {
  factory,
};
