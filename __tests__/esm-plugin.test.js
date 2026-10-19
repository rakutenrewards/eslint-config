const { requireEsmPlugin } = require('../esm-plugin');

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

describe('plugin names', () => {
  const { createESLint, filePathFor } = require('./helpers/lint');

  // The old `import/*` and `react/*` names were provided by shims in earlier drafts of 5.0.0 and are intentionally gone:
  // consumers use the real plugin names, `import-x/*` and `@eslint-react/*`.
  it.each(['import/order', 'react/jsx-key'])('does not define %s', async (ruleId) => {
    const eslint = createESLint();
    const { plugins } = await eslint.calculateConfigForFile(filePathFor('case.tsx'));

    expect(Object.keys(plugins)).not.toContain(ruleId.split('/')[0]);
  });
});
