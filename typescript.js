/**
 * This file contains the rules for TypeScript.
 */
import { WARNING, OFF, ERROR } from './constants.js';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';

/** @type {import('eslint').Linter.Config[]} */
export default [
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
        'error',
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
