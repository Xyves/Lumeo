if (process.env.NODE_ENV === 'test') {
  module.exports = {
    presets: [
      '@babel/preset-env',
      '@babel/preset-react',
      '@babel/preset-typescript',
      ['next/babel'],
    ],
  };
} else {
  module.exports = {};
}
