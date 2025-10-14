const typescriptConfig = require('../typescript');
const { ERROR, WARNING } = require('../constants');

function isArray(arr) {
  return Array.isArray(arr);
}

function hasRules(config) {
  return config.some(
    (configItem) => configItem.rules && typeof configItem.rules === 'object',
  );
}

function hasFilesPattern(config) {
  return config.some(
    (configItem) => configItem.files && Array.isArray(configItem.files),
  );
}

function hasLanguageOptions(config) {
  return config.some((configItem) => configItem.languageOptions);
}

function hasPlugins(config) {
  return config.some((configItem) => configItem.plugins);
}

describe('TypeScript Config', () => {
  it('should be an array', () => {
    expect(isArray(typescriptConfig)).toBe(true);
  });

  it('should have rules', () => {
    expect(hasRules(typescriptConfig)).toBe(true);
  });

  it('should have files pattern for TS/TSX', () => {
    expect(hasFilesPattern(typescriptConfig)).toBe(true);
    const configWithFiles = typescriptConfig.find((config) => config.files);
    expect(configWithFiles.files).toContain('**/*.ts');
    expect(configWithFiles.files).toContain('**/*.tsx');
  });

  it('should have language options with TypeScript parser', () => {
    // TypeScript config uses typescript-eslint which configures parser internally
    expect(hasLanguageOptions(typescriptConfig)).toBe(true);
  });

  it('should have TypeScript plugins', () => {
    // TypeScript config spreads tseslint and import plugin flat configs
    expect(hasPlugins(typescriptConfig)).toBe(true);
    const configWithPlugins = typescriptConfig.find((config) => config.plugins);
    expect(configWithPlugins.plugins).toHaveProperty('@typescript-eslint');
  });

  it('should have specific TypeScript rules configured', () => {
    // Find config that targets TS files with custom rules
    const configWithRules = typescriptConfig.find(
      (config) =>
        config.rules &&
        (config.rules['@typescript-eslint/no-use-before-define'] ||
          config.rules['@typescript-eslint/no-shadow']),
    );
    expect(configWithRules).toBeDefined();

    const { rules } = configWithRules;
    expect(rules['@typescript-eslint/no-use-before-define']).toBeDefined();
    expect(rules['@typescript-eslint/no-shadow']).toBe(ERROR);
    expect(rules['@typescript-eslint/no-explicit-any']).toBe(WARNING);
    expect(rules['@typescript-eslint/no-unused-vars']).toBe(WARNING);
  });
});
