/**
 * This file contains the rules for React.
 */
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const jsxA11yPlugin = require('eslint-plugin-jsx-a11y');
const reactYouMightNotNeedAnEffect = require('eslint-plugin-react-you-might-not-need-an-effect');
const importPlugin = require('eslint-plugin-import-x');
const { requireEsmPlugin } = require('./esm-plugin');
const { WARNING, ERROR, OFF } = require('./constants');

// `@eslint-react/eslint-plugin` is published as an ES module only, see `esm-plugin.js`
const eslintReact = requireEsmPlugin('@eslint-react/eslint-plugin');

const reactHooksRules = Object.entries(
  reactHooksPlugin.configs.flat.recommended.rules,
).reduce((acc, [key]) => {
  acc[key] = WARNING;
  return acc;
}, {});

const reactYouMightNotNeedAnEffectRules = Object.entries(
  reactYouMightNotNeedAnEffect.configs.recommended.rules,
).reduce((acc, [key]) => {
  acc[key] = WARNING;
  return acc;
}, {});

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  reactHooksPlugin.configs.flat.recommended,
  {
    // The preset above enables these as errors for every file. They are good practices that may need significant
    // refactoring, so they are warnings, in `.js` and `.ts` files (hooks are not only written in JSX files) as well.
    rules: reactHooksRules,
  },
  jsxA11yPlugin.flatConfigs.recommended,
  reactYouMightNotNeedAnEffect.configs.recommended,
  importPlugin.flatConfigs.react,
  {
    plugins: {
      '@eslint-react': eslintReact,
    },
    languageOptions: {
      parserOptions: {
        // React does not need to be in scope with the automatic JSX runtime, so an `import React` is reported as unused
        // (eslint-plugin-react's `jsx-runtime` preset used to set this)
        jsxPragma: null,
      },
    },
    settings: {
      'react-x': {
        version: 'detect',
      },
    },
    // These are picked one by one rather than spreading the plugin's `recommended` config, which enables many more rules
    // (and overlaps with `eslint-plugin-react-hooks`) than this package has ever enforced.
    rules: {
      // @eslint-react matches more than eslint-plugin-react did (for example wrappers such as Chakra's `forwardRef` and
      // spread props that contain `children`), which would add errors to repositories that are clean today. Raise these
      // to ERROR once the existing findings have been triaged.
      '@eslint-react/no-missing-component-display-name': WARNING,
      '@eslint-react/no-missing-key': ERROR,
      '@eslint-react/jsx-no-comment-textnodes': ERROR,
      '@eslint-react/dom-no-unsafe-target-blank': ERROR,
      '@eslint-react/jsx-no-children-prop': WARNING,
      '@eslint-react/no-direct-mutation-state': ERROR,
      '@eslint-react/dom-no-find-dom-node': ERROR,
      '@eslint-react/dom-no-render-return-value': ERROR,
      '@eslint-react/dom-no-unknown-property': ERROR,

      // deprecated APIs, which `react/no-deprecated` used to cover
      '@eslint-react/dom-no-render': ERROR,
      '@eslint-react/dom-no-hydrate': ERROR,
      '@eslint-react/no-component-will-mount': ERROR,
      '@eslint-react/no-component-will-receive-props': ERROR,
      '@eslint-react/no-component-will-update': ERROR,
    },
  },
  {
    files: ['**/*.jsx', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // https://eslint-react.xyz/docs/rules/dom-no-dangerously-set-innerhtml
      '@eslint-react/dom-no-dangerously-set-innerhtml': WARNING,
      // https://eslint-react.xyz/docs/rules/dom-no-dangerously-set-innerhtml-with-children
      '@eslint-react/dom-no-dangerously-set-innerhtml-with-children': ERROR,

      // Prevent usage of Array index in keys
      // https://eslint-react.xyz/docs/rules/no-array-index-key
      '@eslint-react/no-array-index-key': ERROR,

      // setting these to WARNING as they are good practices, but may require
      // significant refactoring in some cases.
      ...reactYouMightNotNeedAnEffectRules,
    },
  },
  {
    files: ['**/*.{test,spec}.{js,jsx,ts,tsx}'],
    rules: {
      '@eslint-react/no-missing-component-display-name': OFF,
    },
  },
];
