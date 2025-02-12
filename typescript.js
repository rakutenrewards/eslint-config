/**
 * This file contains the rules for TypeScript.
 */
const { WARNING, OFF, ERROR } = require('./constants');

/** @type {import('eslint').Linter.LegacyConfig} */
module.exports = {
  // allows ESLint to read TS syntax
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // allows TS syntax
    sourceType: 'module',
  },
  plugins: [
    // allows TS rule usage
    '@typescript-eslint',
  ],
  extends: [
    // turns on rules from their TypeScript-specific plugin
    'plugin:@typescript-eslint/recommended',
    // enables ts/tsx file usage when importing modules
    'plugin:import/typescript',
  ],
  rules: {
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
};
