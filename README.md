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
- Import rules from [`eslint-plugin-import-x`](https://github.com/un-ts/eslint-plugin-import-x), (rules are `import-x/...`)
- Code style rules (max line length, camelCase, etc.)
- Best practices (no-param-reassign, no-alert, etc.)

### React Rules

- React rules from [`@eslint-react`](https://eslint-react.xyz) (rules are `@eslint-react/...`)
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

Version 5 moves to ESLint 10 and replaces three dependencies that do not support it. The two replacement plugins keep
their own names, so rule ids, `eslint-disable` comments and `settings` keys all change.

**Required**
- Upgrade to ESLint `^10.0.0` and Node.js `^20.19.0 || ^22.13.0 || >=24`.
- Remove the `@babel/core` peer dependency from your install command; the Babel parser and plugin are gone, and JavaScript
  is parsed by `espree`. Remove any Babel-specific `parserOptions` (`requireConfigFile`, `babelOptions`).
- `eslint-plugin-import` is replaced by [`eslint-plugin-import-x`](https://github.com/un-ts/eslint-plugin-import-x).
  Rename `import/` to `import-x/` in rule ids (`import/order` to `import-x/order`), in `eslint-disable` comments and in
  `settings` (`import/resolver` to `import-x/resolver`, `import/core-modules` to `import-x/core-modules`, ...). A comment or
  config that names a rule the plugin does not define is an error. Settings are different: `import/*` ones are ignored
  without any message, which shows up as false `import-x/no-unresolved` errors, and as a wall of `import-x/export` errors
  in barrel files that `export *` from a package listed in `core-modules` and then override some of its names.
- `eslint-plugin-react` is replaced by [`@eslint-react`](https://eslint-react.xyz), which is published as an ES module only;
  this package loads it for you. Rename the rule ids in comments and configs as in the table below, and rename
  `settings.react` to `settings['react-x']` if you set a React version yourself.

| `eslint-plugin-react` | `@eslint-react/eslint-plugin` |
|---|---|
| `react/display-name` | `@eslint-react/no-missing-component-display-name` |
| `react/jsx-key` | `@eslint-react/no-missing-key` |
| `react/jsx-no-comment-textnodes` | `@eslint-react/jsx-no-comment-textnodes` |
| `react/jsx-no-target-blank` | `@eslint-react/dom-no-unsafe-target-blank` |
| `react/no-array-index-key` | `@eslint-react/no-array-index-key` |
| `react/no-children-prop` | `@eslint-react/jsx-no-children-prop` |
| `react/no-danger` | `@eslint-react/dom-no-dangerously-set-innerhtml` |
| `react/no-danger-with-children` | `@eslint-react/dom-no-dangerously-set-innerhtml-with-children` |
| `react/no-direct-mutation-state` | `@eslint-react/no-direct-mutation-state` |
| `react/no-find-dom-node` | `@eslint-react/dom-no-find-dom-node` |
| `react/no-render-return-value` | `@eslint-react/dom-no-render-return-value` |
| `react/no-unknown-property` | `@eslint-react/dom-no-unknown-property` |
| `react/no-deprecated` | `@eslint-react/dom-no-render`, `dom-no-hydrate`, `no-component-will-*` |

These have no replacement and should be deleted, together with any comment or override that names them: `react/prop-types`
(use TypeScript types), `react/jsx-uses-react` and `react/react-in-jsx-scope` (the automatic JSX runtime does not need React in
scope), `react/jsx-no-duplicate-props`, `react/jsx-no-undef` and `react/jsx-uses-vars` (TypeScript and ESLint core cover them),
`react/no-is-mounted`, `react/no-string-refs`, `react/no-unescaped-entities` and `react/require-render-return`. Turning one
of these *off* is still accepted; turning it on, or naming it in a disable comment, is an error.

**What else changed**
- The `eslint-plugin-react-hooks` rules (`react-hooks/refs`, `rules-of-hooks`, `set-state-in-effect`, `immutability`, ...) are
  warnings in `.js` and `.ts` files as well. In 4.x the downgrade only covered `.jsx` and `.tsx`, so the same findings were
  errors in plain `.js` and `.ts` files, such as a custom hook in `useSomething.ts`.
- `@eslint-react/no-missing-component-display-name` and `@eslint-react/jsx-no-children-prop` are warnings: they match more
  than the `eslint-plugin-react` rules did (for example wrappers such as Chakra's `forwardRef`).
- Expect some new messages from `import-x/export`, `import-x/default` and `import-x/no-named-as-default-member`, and fewer
  false `import-x/no-unresolved` reports for packages with `exports` maps.
- `eslint-plugin-jsx-a11y` has not released a version that lists ESLint 10 as a peer, so your package manager may warn about
  it. It works with ESLint 10.

**Renaming the import rule ids in your code**

The `import-x` rename is mechanical, for example (review the diff; this touches every `import/` rule id in the files it
matches):

```sh
git grep -lE 'import/[a-z]' -- '*.js' '*.jsx' '*.ts' '*.tsx' '*.mjs' '*.cjs' \
  | xargs sed -i.bak -E 's#(^|[^A-Za-z0-9_/.-])import/([a-z])#\1import-x/\2#g' && find . -name '*.bak' -not -path './node_modules/*' -delete
```

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
