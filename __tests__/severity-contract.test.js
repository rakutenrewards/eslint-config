const { createESLint, filePathFor } = require('./helpers/lint');

const toLabel = (setting) => {
  const severity = Array.isArray(setting) ? setting[0] : setting;
  if (severity === 2 || severity === 'error') return 'error';
  if (severity === 1 || severity === 'warn') return 'warn';
  return 'off';
};

/**
 * The severity consumers get for rules they commonly rely on or override, per kind of file. Changing one of these is
 * a change in behaviour for every repository that uses the config, so it should be a deliberate (and released) decision.
 *
 * `[ruleId, file, expected severity]`
 */
const SEVERITIES = [
  // base
  ['no-alert', 'case.js', 'error'],
  ['no-alert', 'case.ts', 'error'],
  ['no-console', 'case.js', 'warn'],
  ['no-console', 'case.tsx', 'warn'],
  ['no-underscore-dangle', 'case.js', 'error'],
  ['camelcase', 'case.ts', 'error'],
  ['max-len', 'case.js', 'error'],
  ['no-param-reassign', 'case.js', 'error'],
  ['import-x/order', 'case.ts', 'error'],
  ['import-x/no-unresolved', 'case.ts', 'error'],

  // TypeScript
  ['@typescript-eslint/no-explicit-any', 'case.ts', 'warn'],
  ['@typescript-eslint/no-explicit-any', 'case.tsx', 'warn'],
  ['@typescript-eslint/no-unused-vars', 'case.ts', 'warn'],
  ['@typescript-eslint/no-shadow', 'case.ts', 'error'],
  ['@typescript-eslint/no-use-before-define', 'case.ts', 'error'],
  ['@typescript-eslint/no-empty-object-type', 'case.ts', 'error'],
  ['@typescript-eslint/explicit-module-boundary-types', 'case.ts', 'off'],
  ['@typescript-eslint/no-require-imports', 'case.ts', 'error'],
  ['@typescript-eslint/no-require-imports', 'case.js', 'off'],
  ['no-shadow', 'case.ts', 'off'],
  ['no-use-before-define', 'case.ts', 'off'],

  // React
  ['@eslint-react/no-missing-component-display-name', 'case.tsx', 'warn'],
  ['@eslint-react/no-missing-component-display-name', 'case.test.tsx', 'off'],
  ['@eslint-react/dom-no-dangerously-set-innerhtml', 'case.tsx', 'warn'],
  ['@eslint-react/jsx-no-children-prop', 'case.tsx', 'warn'],
  ['@eslint-react/dom-no-dangerously-set-innerhtml-with-children', 'case.tsx', 'error'],
  ['@eslint-react/no-array-index-key', 'case.tsx', 'error'],

  // hooks and effects are warnings because fixing them can need significant refactoring
  ['react-hooks/rules-of-hooks', 'case.tsx', 'warn'],
  ['react-hooks/rules-of-hooks', 'case.ts', 'warn'],
  ['react-hooks/rules-of-hooks', 'case.js', 'warn'],
  ['react-hooks/refs', 'case.ts', 'warn'],
  ['react-hooks/refs', 'case.test.ts', 'warn'],
  ['react-hooks/set-state-in-effect', 'case.ts', 'warn'],
  ['react-hooks/immutability', 'case.js', 'warn'],
  ['react-hooks/exhaustive-deps', 'case.tsx', 'warn'],
  ['react-hooks/set-state-in-effect', 'case.tsx', 'warn'],
  ['react-you-might-not-need-an-effect/no-derived-state', 'case.tsx', 'warn'],
  ['react-you-might-not-need-an-effect/no-event-handler', 'case.tsx', 'warn'],
];

describe('Severity contract', () => {
  const eslint = createESLint();

  it.each(SEVERITIES)('%s in %s is %s', async (ruleId, file, expected) => {
    const { rules } = await eslint.calculateConfigForFile(filePathFor(file));

    expect({ ruleId, file, severity: toLabel(rules[ruleId]) }).toEqual({ ruleId, file, severity: expected });
  });

  // Hooks and effects are meant to be warnings in every file, not only in .jsx and .tsx. This covers rules that a plugin
  // adds later, which the list above cannot.
  describe.each(['case.js', 'case.jsx', 'case.ts', 'case.tsx', 'case.test.ts', 'case.test.tsx'])('in %s', (file) => {
    it('has no react-hooks or effect rule enabled as an error', async () => {
      const { rules } = await eslint.calculateConfigForFile(filePathFor(file));
      const errors = Object.entries(rules)
        .filter(([ruleId]) => ruleId.startsWith('react-hooks/') || ruleId.startsWith('react-you-might-not-need-an-effect/'))
        .filter(([, setting]) => toLabel(setting) === 'error')
        .map(([ruleId]) => ruleId);

      expect(errors).toEqual([]);
    });
  });
});
