/**
 * This file contains the rules for TypeScript.
 */
const { WARNING } = require('./constants');

module.exports = {
    rules: {
        // Allow TypeScript files to have JSX
        'react/jsx-filename-extension': [WARNING, { 'extensions': ['.ts', '.tsx', '.js', '.jsx'] }],
    },
};
