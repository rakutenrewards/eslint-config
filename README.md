[![Build Status](https://travis-ci.org/ebates-inc/eslint-config.svg?branch=master)](https://travis-ci.org/ebates-inc/eslint-config)

# eslint-config-ebates

This package provides ESLint [shareable configs](https://eslint.org/docs/developer-guide/shareable-configs) which allow us to
maintain a consistent coding style across our Javascript repositories.

Our base configuration, `ebates`, extends [@eslint/js](https://eslint.org/docs/latest/use/configure/configuration-files-new#using-predefined-configurations) recommended rules with additional custom rules for consistent coding style.
We also provide configuration for other environments:

- `ebates/react`
- `ebates/typescript`

## ESLint v9 Flat Config Support

This package now supports ESLint v9 with the new Flat Config format. The configuration files are now ES modules and use the modern Flat Config structure.

## Installation

### Required Dependencies

This package requires the following peer dependencies to be installed in your project:

```bash
# Install ESLint v9
npm install --save-dev eslint@^9.0.0

# Install Babel dependencies (for JavaScript parsing)
npm install --save-dev @babel/core@^7.28.0

# Install import plugin (optional but recommended)
npm install --save-dev eslint-plugin-import@^2.32.0
```

Or with Yarn:

```bash
# Install ESLint v9
yarn add -D eslint@^9.0.0

# Install Babel dependencies (for JavaScript parsing)
yarn add -D @babel/core@^7.28.0

# Install import plugin (optional but recommended)
yarn add -D eslint-plugin-import@^2.32.0
```

### For ESLint v9 (Flat Config)

Create an `eslint.config.js` file:

```js
import baseConfig from 'eslint-config-ebates';

export default [
  ...baseConfig,
  // your additional configs...
];
```

### For ESLint v8 (Legacy Config)

In `.eslintrc.js`, simply add:

```js
module.exports = {
  extends: 'ebates',
  // ...
};
```

## Other configurations

Other configurations require dependencies listed as optional. First, install the main package as noted in the previous
section. Then run the following command to check the supported version to install.

```bash
npm info "eslint-config-ebates@latest" optionalDependencies
```

### React

- Requirements:
  - [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react)
  - [eslint-plugin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y)
  - [eslint-plugin-react-hooks](https://github.com/facebook/react/tree/master/packages/eslint-plugin-react-hooks)

Run

```bash
# Install React plugin dependencies
npm install --save-dev eslint-plugin-jsx-a11y@^6.10.2 eslint-plugin-react@^7.37.5 eslint-plugin-react-hooks@^5.2.0
```

Or with Yarn:

```bash
# Install React plugin dependencies
yarn add -D eslint-plugin-jsx-a11y@^6.10.2 eslint-plugin-react@^7.37.5 eslint-plugin-react-hooks@^5.2.0
```

#### For ESLint v9 (Flat Config)

```js
import baseConfig from 'eslint-config-ebates';
import reactConfig from 'eslint-config-ebates/react';

export default [
  ...baseConfig,
  ...reactConfig,
  // your additional configs...
];
```

#### For ESLint v8 (Legacy Config)

```js
module.exports = {
  extends: ['ebates', 'ebates/react'],
  // ...
};
```

### TypeScript

- Requirements:
  - [@typescript-eslint/parser](https://github.com/typescript-eslint/typescript-eslint)
  - [@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint)

Run

```bash
# Install TypeScript plugin dependencies
npm install --save-dev @typescript-eslint/parser@^8.39.0 @typescript-eslint/eslint-plugin@^8.39.0 typescript@^5.9.2
```

Or with Yarn:

```bash
# Install TypeScript plugin dependencies
yarn add -D @typescript-eslint/parser@^8.39.0 @typescript-eslint/eslint-plugin@^8.39.0 typescript@^5.9.2
```

#### For ESLint v9 (Flat Config)

```js
import baseConfig from 'eslint-config-ebates';
import typescriptConfig from 'eslint-config-ebates/typescript';

export default [
  ...baseConfig,
  ...typescriptConfig,
  // your additional configs...
];
```

#### For ESLint v8 (Legacy Config)

```js
module.exports = {
  extends: ['ebates', 'ebates/typescript'],
  // ...
};
```

## Migration from v3.x to v4.x

If you're upgrading from version 3.x to 4.x, you'll need to:

1. Update your ESLint version to v9
2. Convert your configuration to use Flat Config format
3. Update your package.json to include `"type": "module"` if using ES modules

The main changes are:

- Configuration files now export arrays instead of objects
- Use of ES modules instead of CommonJS
- New Flat Config structure with `files`, `languageOptions`, and `plugins` properties

## Examples

See the `example/` directory for complete configuration examples:

- `example/eslint.config.js` - Flat Config format (ESLint v9)
- `example/.eslintrc.js` - Legacy format (ESLint v8)
