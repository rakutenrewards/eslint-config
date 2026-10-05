const fileKinds = require('./fixtures/scenarios/file-kinds');
const ecosystemPatterns = require('./fixtures/scenarios/ecosystem-patterns');
const { createESLint, lintFixture } = require('./helpers/lint');

const summarize = (messages) =>
  messages.map((message) => `${message.ruleId ?? 'parse-error'}:${message.severity}`).sort();

describe.each([
  ['File kinds', fileKinds],
  ['Ecosystem patterns', ecosystemPatterns],
])('%s', (_, scenarios) => {
  const eslint = createESLint();

  it.each(scenarios.map((scenario) => [scenario.name, scenario]))('%s', async (_name, { file, code, messages }) => {
    const result = await lintFixture(eslint, code, file);

    expect(summarize(result.messages)).toEqual([...messages].sort());
  });
});
