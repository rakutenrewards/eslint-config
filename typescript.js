/**
 * This file contains the rules for TypeScript.
 */
const { WARNING } = require('./constants');

/** @type {import('eslint').Linter.LegacyConfig} */
module.exports = {
  // allows ESLint to read TS syntax
  parser: '@typescript-eslint/parser',
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
    // Allow TypeScript files to have JSX
    'react/jsx-filename-extension': [
      WARNING,
      { extensions: ['.ts', '.tsx', '.js', '.jsx'] },
    ],
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
  },
};
