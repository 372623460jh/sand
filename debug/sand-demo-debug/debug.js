/* eslint-disable no-unused-vars */
/**
 * 调试方法
 */
const path = require('path');
const { start, build } = require('../../packages/sand-build/src');

// /**
//  * start debug
//  */
// start({
//   type: 'demo',
//   // 指定sandbuildrc入口
//   sandbuildrcPath: path.resolve(__dirname, './.sandbuildrc.js'),
// });

/**
 * build debug
 */
build({
  type: 'demo',
  sandbuildrcPath: path.resolve(__dirname, './.sandbuildrc.js'),
});
