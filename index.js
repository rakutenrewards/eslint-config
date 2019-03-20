/**
 * This file contains the base rules for modern Javascript.
 */
const { OFF, ERROR } = require('./constants');

module.exports = {
  extends: [
    'eslint-config-airbnb-base',
    'eslint-config-airbnb-base/rules/strict',
  ].map(require.resolve),

  parser: 'babel-eslint',

  rules: {
    'arrow-parens': [ERROR, 'always'],

    // To allow for-in and for-of.
    'no-restricted-syntax': [
      ERROR,
      'LabeledStatement',
      'WithStatement',
    ],

    // Allow to use `_` as unused variable e.g. when unpacking an array.
    'no-unused-vars': [
      ERROR,
      {
        varsIgnorePattern: '_',
      },
    ],

    // Sometimes early exit of an iteration is more readable!
    'no-continue': OFF,

    // Allow to use `_` in functions and variable names
    'no-underscore-dangle': OFF,

    // Set the max length of a line to 120 characters
    'max-len': [
      ERROR,
      {
        code: 120,
      },
    ],

    // Prefer destructuring unless the object has already been declared
    'prefer-destructuring': [
      ERROR,
      {
        VariableDeclarator: {
          object: true,
        },
      },
    ],
  },
}
