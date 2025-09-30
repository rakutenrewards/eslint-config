const globals = require('globals');
const baseConfig = require('./index');
const { ERROR, OFF } = require('./constants');

module.exports = [
  {
    ignores: ['example/**'],
  },
  ...baseConfig,
  {
    files: ['**/*.test.js', '**/*.spec.js', '**/*.config.js'],
    languageOptions: {
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          babelrc: false,
          configFile: false,
        },
      },
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      // Allow test files to have more relaxed rules
      'no-console': OFF,
      'no-unused-vars': OFF,
      'comma-dangle': [ERROR, 'always-multiline'],
      quotes: [ERROR, 'single'],
      strict: [ERROR, 'never'],
    },
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          babelrc: false,
          configFile: false,
        },
      },
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'comma-dangle': [ERROR, 'always-multiline'],
      quotes: [ERROR, 'single'],
      strict: [ERROR, 'never'],
      'import/no-unresolved': [
        ERROR,
        {
          ignore: [
            '@typescript-eslint/eslint-plugin',
            '@typescript-eslint/parser',
            'eslint-plugin-jsx-a11y',
            'eslint-plugin-react',
            'eslint-plugin-react-hooks',
            'typescript',
          ],
        },
      ],
    },
  },
];
