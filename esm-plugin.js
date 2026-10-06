/**
 * Loads an ESLint plugin that is published as an ES module only, from this CommonJS package.
 *
 * `@eslint-react/eslint-plugin` is ESM-only and its `exports` map has an `import` condition but no `require` or
 * `default` one, so `require('@eslint-react/eslint-plugin')` fails with `ERR_PACKAGE_PATH_NOT_EXPORTED` even though
 * Node can `require()` ES modules. Requiring the entry file by its path works, because a file path is not subject to the
 * `exports` map.
 *
 * This relies on `require()` of ES modules, which every Node version this package supports provides
 * (`^20.19.0 || ^22.13.0 || >=24`), and fails loudly if a plugin ever starts using top-level `await`. Jest needs the
 * `--experimental-vm-modules` flag for the same reason (see the `test` script).
 */
const path = require('path');

function requireEsmPlugin(packageName) {
  const packageJsonPath = require.resolve(`${packageName}/package.json`);
  const { exports: packageExports, main } = require(packageJsonPath);
  const importCondition = packageExports && packageExports['.'] && packageExports['.'].import;
  const entry = typeof importCondition === 'string' ? importCondition : main;

  if (!entry) {
    throw new Error(`Could not find the entry file of ${packageName}`);
  }

  const loaded = require(path.join(path.dirname(packageJsonPath), entry));

  return loaded.default ?? loaded;
}

module.exports = { requireEsmPlugin };
