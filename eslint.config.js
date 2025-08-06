import baseConfig from './index.js';
import { ERROR, OFF } from './constants.js';

export default [
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
