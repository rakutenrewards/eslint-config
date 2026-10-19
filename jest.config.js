// Jest can only require() an ES module on Node 24.9 or later, and @eslint-react/eslint-plugin is an ES module.
// `yarn compat-check` runs the same fixtures in plain Node and works on every supported version.
const [major, minor] = process.versions.node.split('.').map(Number);

if (major < 24 || (major === 24 && minor < 9)) {
  throw new Error(
    `The tests need Node 24.9 or later (found ${process.versions.node}). Use "yarn compat-check" on older Node versions.`,
  );
}

module.exports = {
  testEnvironment: 'node',
  // only `*.test.js` files are tests; helpers and fixtures live alongside them in `__tests__/`
  testMatch: ['**/__tests__/**/*.test.js'],
};
