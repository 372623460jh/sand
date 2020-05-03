/* eslint-disable no-unused-vars */
/**
 * 调试方法
 */
const path = require('path');
const { build } = require('../../packages/sand-build/src');

// build({
//   watch: false,
//   link: false,
//   env: 'development',
//   type: 'lib',
//   sandbuildrcPath: path.resolve(__dirname, './.sandbuildrc.js'),
// });

// build({
//   watch: true,
//   link: false,
//   env: 'development',
//   type: 'lib',
//   sandbuildrcPath: path.resolve(__dirname, './.sandbuildrc.js'),
// });

// build({
//   watch: false,
//   link: true,
//   env: 'development',
//   type: 'lib',
//   sandbuildrcPath: path.resolve(__dirname, './.sandbuildrc.js'),
// });

build({
  watch: false,
  link: false,
  env: 'production',
  type: 'lib',
  sandbuildrcPath: path.resolve(__dirname, './.sandbuildrc.js'),
});
