# eslint-config-ebates

Rakuten Rewards' shareable ESLint configuration for modern JavaScript, React, and TypeScript projects.

## Features

- **Base configuration**: Modern JavaScript with Babel parser support
- **React configuration**: React, JSX, and accessibility rules
- **TypeScript configuration**: TypeScript-specific linting rules
- **ESLint v9 Flat Config**: Uses the modern flat config format

## Installation

Install the package and its required peer dependencies:

```bash
yarn add -D eslint-config-ebates eslint@^9.0.0 @babel/core@^7.28.0
```

That's it! All ESLint plugins (including React, TypeScript, and import plugins) are bundled with the package.

## Usage

### Base Configuration

Create an `eslint.config.js` file in your project root:

```js
import baseConfig from 'eslint-config-ebates';

export default [
  ...baseConfig,
];
```

### With React

```js
import baseConfig from 'eslint-config-ebates';
import reactConfig from 'eslint-config-ebates/react';

export default [
  ...baseConfig,
  ...reactConfig,
];
```

### With TypeScript

```js
import baseConfig from 'eslint-config-ebates';
import typescriptConfig from 'eslint-config-ebates/typescript';

export default [
  ...baseConfig,
  ...typescriptConfig,
];
```

### Full Stack (Base + React + TypeScript)

```js
import baseConfig from 'eslint-config-ebates';
import reactConfig from 'eslint-config-ebates/react';
import typescriptConfig from 'eslint-config-ebates/typescript';

export default [
  ...baseConfig,
  ...reactConfig,
  ...typescriptConfig,
];
```

### Custom Rules

Add your own rules after the base configurations:

```js
import baseConfig from 'eslint-config-ebates';

export default [
  ...baseConfig,
  {
    files: ['**/*.js', '**/*.jsx'],
    rules: {
      'no-console': 'error',
    },
  },
];
```

## What's Included

### Base Rules

- ESLint recommended rules
- Babel parser for modern JavaScript
- Import plugin for module validation
- Code style rules (max line length, camelCase, etc.)
- Best practices (no-param-reassign, no-alert, etc.)

### React Rules

- React recommended rules
- JSX runtime configuration (no React import required)
- React Hooks rules
- Accessibility (a11y) rules
- Prevents common React anti-patterns
- Detects unnecessary useEffect usage and suggests better alternatives

### TypeScript Rules

- TypeScript recommended rules
- TypeScript-specific parser and plugin
- Proper handling of TypeScript syntax
- Import resolution for TypeScript files

## Examples

See the [example/](./example) directory for complete configuration examples.

## Requirements

- Node.js `^20.15.0`
- ESLint `^9.0.0`

## License

MIT

## Contributing

Issues and pull requests are welcome at [https://github.com/rakutenrewards/eslint-config](https://github.com/rakutenrewards/eslint-config)
