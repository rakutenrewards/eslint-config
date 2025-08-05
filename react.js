/**
 * This file contains the rules for React.
 */
import { OFF, WARNING, ERROR } from './constants.js';
import airbnbReact from 'eslint-config-airbnb/rules/react';
import airbnbReactA11y from 'eslint-config-airbnb/rules/react-a11y';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';

/** @type {import('eslint').Linter.FConfig[]} */
export default [
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
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
    },
    rules: {
      // Base React rules from airbnb
      ...airbnbReact.rules,
      ...airbnbReactA11y.rules,

      /* Base React rules */
      // Allow class methods that do not use `this`.
      'class-methods-use-this': OFF,
      // Warn when a component should be specified as a stateless function if it doesn't require state/lifecycle methods.
      'react/prefer-stateless-function': OFF,
      // Warn when there's more than one expression per line in JSX.
      'react/jsx-one-expression-per-line': OFF,
      // Allow .js files to have JSX
      'react/jsx-filename-extension': [WARNING, { extensions: ['.js'] }],

      /* React Hooks rules */
      'react-hooks/rules-of-hooks': ERROR,
      'react-hooks/exhaustive-deps': WARNING,
    },
  },
];
