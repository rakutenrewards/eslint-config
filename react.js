/**
 * This file contains the rules for React.
 */
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const jsxA11yPlugin = require('eslint-plugin-jsx-a11y');
const reactYouMightNotNeedAnEffect = require('eslint-plugin-react-you-might-not-need-an-effect');
const importPlugin = require('./import-plugin');
const { WARNING, ERROR, OFF } = require('./constants');

// `react/...` rule ids are provided on top of `@eslint-react`, see `react-plugin.js`
const { eslintReact, reactPlugin } = require('./react-plugin');

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
  jsxA11yPlugin.flatConfigs.recommended,
  reactYouMightNotNeedAnEffect.configs.recommended,
  importPlugin.flatConfigs.react,
  {
    plugins: {
      // the `eslint-plugin-react` rule ids that consumers already use, implemented by `@eslint-react`
      react: reactPlugin,
      // the plugin itself, for the rules that have no `react/...` id
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
      'react/display-name': WARNING,
      'react/jsx-key': ERROR,
      'react/jsx-no-comment-textnodes': ERROR,
      'react/jsx-no-target-blank': ERROR,
      'react/no-children-prop': WARNING,
      'react/no-direct-mutation-state': ERROR,
      'react/no-find-dom-node': ERROR,
      'react/no-render-return-value': ERROR,
      'react/no-unknown-property': ERROR,

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
      'react/no-danger': WARNING,
      // https://eslint-react.xyz/docs/rules/dom-no-dangerously-set-innerhtml-with-children
      'react/no-danger-with-children': ERROR,

      // Prevent usage of Array index in keys
      // https://eslint-react.xyz/docs/rules/no-array-index-key
      'react/no-array-index-key': ERROR,

      // setting these to WARNING as they are good practices, but may require
      // significant refactoring in some cases.
      ...reactHooksRules,
      ...reactYouMightNotNeedAnEffectRules,
    },
  },
  {
    files: ['**/*.{test,spec}.{js,jsx,ts,tsx}'],
    rules: {
      'react/display-name': OFF,
    },
  },
];
