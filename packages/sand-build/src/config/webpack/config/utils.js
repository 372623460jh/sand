const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { getPath } = require('../../../utils');

/**
 * 遍历examples下的页面输出成
 * {
 *   'todolist/todolist':{
 *     'html': 'examples/todolist/todolist-entry.html',
 *     'entry': 'examples/todolist/todolist-entry.jsx',
 *   }
 * }
 */
function getEntryMap(basePath) {
  // *(entry.js|entry.jsx|entry.html) 表示匹配中其中额一个或多个
  const files = glob.sync(`${basePath}/**/*-*(entry.js|entry.jsx|entry.html)`);
  const regHtml = /\.html$/;
  const regAll = /-entry\.(jsx|html|js)$/;
  const entryMap = {
    index: {
      html: getPath(__dirname, '../common/index-entry.html'),
      entry: getPath(__dirname, '../common/index-entry.js'),
    },
  };
  for (let index = 0; index < files.length; index++) {
    const filePath = files[index];
    // 生成唯一标识页面的entryName
    // examples/todolist/todolist-entry.html => todolist/todolist
    const entryName = filePath.replace(`${basePath}/`, '').replace(regAll, '');
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
 */
function getWebpackEntry(entryMap) {
  const entryMapArr = Object.keys(entryMap);
  const webpackEntry = {};
  for (let index = 0; index < entryMapArr.length; index++) {
    const entryName = entryMapArr[index];
    if (entryMap[entryName].html && entryMap[entryName].entry) {
      // 既有html又有entry是一个鉴权的entry
      webpackEntry[entryName] = [
        // 绝对路径
        entryMap[entryName].entry,
        // 每一个entry,在后面加入webpack-hot-middleware/client?noInfo=true&reload=true从而实现浏览器自动刷新
        'webpack-hot-middleware/client?noInfo=true&timeout=20000&reload=true&quiet=true',
      ];
    }
  }
  return webpackEntry;
}

// 获取HtmlWebpackPlugin数组
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
          chunks: [entryName], // 在多入口中，可以决定引用哪些编译后的js文件
          chunksSortMode: 'dependency', // 对编译后的多个js 进行引用排序，1 dependency/依赖关系排序；2 auto; 3 none; 4: function;
          hash: true, // 给编译的js加？hash 用于清楚缓存  //<script type=text/javascript src=bundle.js?22b9692e22e7be37b57e></script>
          params: { // 输出到html中的参数
            title: 'sand-space',
          },
          title: entryName,
        }),
      );
    }
  }
  return htmlWebpackPluginArr;
}

module.exports = {
  getEntryMap,
  getWebpackEntry,
  getHtmlWebpackPlugin,
};
