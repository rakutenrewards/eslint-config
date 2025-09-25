/**
 * This file contains the base rules for modern Javascript.
 */
const js = require('@eslint/js');
const importPlugin = require('eslint-plugin-import');
const { WARNING } = require('./constants');

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
    },
  },
];
