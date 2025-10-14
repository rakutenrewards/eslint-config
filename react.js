/**
 * This file contains the rules for React.
 */
const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const jsxA11yPlugin = require('eslint-plugin-jsx-a11y');
const importPlugin = require('eslint-plugin-import');
const { WARNING, ERROR, OFF } = require('./constants');

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  reactHooksPlugin.configs.flat.recommended,
  jsxA11yPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.react,
  {
    settings: {
      react: {
        version: 'detect',
        defaultVersion: '18.3',
      },
    },
  },
  {
    files: ['**/*.jsx', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-danger.md
      'react/no-danger': WARNING,
      // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-danger-with-children.md
      'react/no-danger-with-children': ERROR,

      // Prevent usage of Array index in keys
      // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md
      'react/no-array-index-key': ERROR,
    },
  },
  // TypeScript + React files (with JSX)
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      'react/jsx-filename-extension': OFF,

      // https://github.com/yannickcr/eslint-plugin-react/issues/2396
      // `defaultProps` rule to be deprecated on function components.
      // we turn it off for ts, and may turn it off for all when it's deprecated.
      'react/require-default-props': OFF,
      // https://github.com/yannickcr/eslint-plugin-react/issues/2353
      'react/prop-types': OFF,
    },
  },
  {
    files: ['**/*.{test,spec}.{js,jsx,ts,tsx}'],
    rules: {
      'react/display-name': OFF,
    },
  },
];
