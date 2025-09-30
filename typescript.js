/**
 * This file contains the rules for TypeScript.
 */

const tseslint = require('typescript-eslint');
const importPlugin = require('eslint-plugin-import');
const { OFF } = require('./constants');

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  ...tseslint.configs.recommended,
  importPlugin.flatConfigs.typescript,
  {
    files: ['**/*.js'],
    rules: {
      '@typescript-eslint/no-require-imports': OFF,
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {},
  },
];
