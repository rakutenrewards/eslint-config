import baseConfig from '../index.js';
import reactConfig from '../react.js';
import typescriptConfig from '../typescript.js';

function isArray(arr) {
  return Array.isArray(arr);
}

function hasRules(config) {
  return config.some(
    (configItem) => configItem.rules && typeof configItem.rules === 'object',
  );
}

it('Validate base config', () => {
  expect(isArray(baseConfig)).toBe(true);
  expect(hasRules(baseConfig)).toBe(true);
});

it('Validate react config', () => {
  expect(isArray(reactConfig)).toBe(true);
  expect(hasRules(reactConfig)).toBe(true);
});

it('Validate typescript config', () => {
  expect(isArray(typescriptConfig)).toBe(true);
  expect(hasRules(typescriptConfig)).toBe(true);
});
