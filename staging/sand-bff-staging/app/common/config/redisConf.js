/**
 * redis配置
 */
const redisConfig = {
  // Redis host
  host: '127.0.0.1',
  // Redis port
  port: 6379,
  // 存储key的前缀可以防止key冲突 可以加sand:
  keyPrefix: '',
  // ipv4
  family: 4,
  // 哪个库: DB0
  db: 0,
  // 密码
  // password: '',
};

module.exports = redisConfig;
