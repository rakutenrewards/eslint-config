/**
 * A small `react` plugin that keeps the rule ids of `eslint-plugin-react` working on top of `@eslint-react`.
 *
 * `eslint-plugin-react` does not support ESLint 10, so this package uses `@eslint-react/eslint-plugin` instead. Consumers
 * have `eslint-disable react/...` comments and `react/...` rule overrides in their own code and configs. A comment that
 * names a rule which cannot be found is an error, and so is turning such a rule on, so registering the plugin under the
 * name `react` with the rule ids that are in use keeps all of them working without any edits.
 *
 * - `ALIASES` are rules with an equivalent in `@eslint-react`; the rule itself is the `@eslint-react` one.
 * - `REMOVED` are rules that have no equivalent. They are deprecated no-ops so that comments and overrides that name
 *   them still resolve, but they never report anything.
 */
const { requireEsmPlugin } = require('./esm-plugin');

const eslintReact = requireEsmPlugin('@eslint-react/eslint-plugin');

/** `eslint-plugin-react` rule id -> `@eslint-react` rule id (without the plugin prefix). */
const ALIASES = {
  'display-name': 'no-missing-component-display-name',
  'jsx-key': 'no-missing-key',
  'jsx-no-comment-textnodes': 'jsx-no-comment-textnodes',
  'jsx-no-target-blank': 'dom-no-unsafe-target-blank',
  'no-array-index-key': 'no-array-index-key',
  'no-children-prop': 'jsx-no-children-prop',
  'no-danger': 'dom-no-dangerously-set-innerhtml',
  'no-danger-with-children': 'dom-no-dangerously-set-innerhtml-with-children',
  'no-direct-mutation-state': 'no-direct-mutation-state',
  'no-find-dom-node': 'dom-no-find-dom-node',
  'no-render-return-value': 'dom-no-render-return-value',
  'no-unknown-property': 'dom-no-unknown-property',
};

/** `eslint-plugin-react` rules that `@eslint-react` has no equivalent for, and why they no longer report. */
const REMOVED = {
  'jsx-no-duplicate-props': 'TypeScript reports duplicate JSX attributes',
  'jsx-no-undef': 'ESLint core no-undef tracks JSX identifiers',
  'jsx-uses-react': 'the automatic JSX runtime does not need React in scope',
  'jsx-uses-vars': 'ESLint core no-unused-vars tracks JSX identifiers',
  'no-deprecated': 'use the specific @eslint-react/dom-no-render, dom-no-hydrate and no-component-will-* rules',
  'no-is-mounted': 'legacy class component API',
  'no-string-refs': 'string refs are a type error and were removed from React',
  'no-unescaped-entities': 'no equivalent',
  'prop-types': 'use TypeScript types for props',
  'react-in-jsx-scope': 'the automatic JSX runtime does not need React in scope',
  'require-render-return': 'legacy class component API',
};

const removedRule = (reason) => ({
  meta: {
    type: 'suggestion',
    deprecated: true,
    docs: { description: `No longer reports anything: ${reason}` },
    // accept whatever options consumers used to pass
    schema: false,
  },
  create: () => ({}),
});

const aliasedRules = Object.fromEntries(
  Object.entries(ALIASES).map(([legacyId, newId]) => {
    if (!eslintReact.rules[newId]) {
      throw new Error(`@eslint-react has no rule "${newId}" to use as "react/${legacyId}"`);
    }
    return [legacyId, eslintReact.rules[newId]];
  }),
);

const removedRules = Object.fromEntries(
  Object.entries(REMOVED).map(([legacyId, reason]) => [legacyId, removedRule(reason)]),
);

module.exports = {
  eslintReact,
  reactPlugin: {
    meta: { name: 'eslint-config-ebates/react', version: '1.0.0' },
    rules: { ...aliasedRules, ...removedRules },
  },
};
