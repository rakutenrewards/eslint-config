const baseConfig = require('../index');
const reactConfig = require('../react');
const typescriptConfig = require('../typescript');

function isObject(obj) {
  return typeof obj === 'object' && obj !== null;
}

it('Validate base config', () => {
  expect(isObject(baseConfig.rules)).toBe(true);
});

it('Validate react config', () => {
  expect(isObject(reactConfig.rules)).toBe(true);
});

it('Validate typescript config', () => {
  expect(isObject(typescriptConfig.rules)).toBe(true);
});
