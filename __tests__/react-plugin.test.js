const { reactPlugin, eslintReact } = require('../react-plugin');
const { requireEsmPlugin } = require('../esm-plugin');
const { createESLint, lintFixture, silenceReactVersionWarning } = require('./helpers/lint');

/** Every `eslint-plugin-react` rule id this package has enabled, which consumers may still name in comments or configs. */
const LEGACY_IDS_ENABLED_BEFORE = [
  'display-name',
  'jsx-key',
  'jsx-no-comment-textnodes',
  'jsx-no-duplicate-props',
  'jsx-no-target-blank',
  'jsx-no-undef',
  'jsx-uses-vars',
  'no-array-index-key',
  'no-children-prop',
  'no-danger',
  'no-danger-with-children',
  'no-deprecated',
  'no-direct-mutation-state',
  'no-find-dom-node',
  'no-is-mounted',
  'no-render-return-value',
  'no-string-refs',
  'no-unescaped-entities',
  'no-unknown-property',
  'prop-types',
  'require-render-return',
];

/** Other ids found in consumer configs and comments. */
const LEGACY_IDS_USED_BY_CONSUMERS = ['jsx-uses-react', 'react-in-jsx-scope'];

describe('react plugin (eslint-plugin-react ids on top of @eslint-react)', () => {
  beforeAll(() => {
    silenceReactVersionWarning();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it.each([...LEGACY_IDS_ENABLED_BEFORE, ...LEGACY_IDS_USED_BY_CONSUMERS])('defines react/%s', (id) => {
    expect(reactPlugin.rules).toHaveProperty([id]);
  });

  it('implements aliased rules with the @eslint-react rule', () => {
    expect(reactPlugin.rules['no-danger']).toBe(eslintReact.rules['dom-no-dangerously-set-innerhtml']);
    expect(reactPlugin.rules['jsx-key']).toBe(eslintReact.rules['no-missing-key']);
  });

  it.each(LEGACY_IDS_ENABLED_BEFORE)('resolves an eslint-disable comment for react/%s', async (id) => {
    const eslint = createESLint();
    const code = `// eslint-disable-next-line react/${id}\nexport const value = 1;\n`;
    const result = await lintFixture(eslint, code, 'disable-comment.jsx');

    // an unused directive is only a warning; the rule must simply be found
    expect(result.messages.filter(({ message }) => message.includes('Definition for rule'))).toEqual([]);
  });

  describe('rules without an equivalent', () => {
    const removed = Object.entries(reactPlugin.rules).filter(([, rule]) => rule.meta.deprecated);

    it('are deprecated no-ops', () => {
      expect(removed.length).toBeGreaterThan(0);
    });

    it.each(removed.map(([id]) => id))('react/%s never reports and accepts any options', async (id) => {
      const eslint = createESLint([
        ...require('../index'),
        ...require('../react'),
        ...require('../typescript'),
        { rules: { [`react/${id}`]: ['error', { anything: true }] } },
      ]);
      const code = 'export const Card = ({ title }) => <h2 class="x" ref="y">{title}</h2>;\n';
      const result = await lintFixture(eslint, code, 'removed.jsx');

      expect(result.messages.filter((message) => message.ruleId === `react/${id}`)).toEqual([]);
    });
  });
});

describe('esm-plugin', () => {
  it('loads an ES module only plugin that cannot be required by name', () => {
    // its `exports` map has an `import` condition only, so a plain require() fails
    expect(() => require('@eslint-react/eslint-plugin')).toThrow();
    expect(Object.keys(requireEsmPlugin('@eslint-react/eslint-plugin').rules).length).toBeGreaterThan(100);
  });

  it('fails clearly for a package that is not installed', () => {
    expect(() => requireEsmPlugin('does-not-exist-plugin')).toThrow(/Cannot find module/);
  });
});
