import baseConfig from './index.js';

export default [
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
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        jest: 'readonly',
      },
    },
    rules: {
      // Allow test files to have more relaxed rules
      'no-console': 'off',
      'no-unused-vars': 'off',
      'comma-dangle': ['error', 'always-multiline'],
      quotes: ['error', 'single'],
      strict: ['error', 'never'],
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
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
      },
    },
    rules: {
      'comma-dangle': ['error', 'always-multiline'],
      quotes: ['error', 'single'],
      strict: ['error', 'never'],
    },
  },
];
