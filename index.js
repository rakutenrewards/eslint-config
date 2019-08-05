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
        // sometimes response samples are documented in the comment which is too long
        'ignoreComments': true,
        // certain url could be pretty long
        'ignoreStrings': true,
        // similar to the strings above
        'ignoreTemplateLiterals': true
      },
    ],

    /**
     * to allow helper functions to be defined below the core function to get an overview of the feature quickly
     * @example
     * export default function makeCake() {
     *   prepareIngredients();
     *   prepareOven();
     *   bake();
     *   pack();
     * }
     * 
     * function  prepareIngredients() {
     * }
     * 
     * function prepareOven() {
     * }
     * 
     * function bake() {
     * }
     * 
     * function pack() {
     * }
     */
    'no-use-before-define': [ERROR, { 'functions': false }],

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
