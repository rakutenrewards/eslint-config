/**
 * This file contains the base rules for modern Javascript.
 */
import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/.git/**'],
  },
  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      parser: await import('@babel/eslint-parser'),
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@babel': await import('@babel/eslint-plugin'),
      import: importPlugin,
    },
    rules: {
      // Base rules from @eslint/js
      ...js.configs.recommended.rules,

      // Import plugin rules
      ...importPlugin.configs.recommended.rules,

      // Custom rules
      'arrow-parens': ['error', 'always'],

      // To allow for-in and for-of.
      'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'],

      // Allow to use `_` as unused variable e.g. when unpacking an array.
      'no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '_',
        },
      ],

      // Sometimes early exit of an iteration is more readable!
      'no-continue': 'off',

      // Allow to use `_` in functions and variable names
      'no-underscore-dangle': 'off',

      // Set the max length of a line to 120 characters
      'max-len': [
        'error',
        {
          code: 120,
          // sometimes response samples are documented in the comment which is too long
          ignoreComments: true,
          // certain url could be pretty long
          ignoreStrings: true,
          // similar to the strings above
          ignoreTemplateLiterals: true,
        },
      ],

      /**
       * to allow helper functions to be defined below the core function to get an overview of the feature quickly
       * @example
       * export default function makeCake() {
       *   prepareIngredients();
       *   prepareOven();
       *   bake();
       *   pack();
       * }
       *
       * function  prepareIngredients() {
       * }
       *
       * function prepareOven() {
       * }
       *
       * function bake() {
       * }
       *
       * function pack() {
       * }
       */
      'no-use-before-define': ['error', { functions: false }],

      // Prefer destructuring unless the object has already been declared
      'prefer-destructuring': [
        'error',
        {
          VariableDeclarator: {
            object: true,
          },
        },
      ],
    },
  },
];
