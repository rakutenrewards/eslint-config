[![Build Status](https://travis-ci.org/ebates-inc/eslint-config.svg?branch=master)](https://travis-ci.org/ebates-inc/eslint-config)

# eslint-config-ebates

This package provides ESLint [shareable configs](https://eslint.org/docs/developer-guide/shareable-configs) which allow us to
maintain a consistent coding style across our Javascript repositories.

Our base configuration, `ebates`, extends [eslint-config-airbnb-base](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base), both `base` and `strict` set of rules.
We also provide configuration for other environments:

- `ebates/react`
- `ebates/typescript`

## Installation

To install both the dependencies and peer-dependencies, make sure you have npm 5+
and run

```bash
npx install-peerdeps --dev eslint-config-ebates
```

_Note:_ `install-peerdeps` will automatically detect if you're using `yarn` or `npm`.

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
  - [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)
  - [eslint-plugin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y)
  - [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react)
  - [eslint-plugin-react-hooks](https://github.com/facebook/react/tree/master/packages/eslint-plugin-react-hooks)

Run

```bash
# Install eslint-config-airbnb peer dependencies. Skip `eslint` as we've already installed it as
# a peer dependency for our config earlier (in the Installation step).
yarn add -D eslint-config-airbnb eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks
```

Then update `.eslintrc.js`:

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
# Install @typescript-eslint peer dependencies. Skip `eslint` as we've already installed it as
# a peer dependency for our config earlier (in the Installation step).
yarn add -D @typescript-eslint/parser @typescript-eslint/eslint-plugin typescript
```

Then update `.eslintrc.js`:

```js
module.exports = {
  extends: ['ebates', 'ebates/typescript'],
  // ...
};
```
