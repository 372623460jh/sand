const getKoaInstance = require('../utils/koaInstance');

/**
 * Controller的父类
 */
class Controller {
  constructor() {
    const app = getKoaInstance();
    this.tag = 'sand-noco';
    this.app = app;
  }
}

module.exports = Controller;
