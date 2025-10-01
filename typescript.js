/**
 * This file contains the rules for TypeScript.
 */

const tseslint = require('typescript-eslint');
const importPlugin = require('eslint-plugin-import');
const { OFF, ERROR } = require('./constants');

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  ...tseslint.configs.recommended,
  importPlugin.flatConfigs.typescript,
  {
    files: ['**/*.js'],
    rules: {
      // for some reason, this gets enabled by default, which is not ideal for JS files
      '@typescript-eslint/no-require-imports': OFF,
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      // the recommended configs for typescript-eslint doesn't have this rule
      // https://github.com/typescript-eslint/typescript-eslint/issues/2502#issuecomment-689595020
      'no-use-before-define': OFF,
      '@typescript-eslint/no-use-before-define': [
        ERROR,
        {
          functions: false,
        },
      ],
    },
  },
];
