const Redis = require('ioredis');
const redisConf = require('../../common/config/redisConf');

/**
 * 根据配置实例化Redis
 */
const redis = new Redis(redisConf);
module.exports = redis;
