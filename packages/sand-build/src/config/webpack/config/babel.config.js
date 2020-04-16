module.exports = {
  presets: ['@babel/react', '@babel/env'],
  plugins: [
    '@babel/transform-runtime',
    '@babel/plugin-proposal-class-properties',
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
  ],
};
