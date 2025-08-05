import baseConfig from 'eslint-config-ebates';
import reactConfig from 'eslint-config-ebates/react';
import typescriptConfig from 'eslint-config-ebates/typescript';

export default [
  ...baseConfig,
  ...reactConfig,
  ...typescriptConfig,
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    rules: {
      // Add your project-specific rules here
      'no-console': 'warn',
    },
  },
];
