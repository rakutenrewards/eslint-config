/**
 * This file contains the rules for TypeScript.
 */

const tseslint = require('typescript-eslint');
const importPlugin = require('eslint-plugin-import');
const { OFF, ERROR, WARNING } = require('./constants');

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

      // the recommended configs for typescript-eslint doesn't have this rule
      'no-shadow': OFF, // replaced by ts-eslint rule below
      '@typescript-eslint/no-shadow': ERROR,

      '@typescript-eslint/explicit-module-boundary-types': OFF,

      /**
       * allow the use of `any` type, but warn about it.
       *
       * TODO: turn this to ERROR in the future major version bump.
       */
      '@typescript-eslint/no-explicit-any': WARNING,
      /**
       * we no longer need to import React in files that use JSX,
       * so we warn about it to avoid excessive import errors.
       *
       * TODO: turn this to ERROR in the future major version bump.
       */
      '@typescript-eslint/no-unused-vars': WARNING,

      '@typescript-eslint/no-empty-object-type': [
        ERROR,
        { allowInterfaces: 'with-single-extends' },
      ],
    },
  },
];
