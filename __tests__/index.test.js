import baseConfig from '../index.js';
import reactConfig from '../react.js';
import typescriptConfig from '../typescript.js';
import { OFF, WARNING, ERROR } from '../constants.js';

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
    expect(hasFilesPattern(baseConfig)).toBe(true);
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

  it('should have JavaScript file patterns', () => {
    const jsConfig = baseConfig.find(
      (config) => config.files && config.files.includes('**/*.js'),
    );
    expect(jsConfig).toBeDefined();
  });

  it('should have specific rules configured', () => {
    const configWithRules = baseConfig.find((config) => config.rules);
    expect(configWithRules).toBeDefined();

    const rules = configWithRules.rules;
    expect(rules['arrow-parens']).toEqual([ERROR, 'always']);
    expect(rules['no-continue']).toBe(OFF);
    expect(rules['no-underscore-dangle']).toBe(OFF);
    expect(rules['max-len']).toBeDefined();
    expect(rules['no-use-before-define']).toBeDefined();
    expect(rules['prefer-destructuring']).toBeDefined();
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
    expect(hasPlugins(reactConfig)).toBe(true);
    const configWithPlugins = reactConfig.find((config) => config.plugins);
    expect(configWithPlugins.plugins).toHaveProperty('react');
    expect(configWithPlugins.plugins).toHaveProperty('react-hooks');
    expect(configWithPlugins.plugins).toHaveProperty('jsx-a11y');
  });

  it('should have specific React rules configured', () => {
    const configWithRules = reactConfig.find((config) => config.rules);
    expect(configWithRules).toBeDefined();

    const rules = configWithRules.rules;
    expect(rules['class-methods-use-this']).toBe(OFF);
    expect(rules['react/prefer-stateless-function']).toBe(OFF);
    expect(rules['react/jsx-one-expression-per-line']).toBe(OFF);
    expect(rules['react/jsx-filename-extension']).toEqual([
      WARNING,
      { extensions: ['.js'] },
    ]);
    expect(rules['react-hooks/rules-of-hooks']).toBe(ERROR);
    expect(rules['react-hooks/exhaustive-deps']).toBe(WARNING);
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
    expect(hasLanguageOptions(typescriptConfig)).toBe(true);
    const configWithLangOpts = typescriptConfig.find(
      (config) => config.languageOptions,
    );
    expect(configWithLangOpts.languageOptions.parser).toBeDefined();
    expect(configWithLangOpts.languageOptions.parserOptions.sourceType).toBe(
      'module',
    );
  });

  it('should have TypeScript plugins', () => {
    expect(hasPlugins(typescriptConfig)).toBe(true);
    const configWithPlugins = typescriptConfig.find((config) => config.plugins);
    expect(configWithPlugins.plugins).toHaveProperty('@typescript-eslint');
    expect(configWithPlugins.plugins).toHaveProperty('import');
  });

  it('should have specific TypeScript rules configured', () => {
    const configWithRules = typescriptConfig.find((config) => config.rules);
    expect(configWithRules).toBeDefined();

    const rules = configWithRules.rules;
    expect(rules['import/named']).toBe(ERROR);
    expect(rules['import/extensions']).toBeDefined();
    expect(rules['react/jsx-filename-extension']).toEqual([
      WARNING,
      { extensions: ['.ts', '.tsx', '.js', '.jsx'] },
    ]);
    expect(rules['react/function-component-definition']).toBe(OFF);
    expect(rules['@typescript-eslint/no-empty-object-type']).toBe(OFF);
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
      import('../index.js');
    }).not.toThrow();

    expect(() => {
      import('../react.js');
    }).not.toThrow();

    expect(() => {
      import('../typescript.js');
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
