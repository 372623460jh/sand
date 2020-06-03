/**
 * 有 error,common,console 3种日志
 * 报错时写入error.log中
 * 普通日志写入common.log中
 * log4js 中文文档 http://www.wangweilin.net/static/pages/log4js-node.html
 */
const log4js = require('log4js');
const path = require('path');

// 日志输出位置
const ERROR_LOG = path.resolve(__dirname, '../../../log/error');
const COMMON_LOG = path.resolve(__dirname, '../../../log/common');

// log级别为8级 ALL<TRACE<DEBUG<INFO<WARN<ERROR<FATAL<MARK<OFF。(不区分大小写)
// 日志输出类型:file文件，console控制台，dateFile按时间变化的文件（一天创建一个日志文件）
log4js.configure({
  // pm2要设置为true
  pm2: true,
  // 输出到哪
  appenders: {
    // 普通的控制台输出类型
    console: {
      type: 'console', // 日志类型
    },
    // 错误日志
    errorLog: {
      type: 'dateFile', // 日志类型
      filename: ERROR_LOG, // 日志文件
      maxLogSize: 10000000, // 日志的最大大小
      encoding: 'utf-8', // 日志编码
      pattern: '.yyyy-MM-dd.log', // 日志名后缀的模板
      alwaysIncludePattern: true, // 和pattern同时使用 设置每天生成log名
    },
    // 普通日志
    commonLog: {
      type: 'dateFile', // 日志类型文字
      filename: COMMON_LOG, // 日志文件
      maxLogSize: 10000000, // 日志的最大大小
      encoding: 'utf-8', // 日志编码
      pattern: '.yyyy-MM-dd.log', // 日志名后缀的模板
      alwaysIncludePattern: true, // 和pattern同时使用 设置每天生成log名
    },
  },
  /**
   * 日志的分类
   * default：必填当所有的日志没有匹配到对应的分类时会使用该分类进行输出
   * appenders：匹配上后使用哪些appenders
   * level：输出等级过滤
   */
  categories: {
    // 默认分类,当所有的日志没有匹配到对应的分类时会使用该分类进行输出
    default: {
      appenders: [
        'console',
      ],
      level: 'all',
    },
    // 错误日志
    errorLog: {
      // 输出源
      appenders: [
        'errorLog',
      ],
      level: 'error',
    },
    // 普通日志
    commonLog: {
      appenders: [
        'commonLog',
      ],
      level: 'info',
    },
  },
});

// 错误日志
const errorLog = log4js.getLogger('errorLog');
// 普通日志
const commonLog = log4js.getLogger('commonLog');
// 控制台日志
const defaultLog = log4js.getLogger('default');

module.exports = {
  errorLog,
  commonLog,
  defaultLog,
};
