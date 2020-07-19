const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { getPath, logError } = require('../../../utils');

/**
 * 遍历basePath/examples下的页面输出成
 * {
 *   'todolist/todolist':{
 *     'html': 'examples/todolist/todolist-entry.html',
 *     'entry': 'examples/todolist/todolist-entry.jsx',
 *   }
 * }
 * @param {*} opts
 */
function getEntryMap(opts) {
  const { webpackOptions = {} } = opts;
  const { basePath, entry, entryHtml } = webpackOptions;
  const examplesPath = getPath(basePath, './examples');
  const relativePath = examplesPath.replace(`${process.cwd()}/`, '');
  // *(entry.js|entry.jsx|entry.html|entry.ts|entry.tsx) 表示匹配中其中额一个或多个
  const files = glob.sync(
    `${relativePath}/**/*-*(entry.js|entry.jsx|entry.html|entry.ts|entry.tsx)`
  );
  const regHtml = /\.html$/;
  const regAll = /-entry\.(jsx|html|js|ts|tsx)$/;
  if (!entryHtml || !entry) {
    logError('entryHtml,entry必填');
  }
  const entryMap = {
    index: {
      html: entryHtml,
      entry,
    },
  };
  for (let index = 0; index < files.length; index++) {
    const filePath = files[index];
    // 生成唯一标识页面的entryName
    // examples/todolist/todolist-entry.html => todolist/todolist
    const entryName = filePath
      .replace(`${relativePath}/`, '')
      .replace(regAll, '');
    // 用于标记是html还是entry
    const flog = regHtml.test(filePath) ? 'html' : 'entry';
    if (entryMap[entryName]) {
      // 已经存在覆盖
      entryMap[entryName][flog] = getPath(process.cwd(), `./${filePath}`);
    } else {
      entryMap[entryName] = {
        [flog]: getPath(process.cwd(), `./${filePath}`),
      };
    }
  }
  return entryMap;
}

/**
 * 根据entryMap生成 webpack entryMap
 * @param {*} entryMap
 * @param {*} opts
 */
function getWebpackEntry(entryMap, opts) {
  const { env } = opts;
  const entryMapArr = Object.keys(entryMap);
  const webpackEntry = {};
  for (let index = 0; index < entryMapArr.length; index++) {
    const entryName = entryMapArr[index];
    if (entryMap[entryName].html && entryMap[entryName].entry) {
      if (env === 'development') {
        // 既有html又有entry是一个鉴权的entry
        webpackEntry[entryName] = [
          // 绝对路径
          entryMap[entryName].entry,
          // 每一个entry,在后面加入webpack-hot-middleware/client?noInfo=true&reload=true从而实现浏览器自动刷新
          // dynamicPublicPath设置为true使用webpack publicPath作为前缀path,可以__webpack_public_path__在入口点的运行时动态设置
          'webpack-hot-middleware/client?path=__webpack_hmr&noInfo=true&timeout=20000&reload=true&quiet=true&dynamicPublicPath=true',
        ];
      } else {
        // 既有html又有entry是一个鉴权的entry
        webpackEntry[entryName] = [
          // 绝对路径
          entryMap[entryName].entry,
        ];
      }
    }
  }
  return webpackEntry;
}

/**
 * sand-demo获取HtmlWebpackPlugin数组
 * @param {*} entryMap
 * @param {*} opts
 */
function getHtmlWebpackPlugin(entryMap) {
  const entryMapArr = Object.keys(entryMap);
  const htmlWebpackPluginArr = [];
  for (let index = 0; index < entryMapArr.length; index++) {
    const entryName = entryMapArr[index];
    if (entryMap[entryName].html && entryMap[entryName].entry) {
      htmlWebpackPluginArr.push(
        new HtmlWebpackPlugin({
          filename: `${entryName}.html`, // 输出文件名
          template: entryMap[entryName].html,
          inject: 'body', // 打包js注入到模板中的位置， true(body)/注入到body底部；head/script插入到head中， false/不往模板中插入js,
          chunks: ['vendors', 'common', entryName], // 在多入口中，可以决定引用哪些编译后的js文件
          chunksSortMode: 'auto', // 对编译后的多个js 进行引用排序，1 auto; 2 none; 3 function;
          hash: true, // 给编译的js加？hash 用于清楚缓存  //<script type=text/javascript src=bundle.js?22b9692e22e7be37b57e></script>
          // minify 的作用是对 html 文件进行压缩
          minify: {
            removeAttributeQuotes: false, // 对属性的引号进行删除
            minifyJS: true,
            minifyCSS: true,
          },
          params: {},
        })
      );
    }
  }
  return htmlWebpackPluginArr;
}

/**
 * 获取sand-pc WebpackPlugin
 * @param {*}
 */
function getSandWebpackPlugin(opts) {
  const { webpackOptions = {} } = opts;
  const { entryHtml } = webpackOptions;
  if (!entryHtml) {
    logError('entryHtml必填');
  }
  return [
    new HtmlWebpackPlugin({
      filename: 'index.html', // 输出文件名
      template: entryHtml,
      inject: 'body', // 打包js注入到模板中的位置， true(body)/注入到body底部；head/script插入到head中， false/不往模板中插入js,
      chunks: ['vendors', 'common'], // 在多入口中，可以决定引用哪些编译后的js文件
      chunksSortMode: 'auto', // 对编译后的多个js 进行引用排序，1 auto; 2 none; 3 function;
      hash: true, // 给编译的js加？hash 用于清楚缓存  //<script type=text/javascript src=bundle.js?22b9692e22e7be37b57e></script>
      // minify 的作用是对 html 文件进行压缩
      minify: {
        removeAttributeQuotes: false, // 对属性的引号进行删除
        minifyJS: true,
        minifyCSS: true,
      },
      params: {},
    }),
  ];
}

/**
 * 获取sand-pc entry
 * @param {*}
 */
function getSandEntry(opts) {
  const { env, webpackOptions } = opts;
  const { entry = '' } = webpackOptions;
  if (!entry) {
    logError('entry必填');
  }
  const vendors = [entry];
  if (env === 'development') {
    // 每一个entry,在后面加入webpack-hot-middleware/client?noInfo=true&reload=true从而实现浏览器自动刷新
    // dynamicPublicPath设置为true使用webpack publicPath作为前缀path,可以__webpack_public_path__在入口点的运行时动态设置
    vendors.push(
      'webpack-hot-middleware/client?path=__webpack_hmr&noInfo=true&timeout=20000&reload=true&quiet=true&dynamicPublicPath=true'
    );
  }
  return {
    vendors,
  };
}

module.exports = {
  getEntryMap,
  getWebpackEntry,
  getHtmlWebpackPlugin,
  getSandEntry,
  getSandWebpackPlugin,
};
