
it('Validate base config', () => {
  const config = require('../index');
  expect(isObject(config.rules)).toBe(true);
});

it('Validate Flowtype config', () => {
  const config = require('../flowtype');
  expect(isObject(config.rules)).toBe(true);
});

it('Validate react config', () => {
  const config = require('../react');
  expect(isObject(config.rules)).toBe(true);
});

it('Validate typescript config', () => {
  const config = require('../typescript');
  expect(isObject(config.rules)).toBe(true);
});

function isObject (obj) {
  return typeof obj === 'object' && obj !== null
}
