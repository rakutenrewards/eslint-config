const baseConfig = require('../index');
const reactConfig = require('../react');
const typescriptConfig = require('../typescript');
const { createESLint, lintFixture, silenceReactVersionWarning } = require('./helpers/lint');

const SNIPPETS = {
  'case.js': 'export const value = 1;\n',
  'case.jsx': 'export const Component = () => <div />;\n',
  'case.ts': 'export const value: number = 1;\n',
  'case.tsx': 'export const Component = () => <div />;\n',
};

/**
 * Rules that are deprecated by ESLint but still enabled. Each must be replaced before the ESLint version that removes it;
 * this list exists so that *newly* enabling a deprecated rule fails the test.
 */
const KNOWN_DEPRECATED_RULES = [
  // formatting rules are moving to @stylistic; ESLint removes `max-len` in v11
  'max-len',
];

/**
 * Each way consumers combine the exports, with the kinds of file that combination can parse. The last two orders are both
 * in use: the README documents base/react/typescript, and the shared Next.js dev tools spread base/typescript/react.
 */
const COMBINATIONS = [
  ['base', [...baseConfig], ['case.js']],
  ['base + react', [...baseConfig, ...reactConfig], ['case.js', 'case.jsx']],
  ['base + typescript', [...baseConfig, ...typescriptConfig], ['case.js', 'case.ts', 'case.tsx']],
  [
    'base + react + typescript',
    [...baseConfig, ...reactConfig, ...typescriptConfig],
    ['case.js', 'case.jsx', 'case.ts', 'case.tsx'],
  ],
  [
    'base + typescript + react',
    [...baseConfig, ...typescriptConfig, ...reactConfig],
    ['case.js', 'case.jsx', 'case.ts', 'case.tsx'],
  ],
];

/**
 * Rules that consumers name in `eslint-disable` comments or turn on in their own configs, so they must keep existing in
 * the merged config. Turning an unknown rule *off* is accepted silently, so rules that are only ever turned off (such as
 * `react/require-default-props`) are not listed.
 */
const CONSUMER_REFERENCED_RULES = [
  '@typescript-eslint/ban-ts-comment',
  '@typescript-eslint/no-explicit-any',
  '@typescript-eslint/no-require-imports',
  '@typescript-eslint/no-unused-vars',
  'camelcase',
  'import/no-extraneous-dependencies',
  'import/no-unresolved',
  'import/order',
  'jsx-a11y/alt-text',
  'new-cap',
  'no-alert',
  'no-console',
  'no-param-reassign',
  'no-template-curly-in-string',
  'no-underscore-dangle',
  'react-hooks/exhaustive-deps',
  'react-hooks/immutability',
  'react-hooks/preserve-manual-memoization',
  'react-hooks/refs',
  'react-hooks/set-state-in-effect',
  'react-hooks/set-state-in-render',
  'react-you-might-not-need-an-effect/no-adjust-state-on-prop-change',
  'react-you-might-not-need-an-effect/no-event-handler',
  'react-you-might-not-need-an-effect/no-initialize-state',
  'react/display-name',
  'react/jsx-key',
  'react/jsx-uses-react',
  'react/no-array-index-key',
  'react/no-danger',
  'react/no-unknown-property',
  'react/prop-types',
  'react/react-in-jsx-scope',
];

describe('Config integrity', () => {
  beforeAll(() => {
    silenceReactVersionWarning();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe.each(COMBINATIONS)('%s', (name, configs, fileNames) => {
    it.each(fileNames)('lints a trivial %s file without crashing or reporting anything', async (fileName) => {
      const result = await lintFixture(createESLint(configs), SNIPPETS[fileName], fileName);

      expect(result.messages).toEqual([]);
    });

    it.each(fileNames)('does not use deprecated rules for %s', async (fileName) => {
      const result = await lintFixture(createESLint(configs), SNIPPETS[fileName], fileName);

      const deprecated = result.usedDeprecatedRules.map(({ ruleId }) => ruleId);

      expect(deprecated.filter((ruleId) => !KNOWN_DEPRECATED_RULES.includes(ruleId))).toEqual([]);
    });
  });

  describe('consumer overrides', () => {
    it.each(CONSUMER_REFERENCED_RULES)('still defines %s so consumers can configure it', async (ruleId) => {
      // turning an unknown rule *off* is silently accepted, so enable it: flat config throws for a rule it cannot find
      const eslint = createESLint([...baseConfig, ...reactConfig, ...typescriptConfig, { rules: { [ruleId]: 'error' } }]);

      await expect(lintFixture(eslint, SNIPPETS['case.tsx'], 'case.tsx')).resolves.toBeDefined();
    });
  });
});
