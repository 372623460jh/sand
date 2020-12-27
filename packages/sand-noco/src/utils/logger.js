/**
 * 有 error,common,console,nocoerror 4种日志
 * 报错时写入error.log中
 * 框架日志写入nocoerror.log中
 * 普通日志写入common.log中
 * log4js 中文文档 http://www.wangweilin.net/static/pages/log4js-node.html
 */
const path = require('path');
const log4js = require('log4js');

// 错误日志
let errorLog = false;

// noco框架错误日志
let nocoErrorLog = false;

// 普通日志
let commonLog = false;

// 控制台日志
let defaultLog = false;

/**
 * 生成Logger
 * @param {*} logPath 日志输出根目录
 */
function getLogger(logPath = '') {
  /**
   * 单例模式
   */
  if (errorLog && nocoErrorLog && commonLog && defaultLog) {
    return {
      errorLog,
      nocoErrorLog,
      commonLog,
      defaultLog,
    };
  }

  /**
   * 日志输出位置
   */
  const baseLogPath = logPath || path.resolve(process.cwd(), './logs');

  /**
   * 日志输出位置
   */
  const ERROR_LOG = path.resolve(baseLogPath, './error');
  const COMMON_LOG = path.resolve(baseLogPath, './common');
  const NOCO_ERROR_LOG = path.resolve(baseLogPath, './nocoerror');

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
      // noco框架错误日志
      nocoErrorLog: {
        type: 'dateFile', // 日志类型文字
        filename: NOCO_ERROR_LOG, // 日志文件
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
        appenders: ['console'],
        level: 'all',
      },
      // 错误日志
      errorLog: {
        // 输出源
        appenders: ['errorLog'],
        level: 'error',
      },
      // noco框架错误日志
      nocoErrorLog: {
        appenders: ['nocoErrorLog'],
        level: 'error',
      },
      // 普通日志
      commonLog: {
        appenders: ['commonLog'],
        level: 'info',
      },
    },
  });

  errorLog = log4js.getLogger('errorLog');
  nocoErrorLog = log4js.getLogger('nocoErrorLog');
  commonLog = log4js.getLogger('commonLog');
  defaultLog = log4js.getLogger('default');

  return {
    errorLog,
    nocoErrorLog,
    commonLog,
    defaultLog,
  };
}

module.exports = getLogger;
