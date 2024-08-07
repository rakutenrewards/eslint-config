const { ERROR } = require('./constants');

module.exports = {
  extends: [ '.' ],
  parser: '@babel/eslint-parser',
  env: {
    node: true,
    jest: true,
  },
  rules: {
    'comma-dangle': [ERROR, 'always-multiline'],
    quotes: [ERROR, 'single'],
    strict: [ERROR, 'never'],
  }
}
