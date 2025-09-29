/**
 * This file contains the base rules for modern Javascript.
 */
const js = require('@eslint/js');
const importPlugin = require('eslint-plugin-import');
const { WARNING, ERROR } = require('./constants');

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

      // Set the max length of a line to 120 characters
      'max-len': [
        ERROR,
        {
          code: 120,
          // sometimes response samples are documented in the comment which is too long
          ignoreComments: true,
          // certain url could be pretty long
          ignoreStrings: true,
          // similar to the strings above
          ignoreTemplateLiterals: true,
          // certain urls could be pretty long
          ignoreUrls: true,
          // regex could be pretty long
          ignoreRegExpLiterals: true,
        },
      ],

      // disallow dangling underscores in identifiers
      // https://eslint.org/docs/rules/no-underscore-dangle
      'no-underscore-dangle': [
        ERROR,
        {
          allow: [],
          allowAfterThis: false,
          allowAfterSuper: false,
          enforceInMethodNames: true,
        },
      ],

      // disallow reassignment of function parameters
      // disallow parameter object manipulation except for specific exclusions
      // rule: https://eslint.org/docs/rules/no-param-reassign.html
      'no-param-reassign': [
        ERROR,
        {
          props: true,
          ignorePropertyModificationsFor: [
            'acc', // for reduce accumulators
            'accumulator', // for reduce accumulators
            'e', // for e.returnvalue
            'ctx', // for Koa routing
            'context', // for Koa routing
            'req', // for Express requests
            'request', // for Express requests
            'res', // for Express responses
            'response', // for Express responses
            '$scope', // for Angular 1 scopes
            'staticContext', // for ReactRouter context
          ],
        },
      ],

      // require camel case names
      camelcase: [ERROR, { properties: 'never', ignoreDestructuring: false }],

      // ensure absolute imports are above relative imports and that unassigned imports are ignored
      // https://github.com/import-js/eslint-plugin-import/blob/master/docs/rules/order.md
      // TODO: enforce a stricter convention in module import order?
      'import/order': [
        'error',
        { groups: [['builtin', 'external', 'internal']] },
      ],
    },
  },
];
