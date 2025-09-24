/**
 * This file contains the rules for TypeScript.
 */
const { WARNING, OFF, ERROR } = require('./constants');
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
      ...importPlugin.configs.typescript.rules,

      // this is disabled by default when using `plugin:import/typescript`
      'import/named': ERROR,
      'import/extensions': [
        ERROR,
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],
      // Allow TypeScript files to have JSX
      'react/jsx-filename-extension': [
        WARNING,
        { extensions: ['.ts', '.tsx', '.js', '.jsx'] },
      ],
      // controls whether function components need to be function declarations or arrow functions
      'react/function-component-definition': OFF,
      '@typescript-eslint/no-empty-object-type': OFF,
    },
  },
];
