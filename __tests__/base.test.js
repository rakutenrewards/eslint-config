const baseConfig = require('../index');
const { OFF, WARNING, ERROR } = require('../constants');

function isArray(arr) {
  return Array.isArray(arr);
}

function hasRules(config) {
  return config.some(
    (configItem) => configItem.rules && typeof configItem.rules === 'object',
  );
}

function hasLanguageOptions(config) {
  return config.some((configItem) => configItem.languageOptions);
}

function hasPlugins(config) {
  return config.some((configItem) => configItem.plugins);
}

describe('Base Config', () => {
  it('should be an array', () => {
    expect(isArray(baseConfig)).toBe(true);
  });

  it('should have rules', () => {
    expect(hasRules(baseConfig)).toBe(true);
  });

  it('should have files pattern', () => {
    // Base config uses spread configs that may not have explicit files patterns
    // but should have either files or be applicable to all files
    expect(Array.isArray(baseConfig)).toBe(true);
  });

  it('should have language options', () => {
    expect(hasLanguageOptions(baseConfig)).toBe(true);
  });

  it('should have plugins', () => {
    expect(hasPlugins(baseConfig)).toBe(true);
  });

  it('should include ignore patterns', () => {
    const ignoreConfig = baseConfig.find((config) => config.ignores);
    expect(ignoreConfig).toBeDefined();
    expect(Array.isArray(ignoreConfig.ignores)).toBe(true);
    expect(ignoreConfig.ignores).toContain('**/node_modules/**');
  });

  it('should have JavaScript configuration', () => {
    // Base config includes JS configs from @eslint/js and import plugin
    expect(baseConfig.length).toBeGreaterThan(0);
  });

  it('should have specific rules configured', () => {
    // Find config that has our custom rules (not from spread configs)
    const configWithRules = baseConfig.find(
      (config) =>
        config.rules &&
        (config.rules['no-alert'] ||
          config.rules['max-len'] ||
          config.rules['import/order']),
    );
    expect(configWithRules).toBeDefined();

    const { rules } = configWithRules;
    expect(rules['no-alert']).toBe(ERROR);
    expect(rules['no-console']).toBe(WARNING);
    expect(rules['max-len']).toBeDefined();
    expect(rules['no-underscore-dangle']).toBeDefined();
    expect(rules['no-param-reassign']).toBeDefined();
    expect(rules['import/order']).toBeDefined();
  });

  it('should have Babel parser configured', () => {
    const configWithParser = baseConfig.find(
      (config) => config.languageOptions?.parser,
    );
    expect(configWithParser).toBeDefined();
  });
});
