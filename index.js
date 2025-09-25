/**
 * This file contains the base rules for modern Javascript.
 */
const js = require('@eslint/js');
const importPlugin = require('eslint-plugin-import');
const { WARNING, ERROR } = require('./constants');

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/.git/**'],
  },
  {
    languageOptions: {
      parser: require('@babel/eslint-parser'),
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@babel': require('@babel/eslint-plugin'),
      import: importPlugin,
    },
    rules: {
      // Base rules from @eslint/js
      ...js.configs.recommended.rules,

      // Import plugin rules
      ...importPlugin.flatConfigs.recommended.rules,

      'no-console': WARNING,

      // Set the max length of a line to 120 characters
      'max-len': [
        ERROR,
        {
          code: 120,
          // sometimes response samples are documented in the comment which is too long
          ignoreComments: true,
          // certain url could be pretty long
          ignoreStrings: true,
          // similar to the strings above
          ignoreTemplateLiterals: true,
          // certain urls could be pretty long
          ignoreUrls: true,
          // regex could be pretty long
          ignoreRegExpLiterals: true,
        },
      ],

      // disallow dangling underscores in identifiers
      // https://eslint.org/docs/rules/no-underscore-dangle
      'no-underscore-dangle': [
        ERROR,
        {
          allow: [],
          allowAfterThis: false,
          allowAfterSuper: false,
          enforceInMethodNames: true,
        },
      ],
    },
  },
];
