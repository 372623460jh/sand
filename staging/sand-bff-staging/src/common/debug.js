import debug from 'debug';

/**
 * 控制台日志输出工具
 */
if (process.env.NODE_ENV !== 'production') {
  try {
    // 不打印xhr日志
    window.localStorage.debug = '*,-sockjs-client:*';
  } catch {
    // nothing
  }
}

const error = debug('sand-error:>');
const log = debug('sand-log:>');
const req = debug('sand-req:>');
const res = debug('sand-res:>');

export default {
  error,
  log,
  req,
  res,
};
