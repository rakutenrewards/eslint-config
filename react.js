/**
 * This file contains the rules for React.
 */
const { OFF, WARNING, ERROR } = require('./constants');
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

      // Warn about console statements
      'no-console': WARNING,

      /* Base React rules */
      // Allow class methods that do not use `this`.
      'class-methods-use-this': OFF,
      // Warn when a component should be specified as a stateless function if it doesn't require state/lifecycle methods.
      'react/prefer-stateless-function': OFF,
      // Warn when there's more than one expression per line in JSX.
      'react/jsx-one-expression-per-line': OFF,

      // Allow TypeScript files to have JSX
      'react/jsx-filename-extension': [
        WARNING,
        { extensions: ['.ts', '.tsx', '.js', '.jsx'] },
      ],

      // controls whether function components need to be function declarations or arrow functions
      'react/function-component-definition': OFF,

      /* React Hooks rules */
      'react-hooks/rules-of-hooks': ERROR,
      'react-hooks/exhaustive-deps': WARNING,

      // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-danger.md
      'react/no-danger': WARNING,
      // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-danger-with-children.md
      'react/no-danger-with-children': ERROR,
    },
  },
];
