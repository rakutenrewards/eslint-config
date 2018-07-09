/**
 * This file contains the rules for React.
 */
const { OFF } = require('./constants');

module.exports = {
  extends: [
    'react-app',
  ],

  rules: {
    // Allow class methods that do not use `this`.
    'class-methods-use-this': OFF,
  },
};
