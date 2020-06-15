module.exports = {
  apps: [
    // 生产环境
    {
      name: 'sand-bff',
      // 项目启动入口文件
      script: './app/index.js',
      // // 监听
      // watch: true,
      // 启用多少个实例
      instances: 1,
      // 项目环境变量
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
        PORT: 9539,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 9539,
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 9539,
      },
    },
  ],
};
