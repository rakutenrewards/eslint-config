const js = require('@eslint/js');
const fixtures = require('./fixtures/rule-fixtures');
const { createESLint, lintFixture, filePathFor, silenceReactVersionWarning } = require('./helpers/lint');

// one representative file name per kind of file consumers lint, used to work out which rules are enabled
const FILE_KINDS = ['case.js', 'case.jsx', 'case.ts', 'case.tsx', 'case.test.tsx'];

const isEnabled = (setting) => {
  const severity = Array.isArray(setting) ? setting[0] : setting;
  return severity !== 0 && severity !== 'off';
};

/**
 * Rules that must have a fixture: every plugin rule, plus core rules that this package enables on top of
 * `@eslint/js` recommended (ESLint tests its own recommended rules upstream).
 */
async function getRulesRequiringFixtures(eslint) {
  const required = new Set();
  await Promise.all(
    FILE_KINDS.map(async (fileName) => {
      const config = await eslint.calculateConfigForFile(filePathFor(fileName));
      Object.entries(config.rules)
        .filter(([, setting]) => isEnabled(setting))
        .forEach(([ruleId]) => {
          const isPluginRule = ruleId.includes('/');
          if (isPluginRule || !(ruleId in js.configs.recommended.rules)) {
            required.add(ruleId);
          }
        });
    }),
  );
  return required;
}

describe('Rule fixtures', () => {
  let eslint;

  beforeAll(() => {
    eslint = createESLint();
    silenceReactVersionWarning();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('has a fixture for every enabled plugin rule and project-specific core rule', async () => {
    const required = await getRulesRequiringFixtures(eslint);
    const missing = [...required].filter((ruleId) => !(ruleId in fixtures)).sort();

    expect(missing).toEqual([]);
  });

  it('has no fixtures for rules that are not enabled', async () => {
    const required = await getRulesRequiringFixtures(eslint);
    const stale = Object.keys(fixtures).filter((ruleId) => !required.has(ruleId)).sort();

    expect(stale).toEqual([]);
  });

  it('enables each rule for the file its fixture is linted as', async () => {
    const results = await Promise.all(
      Object.entries(fixtures).map(async ([ruleId, { file }]) => {
        const config = await eslint.calculateConfigForFile(filePathFor(file));
        return isEnabled(config.rules[ruleId] ?? 0) ? null : `${ruleId} (${file})`;
      }),
    );

    expect(results.filter(Boolean)).toEqual([]);
  });

  describe.each(Object.entries(fixtures))('%s', (ruleId, { code, file, smoke }) => {
    it(smoke ? `runs without crashing (${smoke})` : 'reports its fixture', async () => {
      const result = await lintFixture(eslint, code, file);

      // a rule that throws (for example because it uses an API removed in a newer ESLint) surfaces as a fatal message
      expect(result.messages.filter((message) => message.fatal)).toEqual([]);

      if (!smoke) {
        const reported = result.messages.filter((message) => message.ruleId === ruleId);
        expect(reported.length).toBeGreaterThan(0);
      }
    });
  });
});
