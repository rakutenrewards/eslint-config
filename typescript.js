/**
 * This file contains the rules for TypeScript.
 */
// const { OFF, ERROR, WARNING } = require('./constants');

const tseslint = require('typescript-eslint');
const importPlugin = require('eslint-plugin-import');

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  tseslint.configs.recommended,
  importPlugin.flatConfigs.typescript,
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {},
  },
];
