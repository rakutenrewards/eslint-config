/**
 * This file contains the rules for React.
 */
const { OFF, WARNING, ERROR } = require('./constants');

module.exports = {
  extends: [
    // So we can appropriately have our base rules override airbnb's, we'll need to extend the react rules the same way
    // eslint-config-airbnb does internally.
    // Reference: https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v17.1.0/packages/eslint-config-airbnb/index.js
    'airbnb/rules/react',
    'airbnb/rules/react-a11y',
  ],
  plugins: ['react-hooks'],
  rules: {
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
};
