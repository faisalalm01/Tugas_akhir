module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['react'],
  rules: {
    'prettier/prettier': ['error', {endOfLine: 'auto'}],
  },
  parserOptions: {
    requireConfigFile: false,
  },
};
