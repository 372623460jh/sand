/* eslint-disable no-unused-vars */
/**
 * 调试方法
 */
const path = require('path');
const { start, build } = require('../../packages/sand-build/src');

start({
  type: 'pc',
  sandbuildrcPath: path.resolve(__dirname, './.sandbuildrc.js'),
});

// build({
//   type: 'pc',
//   sandbuildrcPath: path.resolve(__dirname, './.sandbuildrc.js'),
// });
