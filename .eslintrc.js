const { ERROR } = require('./constants');

module.exports = {
  parser: 'babel-eslint',

  env: {
    node: true,
  },

  rules: {
    'comma-dangle': [ERROR, 'always-multiline'],
    quotes: [ERROR, 'single'],
    strict: [ERROR, 'never'],
  }
}
