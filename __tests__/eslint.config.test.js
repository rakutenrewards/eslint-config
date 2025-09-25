const projectConfig = require('../eslint.config');
const { OFF } = require('../constants');

describe('Project ESLint Config', () => {
  it('should be an array', () => {
    expect(Array.isArray(projectConfig)).toBe(true);
  });

  it('should have at least one configuration item', () => {
    expect(projectConfig.length).toBeGreaterThan(0);
  });

  it('should have test file configuration', () => {
    const testConfig = projectConfig.find(
      (config) =>
        config.files && config.files.some((file) => file.includes('test')),
    );
    expect(testConfig).toBeDefined();
    expect(testConfig.files).toContain('**/*.test.js');
    expect(testConfig.files).toContain('**/*.spec.js');
  });

  it('should have relaxed rules for test files', () => {
    const testConfig = projectConfig.find(
      (config) =>
        config.files && config.files.some((file) => file.includes('test')),
    );
    expect(testConfig.rules['no-console']).toBe(OFF);
    expect(testConfig.rules['no-unused-vars']).toBe(OFF);
  });

  it('should have proper globals defined', () => {
    projectConfig.forEach((config) => {
      if (config.languageOptions?.globals) {
        const { globals } = config.languageOptions;
        expect(globals.console).toBe(false);
        expect(globals.process).toBe(false);
        expect(globals.__dirname).toBe(false);
        expect(globals.__filename).toBe(false);
      }
    });
  });

  it('should have test-specific globals for test files', () => {
    const testConfig = projectConfig.find(
      (config) =>
        config.files && config.files.some((file) => file.includes('test')),
    );
    if (testConfig.languageOptions?.globals) {
      const { globals } = testConfig.languageOptions;
      expect(globals.describe).toBe(false);
      expect(globals.it).toBe(false);
      expect(globals.test).toBe(false);
      expect(globals.expect).toBe(false);
      expect(globals.jest).toBe(false);
    }
  });

  it('should extend base config', () => {
    // The project config should include the base config
    expect(projectConfig.length).toBeGreaterThan(1);
  });
});
