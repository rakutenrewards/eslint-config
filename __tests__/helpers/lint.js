const path = require('path');
const { ESLint } = require('eslint');
const baseConfig = require('../../index');
const reactConfig = require('../../react');
const typescriptConfig = require('../../typescript');

const ROOT = path.resolve(__dirname, '../..');
const FIXTURE_DIR = path.join(ROOT, '__tests__', 'fixtures');

/**
 * Builds an ESLint instance that uses only the given flat configs (never the repo's own
 * `eslint.config.js`), so tests exercise exactly what consumers receive.
 */
function createESLint(configs = [...baseConfig, ...reactConfig, ...typescriptConfig]) {
  return new ESLint({ cwd: ROOT, overrideConfigFile: true, overrideConfig: configs });
}

/**
 * Lints `code` as if it lived at `__tests__/fixtures/<fileName>`. The file does not need to exist,
 * but relative imports resolve against the real files in `__tests__/fixtures/modules`.
 */
async function lintFixture(eslint, code, fileName) {
  const [result] = await eslint.lintText(code, { filePath: path.join(FIXTURE_DIR, fileName) });
  return result;
}

const filePathFor = (fileName) => path.join(FIXTURE_DIR, fileName);

/**
 * `settings.react.version: 'detect'` makes eslint-plugin-react warn when React is not installed, which is expected in
 * this repository. Silences only that warning; call `jest.restoreAllMocks()` to undo.
 */
function silenceReactVersionWarning() {
  return jest.spyOn(console, 'error').mockImplementation((message) => {
    if (!String(message).includes('React version was set to "detect"')) {
      console.warn(message);
    }
  });
}

module.exports = { ROOT, FIXTURE_DIR, createESLint, lintFixture, filePathFor, silenceReactVersionWarning };
