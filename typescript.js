/**
 * This file contains the rules for TypeScript.
 */
const { WARNING } = require('./constants');

module.exports = {
    // allows ESLint to read TS syntax
    parser: '@typescript-eslint/parser',
    plugins: [
        // allows TS rule usage
        '@typescript-eslint',
    ],
    extends: [
        // disables a few of the recommended rules from the previous set that we know are already covered by TypeScript's typechecker
        'plugin:@typescript-eslint/eslint-recommended',
        // turns on rules from their TypeScript-specific plugin
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        // Allow TypeScript files to have JSX
        'react/jsx-filename-extension': [WARNING, { 'extensions': ['.ts', '.tsx', '.js', '.jsx'] }],
    },
};
