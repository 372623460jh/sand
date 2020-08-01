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

export default {
  error,
  log,
};
