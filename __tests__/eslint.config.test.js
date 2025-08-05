import projectConfig from '../eslint.config.js';

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
    expect(testConfig.rules['no-console']).toBe('off');
    expect(testConfig.rules['no-unused-vars']).toBe('off');
  });

  it('should have proper globals defined', () => {
    projectConfig.forEach((config) => {
      if (config.languageOptions?.globals) {
        const globals = config.languageOptions.globals;
        expect(globals.console).toBe('readonly');
        expect(globals.process).toBe('readonly');
        expect(globals.__dirname).toBe('readonly');
        expect(globals.__filename).toBe('readonly');
      }
    });
  });

  it('should have test-specific globals for test files', () => {
    const testConfig = projectConfig.find(
      (config) =>
        config.files && config.files.some((file) => file.includes('test')),
    );
    if (testConfig.languageOptions?.globals) {
      const globals = testConfig.languageOptions.globals;
      expect(globals.describe).toBe('readonly');
      expect(globals.it).toBe('readonly');
      expect(globals.test).toBe('readonly');
      expect(globals.expect).toBe('readonly');
      expect(globals.jest).toBe('readonly');
    }
  });

  it('should extend base config', () => {
    // The project config should include the base config
    expect(projectConfig.length).toBeGreaterThan(1);
  });
});
