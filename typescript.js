/**
 * This file contains the rules for TypeScript.
 */
// const { OFF, ERROR, WARNING } = require('./constants');
const typescriptPlugin = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');
const importPlugin = require('eslint-plugin-import');

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        // allows TS syntax
        sourceType: 'module',
      },
    },
    plugins: {
      // allows TS rule usage
      '@typescript-eslint': typescriptPlugin,
      import: importPlugin,
    },
    rules: {
      // turns on rules from their TypeScript-specific plugin
      ...typescriptPlugin.configs.recommended.rules,
      // enables ts/tsx file usage when importing modules
      ...importPlugin.flatConfigs.typescript.rules,
    },
  },
];
