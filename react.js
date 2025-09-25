/**
 * This file contains the rules for React.
 */
const { WARNING, ERROR } = require('./constants');
const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const jsxA11yPlugin = require('eslint-plugin-jsx-a11y');
const importPlugin = require('eslint-plugin-import');

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  {
    files: ['**/*.jsx', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
    },
    rules: {
      // React plugin recommended rules
      ...reactPlugin.configs.flat.recommended.rules,
      ...reactPlugin.configs.flat['jsx-runtime'].rules,
      ...reactHooksPlugin.configs['recommended-latest'].rules,

      // JSX A11y plugin recommended rules
      ...jsxA11yPlugin.flatConfigs.recommended.rules,

      // Import plugin rules
      ...importPlugin.flatConfigs.react.rules,

      // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-danger.md
      'react/no-danger': WARNING,
      // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-danger-with-children.md
      'react/no-danger-with-children': ERROR,
    },
  },
];
