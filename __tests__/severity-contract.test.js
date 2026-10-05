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
  ['import/order', 'case.ts', 'error'],
  ['import/no-unresolved', 'case.ts', 'error'],

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
  ['react/prop-types', 'case.jsx', 'error'],
  ['react/prop-types', 'case.tsx', 'off'],
  ['react/require-default-props', 'case.tsx', 'off'],
  ['react/jsx-filename-extension', 'case.ts', 'off'],
  ['react/display-name', 'case.tsx', 'error'],
  ['react/display-name', 'case.test.tsx', 'off'],
  ['react/no-danger', 'case.tsx', 'warn'],
  ['react/no-danger-with-children', 'case.tsx', 'error'],
  ['react/no-array-index-key', 'case.tsx', 'error'],
  ['react/react-in-jsx-scope', 'case.tsx', 'off'],

  // hooks and effects are warnings because fixing them can need significant refactoring
  ['react-hooks/rules-of-hooks', 'case.tsx', 'warn'],
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
});
