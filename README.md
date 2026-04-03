# eslint-config-ebates

Rakuten Rewards' shareable ESLint configuration for modern JavaScript, React, and TypeScript projects.

## Features

- **Base configuration**: Modern JavaScript with ESLint's built-in espree parser
- **React configuration**: React, JSX, and accessibility rules
- **TypeScript configuration**: TypeScript-specific linting rules
- **ESLint v10 Flat Config**: Uses the modern flat config format

## Installation

Install the package and its required peer dependencies:

```bash
yarn add -D eslint-config-ebates eslint@^10.0.0
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
- espree parser for modern JavaScript (ES2024+)
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

- Node.js `^20.19.0 || ^22.13.0 || >=24`
- ESLint `^10.0.0`

> **Note:** Some bundled plugins (`eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-import`, `eslint-plugin-jsx-a11y`) have not yet updated their `peerDependencies` to list ESLint v10 explicitly. They are compatible in practice — you may see peer-dependency warnings during installation that can be safely ignored.

## License

MIT

## Contributing

Issues and pull requests are welcome at [https://github.com/rakutenrewards/eslint-config](https://github.com/rakutenrewards/eslint-config)
