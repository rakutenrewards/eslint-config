const { ERROR } = require('./constants');

/** @type {import('eslint').Linter.LegacyConfig} */
module.exports = {
  extends: ['.'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      babelrc: false,
      configFile: false,
    },
  },
  env: {
    node: true,
    jest: true,
  },
  rules: {
    'comma-dangle': [ERROR, 'always-multiline'],
    quotes: [ERROR, 'single'],
    strict: [ERROR, 'never'],
  },
};
