/**
 * Lints every rule fixture and scenario with the exported configs in plain Node, without Jest.
 *
 * Jest can only `require()` an ES module on Node 24.9 and later, and `@eslint-react/eslint-plugin` is an ES module, so the
 * Jest suite cannot run on the older Node versions this package supports (`^20.19.0 || ^22.13.0`). ESLint itself runs on
 * plain Node, which can `require()` ES modules from those versions on, so this is the check that those versions still
 * load the configs and report what they should. It reuses the fixtures that the Jest suite uses.
 */
const fixtures = require('../__tests__/fixtures/rule-fixtures');
const fileKinds = require('../__tests__/fixtures/scenarios/file-kinds');
const ecosystemPatterns = require('../__tests__/fixtures/scenarios/ecosystem-patterns');
const { createESLint, lintFixture } = require('../__tests__/helpers/lint');

const failures = [];
let checks = 0;

const fail = (name, detail) => failures.push(`${name}: ${detail}`);
const summarize = (messages) => messages.map((message) => `${message.ruleId ?? 'parse-error'}:${message.severity}`).sort();

async function checkRuleFixtures(eslint) {
  for (const [ruleId, { code, file, smoke }] of Object.entries(fixtures)) {
    checks += 1;
    try {
      const result = await lintFixture(eslint, code, file);
      const fatal = result.messages.filter((message) => message.fatal);
      if (fatal.length > 0) {
        fail(ruleId, `parse error: ${fatal[0].message}`);
      } else if (!smoke && !result.messages.some((message) => message.ruleId === ruleId)) {
        fail(ruleId, 'did not report its fixture');
      }
    } catch (error) {
      fail(ruleId, `threw: ${String(error.message).split('\n')[0]}`);
    }
  }
}

async function checkScenarios(eslint) {
  for (const { name, file, code, messages } of [...fileKinds, ...ecosystemPatterns]) {
    checks += 1;
    try {
      const result = await lintFixture(eslint, code, file);
      const actual = summarize(result.messages);
      const expected = [...messages].sort();
      if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        fail(name, `expected ${JSON.stringify(expected)} but got ${JSON.stringify(actual)}`);
      }
    } catch (error) {
      fail(name, `threw: ${String(error.message).split('\n')[0]}`);
    }
  }
}

(async () => {
  const eslint = createESLint();

  await checkRuleFixtures(eslint);
  await checkScenarios(eslint);

  const { version } = require('eslint/package.json');
  process.stdout.write(`Node ${process.version}, ESLint ${version}: ${checks - failures.length}/${checks} checks passed\n`);

  if (failures.length > 0) {
    process.stderr.write(`${failures.map((failure) => `  - ${failure}`).join('\n')}\n`);
    process.exitCode = 1;
  }
})();
