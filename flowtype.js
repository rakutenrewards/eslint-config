/**
 * This file contains the rules for Flowtype.
 */
const { ERROR } = require('./constants');

module.exports = {
  extends: [
    'plugin:flowtype/recommended',
  ],

  plugins: [
    'flowtype',
  ],

  rules: {
    // To be consistent with the ESLint `comma-dangle` rule.
    'flowtype/delimiter-dangle': [ERROR, 'always-multiline'],
    'flowtype/no-dupe-keys': ERROR,
    // FIXME: this rule is somehow not enforce.
    'flowtype/object-type-delimiter': [ERROR, 'comma'],
    'flowtype/require-parameter-type': [ERROR, {
      'excludeArrowFunctions': 'expressionsOnly',
    }],
    'flowtype/require-return-type': [ERROR, 'always', {
      'excludeArrowFunctions': 'expressionsOnly',
    }],
    'flowtype/require-valid-file-annotation': [ERROR, 'always', {
      annotationStyle: 'none',
    }],
    'flowtype/semi': [ERROR, 'always'],
  },

  settings: {
    flowtype: {
      onlyFilesWithFlowAnnotation: true,
    },
  },
};
