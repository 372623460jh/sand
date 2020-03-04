const { factory } = require('../index');

module.exports = {
  sandConfigs: [
    factory({
      entry: './example/src/index.js',
      umd: {
        file: 'sand-build.js',
      },
      target: 'node',
    }),
  ],
};
