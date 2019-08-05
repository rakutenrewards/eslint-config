const { ERROR } = require('./constants');

module.exports = {
  parser: 'babel-eslint',

  env: {
    node: true,
  },

  rules: {
    'comma-dangle': [ERROR, 'always-multiline'],
    quotes: [ERROR, 'single'],
    strict: [ERROR, 'never'],
    'max-len': [ERROR, { 
      'code': 120,
      // sometimes we are providing a json response sample in the comment which is too long
      'ignoreComments': true,
      // certain url could be pretty long
      'ignoreStrings': true,
      // similar to the string above
      'ignoreTemplateLiterals': true
    }],
    // to allow helper functions to be defined below the core function to get an overview of the feature quickly
    'no-use-before-define': [ERROR, { 'functions': false }],
  }
}
