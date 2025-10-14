const reactConfig = require('../react');
const { WARNING, ERROR } = require('../constants');

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

describe('React Config', () => {
  it('should be an array', () => {
    expect(isArray(reactConfig)).toBe(true);
  });

  it('should have rules', () => {
    expect(hasRules(reactConfig)).toBe(true);
  });

  it('should have files pattern for JSX/TSX', () => {
    expect(hasFilesPattern(reactConfig)).toBe(true);
    // Check that at least one config targets JSX/TSX files
    const hasJsxTsxFiles = reactConfig.some((config) =>
      config.files?.some((pattern) =>
        pattern.includes('jsx') || pattern.includes('tsx')
      )
    );
    expect(hasJsxTsxFiles).toBe(true);
  });

  it('should have language options with JSX support', () => {
    expect(hasLanguageOptions(reactConfig)).toBe(true);
    const configWithLangOpts = reactConfig.find(
      (config) => config.languageOptions,
    );
    expect(
      configWithLangOpts.languageOptions.parserOptions.ecmaFeatures.jsx,
    ).toBe(true);
  });

  it('should have React plugins', () => {
    // React config spreads plugin flat configs which include plugins internally
    expect(hasPlugins(reactConfig)).toBe(true);
    const configWithPlugins = reactConfig.find((config) => config.plugins);
    expect(configWithPlugins.plugins).toHaveProperty('react');
  });

  it('should have specific React rules configured', () => {
    // Find config with custom React rules we added
    const configWithRules = reactConfig.find(
      (config) =>
        config.rules &&
        (config.rules['react/no-danger'] ||
          config.rules['react/jsx-filename-extension']),
    );
    expect(configWithRules).toBeDefined();

    const { rules } = configWithRules;
    expect(rules['react/no-danger']).toBe(WARNING);
    expect(rules['react/no-danger-with-children']).toBe(ERROR);
    expect(rules['react/no-array-index-key']).toBe(ERROR);
  });
});
