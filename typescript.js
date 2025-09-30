/**
 * This file contains the rules for TypeScript.
 */
// const { OFF, ERROR, WARNING } = require('./constants');
const typescriptPlugin = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');
const importPlugin = require('eslint-plugin-import');

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  // we need to spread this config as it is an array and not an object
  ...typescriptPlugin.configs['flat/recommended'],
  importPlugin.flatConfigs.typescript,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        // allows TS syntax
        sourceType: 'module',
      },
    },
    rules: {},
  },
];
