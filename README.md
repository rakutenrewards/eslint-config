[![Build Status](https://travis-ci.org/ebates-inc/eslint-config.svg?branch=master)](https://travis-ci.org/ebates-inc/eslint-config)

# eslint-config-ebates

This package provides ESLint [shareable configs](https://eslint.org/docs/developer-guide/shareable-configs) which allow us to
maintain a consistent coding style across our Javascript repositories.

Our base configuration, `ebates`, extends the [eslint-config-airbnb-base](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base).
We also provide configuration for other environments:
- `ebates/flowtype`
- `ebates/react`

## Installation

To install both the dependencies and peer-dependencies, make sure you have npm 5+
and run

```bash
npx install-peerdeps --dev eslint-config-ebates
```

*Note:* `install-peerdeps` will automatically detect if you're using `yarn` or `npm`.

In `.eslintrc.js`, simply add
```js
module.exports = {
  extends: 'ebates',
  // ...
};
```

## Other configurations

Other configurations require dependencies listed as optional. Run the
following command to check the supported version to install.
```bash
npm info "eslint-config-ebates@latest" optionalDependencies
```

### Flowtype

- Requirements:
    + [eslint-plugin-flowtype](https://github.com/gajus/eslint-plugin-flowtype)

Run
```bash
yarn add -D eslint-plugin-flowtype@<version>
```

Then update the `.eslintrc.js`.
```js
module.exports = {
  extends: [
    'ebates',
    'ebates/flowtype',
  ],
  // ...
};
```

### React

- Requirements:
    + [eslint-config-react-app](https://github.com/facebook/create-react-app/tree/next/packages/eslint-config-react-app)

Run
```bash
npx install-peerdeps --dev eslint-config-react-app@<version>
```

Then update the `.eslintrc.js`.
```js
module.exports = {
  extends: [
    'ebates',
    'ebates/react',
  ],
  // ...
};
```