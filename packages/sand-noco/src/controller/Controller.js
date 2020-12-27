const getKoaInstance = require('../utils/koaInstance');

/**
 * Controller的父类
 */
class Controller {
  constructor() {
    this.tag = 'sand-noco';
    this.app = getKoaInstance();
  }
}

module.exports = Controller;
