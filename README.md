# eslint-config-ebates

Rakuten Rewards' shareable ESLint configuration for modern JavaScript, React, and TypeScript projects.

## Features

- **Base configuration**: Modern JavaScript, parsed by ESLint's built-in `espree` parser
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
- Modern JavaScript (ES2025 and JSX) parsed by `espree`
- Import rules from [`eslint-plugin-import-x`](https://github.com/un-ts/eslint-plugin-import-x), registered as `import`
- Code style rules (max line length, camelCase, etc.)
- Best practices (no-param-reassign, no-alert, etc.)

### React Rules

- React rules from [`@eslint-react`](https://eslint-react.xyz), available under their `eslint-plugin-react` ids (`react/no-danger`, `react/jsx-key`, ...) and as `@eslint-react/...`
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

## Migrating from 4.x

Version 5 moves to ESLint 10 and replaces three dependencies that do not support it. Rule ids are kept, so most code and
configs need no changes.

**Required**
- Upgrade to ESLint `^10.0.0` and Node.js `^20.19.0 || ^22.13.0 || >=24`.
- Remove the `@babel/core` peer dependency from your install command; the Babel parser and plugin are gone, and JavaScript
  is parsed by `espree`. Remove any Babel-specific `parserOptions` (`requireConfigFile`, `babelOptions`).
- Rename `import/*` **settings** to `import-x/*` (`import/resolver` to `import-x/resolver`, `import/core-modules` to
  `import-x/core-modules`, `import/internal-regex` to `import-x/internal-regex`, and so on). Rule ids are unchanged, but
  `eslint-plugin-import-x` only reads `import-x/*` settings and silently ignores `import/*` ones, which shows up as false
  `import/no-unresolved` errors.
- Rename `settings.react` to `settings['react-x']` if you set a React version yourself.

**What changed, and what stays working**
- `eslint-plugin-import` is replaced by `eslint-plugin-import-x`, registered under the name `import`. Rules such as
  `import/order` and `import/no-extraneous-dependencies`, and `eslint-disable import/...` comments, keep working.
  Expect some new messages from `import/export`, `import/default` and `import/no-named-as-default-member`, and fewer false
  `import/no-unresolved` reports for packages with `exports` maps.
- `eslint-plugin-react` is replaced by `@eslint-react/eslint-plugin`, which is published as an ES module only; this package
  loads it for you. The `react/...` ids that were in use keep working (`react/no-danger`, `react/jsx-key`,
  `react/no-array-index-key`, ...) and `@eslint-react/...` rules can be enabled too.
- These `react/...` rules no longer report anything, but still exist as deprecated no-ops so that existing comments and
  overrides do not error: `prop-types`, `jsx-no-duplicate-props`, `jsx-no-undef`, `jsx-uses-react`, `jsx-uses-vars`,
  `no-deprecated`, `no-is-mounted`, `no-string-refs`, `no-unescaped-entities`, `react-in-jsx-scope` and
  `require-render-return`. `react/no-deprecated` is covered by `@eslint-react/dom-no-render`, `dom-no-hydrate` and
  `no-component-will-*`.
- `eslint-plugin-jsx-a11y` has not released a version that lists ESLint 10 as a peer, so your package manager may warn about
  it. It works with ESLint 10.

**Contributing**

The tests load `@eslint-react/eslint-plugin`, which is an ES module. Jest can only `require()` an ES module on Node 24.9
and later, so `yarn test` needs that (the repository's `.nvmrc` has it) and runs Jest with `--experimental-vm-modules`. Use
`yarn test` rather than calling `jest` directly. On older Node versions, `yarn compat-check` lints the same fixtures in plain
Node, which is how ESLint loads this package for consumers, and is what CI runs on the oldest supported Node versions.

## Examples

See the [example/](./example) directory for complete configuration examples.

## Requirements

- Node.js `^20.19.0 || ^22.13.0 || >=24`
- ESLint `^10.0.0`

## License

MIT

## Contributing

Issues and pull requests are welcome at [https://github.com/rakutenrewards/eslint-config](https://github.com/rakutenrewards/eslint-config)
