module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['react'],
  rules: {
    'react-native/no-inline-styles': 1,
    'prettier/prettier': ['error', {endOfLine: 'auto'}],
  },
  parserOptions: {
    requireConfigFile: false,
  },
};
