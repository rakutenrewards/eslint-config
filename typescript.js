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
      // for some reason, this gets enabled by default, which is not ideal for JS files
      '@typescript-eslint/no-require-imports': OFF,
    },
  },
];
