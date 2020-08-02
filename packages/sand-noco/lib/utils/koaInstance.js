const Koa = require('koa');

let koaInstance = null;

/**
 * 实例化Koa，单例模式
 */
function getKoaInstance() {
  if (!koaInstance) {
    koaInstance = new Koa();
    return koaInstance;
  }
  return koaInstance;
}

module.exports = getKoaInstance;
