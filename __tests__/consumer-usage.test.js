const { execFileSync } = require('child_process');
const path = require('path');
const { pathToFileURL } = require('url');
const baseConfig = require('../index');
const reactConfig = require('../react');
const typescriptConfig = require('../typescript');
const { ROOT, createESLint, lintFixture, filePathFor } = require('./helpers/lint');

const hasDefineConfig = (() => {
  try {
    require.resolve('eslint/config');
    return true;
  } catch {
    return false;
  }
})();

const toUrl = (file) => pathToFileURL(path.join(ROOT, file)).href;

describe('Consumer usage', () => {
  describe('ES modules', () => {
    // consumers write `import baseConfig from 'eslint-config-ebates'` in `eslint.config.mjs` or with "type": "module"
    it.each(['index.js', 'react.js', 'typescript.js'])('default-imports %s as a flat config array', (file) => {
      const output = execFileSync(
        'node',
        [
          '--input-type=module',
          '-e',
          `import config from '${toUrl(file)}'; console.log(JSON.stringify({ isArray: Array.isArray(config), length: config.length }))`,
        ],
        { encoding: 'utf8' },
      );
      const { isArray, length } = JSON.parse(output);

      expect(isArray).toBe(true);
      expect(length).toBeGreaterThan(0);
    });

    it('imports constants both as a default and as named exports', () => {
      const output = execFileSync(
        'node',
        [
          '--input-type=module',
          '-e',
          `import constants, { OFF, WARNING, ERROR } from '${toUrl('constants.js')}'; console.log(JSON.stringify({ constants, OFF, WARNING, ERROR }))`,
        ],
        { encoding: 'utf8' },
      );

      expect(JSON.parse(output)).toEqual({
        constants: { OFF: 0, WARNING: 1, ERROR: 2 },
        OFF: 0,
        WARNING: 1,
        ERROR: 2,
      });
    });
  });

  (hasDefineConfig ? describe : describe.skip)('defineConfig', () => {
    // some repositories wrap the exports in `defineConfig` from `eslint/config` (ESLint 9.22+)
    it('accepts the exports and produces a config that lints', async () => {
      const { defineConfig } = require('eslint/config');
      const configs = defineConfig([...baseConfig, ...reactConfig, ...typescriptConfig]);
      const result = await lintFixture(createESLint(configs), 'export const value: number = 1;\n', 'define-config.ts');

      expect(result.messages).toEqual([]);
    });
  });

  describe('ignored files', () => {
    it.each(['node_modules/pkg/index.js', 'dist/bundle.js', 'build/output.js', '.git/hooks/pre-commit.js'])(
      'ignores %s',
      async (file) => {
        await expect(createESLint().isPathIgnored(filePathFor(file))).resolves.toBe(true);
      },
    );

    it.each(['src/index.ts', 'lib/util.js', 'scripts/release.js'])('does not ignore %s', async (file) => {
      await expect(createESLint().isPathIgnored(filePathFor(file))).resolves.toBe(false);
    });
  });

  describe('overrides layered on top', () => {
    // the most common consumer override: allow `any`
    it('lets a later block turn off a rule for matching files only', async () => {
      const eslint = createESLint([
        ...baseConfig,
        ...reactConfig,
        ...typescriptConfig,
        { files: ['**/*.ts'], rules: { '@typescript-eslint/no-explicit-any': 'off' } },
      ]);
      const code = 'export const value: any = 1;\n';
      const ts = await lintFixture(eslint, code, 'override.ts');
      const tsx = await lintFixture(eslint, code, 'override.tsx');

      expect(ts.messages).toEqual([]);
      expect(tsx.messages.map(({ ruleId }) => ruleId)).toEqual(['@typescript-eslint/no-explicit-any']);
    });

    it('lets a later block raise a warning to an error', async () => {
      const eslint = createESLint([
        ...baseConfig,
        ...reactConfig,
        ...typescriptConfig,
        { rules: { 'no-console': 'error' } },
      ]);
      const result = await lintFixture(eslint, 'console.log("x");\n', 'override-severity.ts');

      expect(result.messages.map(({ ruleId, severity }) => `${ruleId}:${severity}`)).toEqual(['no-console:2']);
    });
  });
});
