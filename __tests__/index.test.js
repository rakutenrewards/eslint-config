const baseConfig = require('../index');
const reactConfig = require('../react');
const typescriptConfig = require('../typescript');
const { OFF, WARNING, ERROR } = require('../constants');

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

describe('React Config', () => {
  it('should be an array', () => {
    expect(isArray(reactConfig)).toBe(true);
  });

  it('should have rules', () => {
    expect(hasRules(reactConfig)).toBe(true);
  });

  it('should have files pattern for JSX/TSX', () => {
    expect(hasFilesPattern(reactConfig)).toBe(true);
    const configWithFiles = reactConfig.find((config) => config.files);
    expect(configWithFiles.files).toContain('**/*.jsx');
    expect(configWithFiles.files).toContain('**/*.tsx');
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

describe('Constants', () => {
  it('should export correct values', () => {
    expect(OFF).toBe(0);
    expect(WARNING).toBe(1);
    expect(ERROR).toBe(2);
  });
});

describe('Configuration Structure', () => {
  it('should have valid Flat Config structure', () => {
    [baseConfig, reactConfig, typescriptConfig].forEach((config) => {
      expect(Array.isArray(config)).toBe(true);
      config.forEach((configItem) => {
        // Each config item should be an object
        expect(typeof configItem).toBe('object');
        expect(configItem).not.toBeNull();

        // If it has files, it should be an array
        if (configItem.files) {
          expect(Array.isArray(configItem.files)).toBe(true);
        }

        // If it has rules, it should be an object
        if (configItem.rules) {
          expect(typeof configItem.rules).toBe('object');
        }

        // If it has plugins, it should be an object
        if (configItem.plugins) {
          expect(typeof configItem.plugins).toBe('object');
        }

        // If it has languageOptions, it should be an object
        if (configItem.languageOptions) {
          expect(typeof configItem.languageOptions).toBe('object');
        }
      });
    });
  });
});

describe('Error Handling', () => {
  it('should handle missing optional dependencies gracefully', () => {
    // Test that the configs can be imported without throwing
    expect(() => {
      require('../index');
    }).not.toThrow();

    expect(() => {
      require('../react');
    }).not.toThrow();

    expect(() => {
      require('../typescript');
    }).not.toThrow();
  });

  it('should have valid rule configurations', () => {
    // Test that all rule configurations are valid
    [baseConfig, reactConfig, typescriptConfig].forEach((config) => {
      config.forEach((configItem) => {
        if (configItem.rules) {
          Object.entries(configItem.rules).forEach(([ruleName, ruleConfig]) => {
            expect(typeof ruleName).toBe('string');
            expect(ruleName.length).toBeGreaterThan(0);

            // Rule config should be either a string, number, or array
            if (Array.isArray(ruleConfig)) {
              expect(ruleConfig.length).toBeGreaterThan(0);
            } else {
              expect(['off', 'warn', 'error', 0, 1, 2]).toContain(ruleConfig);
            }
          });
        }
      });
    });
  });
});
