const { factory } = require('../index');

module.exports = {
  sandConfigs: [
    factory({
      entry: './example/demo1/demo1.js',
      umd: {
        file: 'demo1.js',
      },
    }),
    factory({
      entry: './example/demo2/demo2.js',
      umd: {
        file: 'demo2.js',
      },
    }),
  ],
};
